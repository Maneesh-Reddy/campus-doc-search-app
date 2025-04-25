
import React from 'react';

const FilterPanel = ({
  specialties,
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
        <h3 className="font-medium mb-2">Specialties</h3>
        {specialties.map((specialty) => (
          <div key={specialty} className="mb-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={selectedSpecialties.includes(specialty)}
                onChange={() => onSpecialtyChange(specialty)}
                className="mr-2"
              />
              {specialty}
            </label>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-2">Consultation Type</h3>
        {['Video', 'In-clinic'].map((type) => (
          <div key={type} className="mb-2">
            <label className="flex items-center">
              <input
                type="radio"
                checked={consultationType === type}
                onChange={() => onConsultationTypeChange(type)}
                className="mr-2"
              />
              {type}
            </label>
          </div>
        ))}
      </div>

      <div>
        <h3 className="font-medium mb-2">Sort By</h3>
        {[
          { value: 'experience', label: 'Experience' },
          { value: 'fees', label: 'Fees' }
        ].map(({ value, label }) => (
          <div key={value} className="mb-2">
            <label className="flex items-center">
              <input
                type="radio"
                checked={sortBy === value}
                onChange={() => onSortChange(value)}
                className="mr-2"
              />
              {label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterPanel;
