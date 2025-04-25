
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DoctorService, { Doctor } from "../services/doctorService";
import { 
  filterDoctors, 
  getUniqueSpecialties, 
  buildQueryParams, 
  parseQueryParams 
} from "../utils/filterUtils";
import AutocompleteSearch from "../components/AutocompleteSearch";
import FilterPanel from "../components/FilterPanel";
import DoctorCard from "../components/DoctorCard";

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [consultationType, setConsultationType] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string | null>(null);

  // Fetch doctors data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const doctorService = DoctorService.getInstance();
        const data = await doctorService.fetchDoctors();
        setDoctors(data);
        setFilteredDoctors(data);
        
        // Get unique specialties from the data
        const uniqueSpecialties = getUniqueSpecialties(data);
        setSpecialties(uniqueSpecialties);
        
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch doctor data");
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Parse URL query parameters on initial load
  useEffect(() => {
    if (doctors.length > 0) {
      const { searchQuery, consultationType, selectedSpecialties, sortBy } = parseQueryParams(location.search);
      
      setSearchQuery(searchQuery);
      setConsultationType(consultationType);
      setSelectedSpecialties(selectedSpecialties);
      setSortBy(sortBy);
      
      applyFilters(doctors, searchQuery, consultationType, selectedSpecialties, sortBy);
    }
  }, [location.search, doctors]);

  // Update URL when filters change
  const updateUrl = () => {
    const params = buildQueryParams(
      searchQuery || null,
      consultationType,
      selectedSpecialties,
      sortBy
    );
    
    navigate(`?${params.toString()}`, { replace: true });
  };

  // Apply all filters and update the filtered doctors list
  const applyFilters = (
    doctorsList: Doctor[],
    search: string,
    consult: string | null,
    specialties: string[],
    sort: string | null
  ) => {
    const filtered = filterDoctors(doctorsList, search, consult, specialties, sort);
    setFilteredDoctors(filtered);
  };

  // Handler functions for filters
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    applyFilters(doctors, value, consultationType, selectedSpecialties, sortBy);
    setTimeout(updateUrl, 0);
  };

  const handleSelectDoctor = (doctor: Doctor) => {
    setSearchQuery(doctor.name);
    applyFilters(doctors, doctor.name, consultationType, selectedSpecialties, sortBy);
    setTimeout(updateUrl, 0);
  };

  const handleSpecialtyChange = (specialty: string) => {
    const newSelectedSpecialties = selectedSpecialties.includes(specialty)
      ? selectedSpecialties.filter((s) => s !== specialty)
      : [...selectedSpecialties, specialty];
      
    setSelectedSpecialties(newSelectedSpecialties);
    applyFilters(doctors, searchQuery, consultationType, newSelectedSpecialties, sortBy);
    setTimeout(updateUrl, 0);
  };

  const handleConsultationTypeChange = (type: string) => {
    const newType = consultationType === type ? null : type;
    setConsultationType(newType);
    applyFilters(doctors, searchQuery, newType, selectedSpecialties, sortBy);
    setTimeout(updateUrl, 0);
  };

  const handleSortChange = (sort: string) => {
    const newSort = sortBy === sort ? null : sort;
    setSortBy(newSort);
    applyFilters(doctors, searchQuery, consultationType, selectedSpecialties, newSort);
    setTimeout(updateUrl, 0);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-600 text-xl">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-700 p-4">
        <AutocompleteSearch
          doctors={doctors}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onSelectDoctor={handleSelectDoctor}
        />
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filter Panel */}
          <div className="w-full md:w-1/4">
            <FilterPanel
              specialties={specialties}
              selectedSpecialties={selectedSpecialties}
              consultationType={consultationType}
              sortBy={sortBy}
              onSpecialtyChange={handleSpecialtyChange}
              onConsultationTypeChange={handleConsultationTypeChange}
              onSortChange={handleSortChange}
            />
          </div>

          {/* Doctor List */}
          <div className="w-full md:w-3/4">
            {filteredDoctors.length > 0 ? (
              <div>
                <p className="mb-4 text-gray-700">{filteredDoctors.length} doctors found</p>
                {filteredDoctors.map((doctor) => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <p className="text-lg text-gray-700">No doctors found matching your criteria.</p>
                <p className="text-gray-500 mt-2">Try adjusting your filters or search query.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
