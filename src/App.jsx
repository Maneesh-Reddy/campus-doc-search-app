import { useState, useEffect } from 'react';
import './App.css';

const SPECIALTIES = [
  "General Physician", "Dentist", "Dermatologist", "Paediatrician",
  "Gynaecologist", "ENT", "Diabetologist", "Cardiologist",
  "Physiotherapist", "Endocrinologist", "Orthopaedic", "Ophthalmologist",
  "Gastroenterologist", "Pulmonologist", "Psychiatrist", "Urologist",
  "Dietitian/Nutritionist", "Psychologist", "Sexologist", "Nephrologist",
  "Neurologist", "Oncologist", "Ayurveda", "Homeopath"
];

function App() {
  const [doctors, setDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [consultationType, setConsultationType] = useState('');
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await fetch('https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json');
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = selectedSpecialties.length === 0 || 
      doctor.specialities?.some(s => selectedSpecialties.includes(s.name));
    const matchesConsultation = !consultationType || 
      (consultationType === 'Video' && doctor.video_consult) ||
      (consultationType === 'In-clinic' && doctor.in_clinic);

    return matchesSearch && matchesSpecialty && matchesConsultation;
  });

  const sortedDoctors = [...filteredDoctors].sort((a, b) => {
    if (sortBy === 'experience') {
      return (parseInt(b.experience) || 0) - (parseInt(a.experience) || 0);
    }
    if (sortBy === 'fees') {
      const feesA = parseInt(a.fees?.match(/\d+/)?.[0] || 0);
      const feesB = parseInt(b.fees?.match(/\d+/)?.[0] || 0);
      return feesA - feesB;
    }
    return 0;
  });

  return (
    <div className="app">
      <header>
        <input
          type="text"
          placeholder="Search for doctors"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          data-testid="autocomplete-input"
          className="search-input"
        />
      </header>

      <div className="main-content">
        <aside className="filters">
          <h3 data-testid="filter-header-speciality">Specialties</h3>
          <div className="filter-group">
            {SPECIALTIES.map(specialty => (
              <label key={specialty}>
                <input
                  type="checkbox"
                  checked={selectedSpecialty === specialty}
                  onChange={() => setSelectedSpecialty(selectedSpecialty === specialty ? '' : specialty)}
                  data-testid={`filter-specialty-${specialty.replace(' ', '-')}`}
                />
                {specialty}
              </label>
            ))}
          </div>

          <h3 data-testid="filter-header-moc">Consultation Type</h3>
          <div className="filter-group">
            <label>
              <input
                type="radio"
                checked={consultationType === 'Video'}
                onChange={() => setConsultationType('Video')}
                data-testid="filter-video-consult"
              />
              Video
            </label>
            <label>
              <input
                type="radio"
                checked={consultationType === 'In-clinic'}
                onChange={() => setConsultationType('In-clinic')}
                data-testid="filter-in-clinic"
              />
              In-clinic
            </label>
          </div>

          <h3 data-testid="filter-header-sort">Sort By</h3>
          <div className="filter-group">
            <label>
              <input
                type="radio"
                checked={sortBy === 'experience'}
                onChange={() => setSortBy('experience')}
                data-testid="sort-experience"
              />
              Experience
            </label>
            <label>
              <input
                type="radio"
                checked={sortBy === 'fees'}
                onChange={() => setSortBy('fees')}
                data-testid="sort-fees"
              />
              Fees
            </label>
          </div>
        </aside>

        <main className="doctor-list">
          {sortedDoctors.map(doctor => (
            <div key={doctor.id} className="doctor-card" data-testid="doctor-card">
              <img src={doctor.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name)}`} alt={doctor.name} />
              <div className="doctor-info">
                <h2 data-testid="doctor-name">{doctor.name}</h2>
                <p data-testid="doctor-specialty">{doctor.specialities?.map(s => s.name).join(', ')}</p>
                <p data-testid="doctor-experience">{doctor.experience} experience</p>
                <p data-testid="doctor-fee">{doctor.fees}</p>
                <button className="book-btn">Book Appointment</button>
              </div>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
}

export default App;