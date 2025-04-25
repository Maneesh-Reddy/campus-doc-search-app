
import React from 'react';

const SPECIALTIES = [
  "General Physician", "Dentist", "Dermatologist", "Paediatrician",
  "Gynaecologist", "ENT", "Diabetologist", "Cardiologist",
  "Physiotherapist", "Endocrinologist", "Orthopaedic", "Ophthalmologist",
  "Gastroenterologist", "Pulmonologist", "Psychiatrist", "Urologist",
  "Dietitian-Nutritionist", "Psychologist", "Sexologist", "Nephrologist",
  "Neurologist", "Oncologist", "Ayurveda", "Homeopath"
];

const FilterPanel = ({
  selectedSpecialties,
  consultationType,
  sortBy,
  onSpecialtyChange,
  onConsultationTypeChange,
  onSortChange
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      
      <div className="mb-6">
        <h3 className="font-medium mb-2" data-testid="filter-header-speciality">Specialties</h3>
        <div className="max-h-96 overflow-y-auto">
          {SPECIALTIES.map((specialty) => (
            <div key={specialty} className="mb-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedSpecialties.includes(specialty)}
                  onChange={() => onSpecialtyChange(specialty)}
                  data-testid={`filter-specialty-${specialty.replace(/[^a-zA-Z0-9]/g, '-')}`}
                  className="mr-2"
                />
                {specialty}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-2" data-testid="filter-header-moc">Consultation Type</h3>
        <div className="mb-2">
          <label className="flex items-center">
            <input
              type="radio"
              checked={consultationType === 'Video'}
              onChange={() => onConsultationTypeChange('Video')}
              data-testid="filter-video-consult"
              className="mr-2"
            />
            Video Consult
          </label>
        </div>
        <div className="mb-2">
          <label className="flex items-center">
            <input
              type="radio"
              checked={consultationType === 'In-clinic'}
              onChange={() => onConsultationTypeChange('In-clinic')}
              data-testid="filter-in-clinic"
              className="mr-2"
            />
            In-clinic
          </label>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-2">Sort By</h3>
        <div className="mb-2">
          <label className="flex items-center">
            <input
              type="radio"
              checked={sortBy === 'fees'}
              onChange={() => onSortChange('fees')}
              data-testid="sort-fees"
              className="mr-2"
            />
            Fees (Low to High)
          </label>
        </div>
        <div className="mb-2">
          <label className="flex items-center">
            <input
              type="radio"
              checked={sortBy === 'experience'}
              onChange={() => onSortChange('experience')}
              data-testid="sort-experience"
              className="mr-2"
            />
            Experience (High to Low)
          </label>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
