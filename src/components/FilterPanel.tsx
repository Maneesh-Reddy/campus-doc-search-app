
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FilterPanelProps {
  specialties: string[];
  selectedSpecialties: string[];
  consultationType: string | null;
  sortBy: string | null;
  onSpecialtyChange: (specialty: string) => void;
  onConsultationTypeChange: (type: string) => void;
  onSortChange: (sort: string) => void;
}

const FilterPanel = ({
  specialties,
  selectedSpecialties,
  consultationType,
  sortBy,
  onSpecialtyChange,
  onConsultationTypeChange,
  onSortChange,
}: FilterPanelProps) => {
  const [isSpecialtiesOpen, setIsSpecialtiesOpen] = useState(true);
  const [isConsultationOpen, setIsConsultationOpen] = useState(true);
  const [isSortOpen, setIsSortOpen] = useState(true);

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="mb-6">
        <div 
          className="flex justify-between items-center cursor-pointer mb-3"
          onClick={() => setIsSortOpen(!isSortOpen)}
        >
          <h3 className="text-lg font-semibold" data-testid="filter-header-sort">Sort by</h3>
          {isSortOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        
        {isSortOpen && (
          <div className="space-y-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                data-testid="sort-fees"
                checked={sortBy === "fees"}
                onChange={() => onSortChange("fees")}
                className="h-4 w-4 text-blue-600"
              />
              <span>Price: Low-High</span>
            </label>
            
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                data-testid="sort-experience"
                checked={sortBy === "experience"}
                onChange={() => onSortChange("experience")}
                className="h-4 w-4 text-blue-600"
              />
              <span>Experience: Most Experience first</span>
            </label>
          </div>
        )}
      </div>
      
      <div className="mb-6">
        <div 
          className="flex justify-between items-center cursor-pointer mb-3"
          onClick={() => setIsConsultationOpen(!isConsultationOpen)}
        >
          <h3 className="text-lg font-semibold" data-testid="filter-header-moc">Mode of consultation</h3>
          {isConsultationOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        
        {isConsultationOpen && (
          <div className="space-y-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                data-testid="filter-video-consult"
                checked={consultationType === "Video"}
                onChange={() => onConsultationTypeChange("Video")}
                className="h-4 w-4 text-blue-600"
              />
              <span>Video Consultation</span>
            </label>
            
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                data-testid="filter-in-clinic"
                checked={consultationType === "In-clinic"}
                onChange={() => onConsultationTypeChange("In-clinic")}
                className="h-4 w-4 text-blue-600"
              />
              <span>In-clinic Consultation</span>
            </label>
          </div>
        )}
      </div>
      
      <div>
        <div 
          className="flex justify-between items-center cursor-pointer mb-3"
          onClick={() => setIsSpecialtiesOpen(!isSpecialtiesOpen)}
        >
          <h3 className="text-lg font-semibold" data-testid="filter-header-speciality">Specialities</h3>
          {isSpecialtiesOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        
        {isSpecialtiesOpen && (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {specialties.map((specialty) => (
              <label key={specialty} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  data-testid={`filter-specialty-${specialty.replace(/\s+|\/+/g, '-')}`}
                  checked={selectedSpecialties.includes(specialty)}
                  onChange={() => onSpecialtyChange(specialty)}
                  className="h-4 w-4 text-blue-600 rounded"
                />
                <span>{specialty}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterPanel;
