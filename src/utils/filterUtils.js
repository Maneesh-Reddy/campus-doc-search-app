export function getUniqueSpecialties(doctors) {
  const specialtiesSet = new Set();
  doctors.forEach((doctor) => {
    doctor.specialty.forEach((specialty) => {
      specialtiesSet.add(specialty);
    });
  });
  return Array.from(specialtiesSet).sort();
}

export function getSuggestions(doctors, query) {
  if (!query) return [];
  
  const lowerCaseQuery = query.toLowerCase();
  const matches = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(lowerCaseQuery)
  );
  
  return matches.slice(0, 3);
}

export function buildQueryParams(
  searchQuery,
  consultationType,
  selectedSpecialties,
  sortBy
) {
  const params = new URLSearchParams();
  
  if (searchQuery) params.set("q", searchQuery);
  if (consultationType) params.set("consult", consultationType);
  if (selectedSpecialties.length > 0) params.set("specialties", selectedSpecialties.join(","));
  if (sortBy) params.set("sort", sortBy);
  
  return params;
}

export function parseQueryParams(search) {
  const params = new URLSearchParams(search);
  
  const searchQuery = params.get("q") || "";
  const consultationType = params.get("consult");
  const selectedSpecialties = params.get("specialties") ? params.get("specialties").split(",") : [];
  const sortBy = params.get("sort");
  
  return {
    searchQuery,
    consultationType,
    selectedSpecialties,
    sortBy,
  };
}

export const filterDoctors = (doctors, filters) => {
  return doctors.filter(doctor => {
    if (filters.specialty && filters.specialty !== 'All' && 
        !doctor.specialty.includes(filters.specialty)) {
      return false;
    }
    if (filters.consultationType && filters.consultationType !== 'All' && 
        doctor.consultationType !== filters.consultationType) {
      return false;
    }
    if (filters.fees && doctor.fees > parseInt(filters.fees)) {
      return false;
    }
    return true;
  });
};