
import type { Doctor } from "../services/doctorService";

export function filterDoctors(
  doctors: Doctor[],
  searchQuery: string,
  consultationType: string | null,
  selectedSpecialties: string[],
  sortBy: string | null
): Doctor[] {
  let filteredDoctors = [...doctors];

  // Apply search query filter
  if (searchQuery) {
    const lowerCaseQuery = searchQuery.toLowerCase();
    filteredDoctors = filteredDoctors.filter((doctor) =>
      doctor.name.toLowerCase().includes(lowerCaseQuery)
    );
  }

  // Apply consultation type filter
  if (consultationType) {
    filteredDoctors = filteredDoctors.filter((doctor) => {
      if (consultationType === "Video") {
        return doctor.consultationType === "Video" || doctor.consultationType === "Both";
      } else if (consultationType === "In-clinic") {
        return doctor.consultationType === "In-clinic" || doctor.consultationType === "Both";
      }
      return true;
    });
  }

  // Apply specialty filters
  if (selectedSpecialties.length > 0) {
    filteredDoctors = filteredDoctors.filter((doctor) =>
      selectedSpecialties.some((specialty) => doctor.specialty.includes(specialty))
    );
  }

  // Apply sorting
  if (sortBy === "fees") {
    filteredDoctors.sort((a, b) => a.fees - b.fees);
  } else if (sortBy === "experience") {
    filteredDoctors.sort((a, b) => b.experience - a.experience);
  }

  return filteredDoctors;
}

export function getUniqueSpecialties(doctors: Doctor[]): string[] {
  const specialtiesSet = new Set<string>();
  doctors.forEach((doctor) => {
    doctor.specialty.forEach((specialty) => {
      specialtiesSet.add(specialty);
    });
  });
  return Array.from(specialtiesSet).sort();
}

export function getSuggestions(doctors: Doctor[], query: string): Doctor[] {
  if (!query) return [];
  
  const lowerCaseQuery = query.toLowerCase();
  const matches = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(lowerCaseQuery)
  );
  
  // Return top 3 matches
  return matches.slice(0, 3);
}

export function buildQueryParams(
  searchQuery: string | null,
  consultationType: string | null,
  selectedSpecialties: string[],
  sortBy: string | null
): URLSearchParams {
  const params = new URLSearchParams();
  
  if (searchQuery) params.set("q", searchQuery);
  if (consultationType) params.set("consult", consultationType);
  if (selectedSpecialties.length > 0) params.set("specialties", selectedSpecialties.join(","));
  if (sortBy) params.set("sort", sortBy);
  
  return params;
}

export function parseQueryParams(search: string) {
  const params = new URLSearchParams(search);
  
  const searchQuery = params.get("q") || "";
  const consultationType = params.get("consult");
  const selectedSpecialties = params.get("specialties") ? params.get("specialties")!.split(",") : [];
  const sortBy = params.get("sort");
  
  return {
    searchQuery,
    consultationType,
    selectedSpecialties,
    sortBy,
  };
}
