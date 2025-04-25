export const mockDoctors = [
  {
    id: 1,
    name: "Dr. John Smith",
    specialty: ["Cardiology"],
    experience: 15,
    fees: 2000,
    consultationType: "Video",
    clinic: "Heart Care Center",
    location: "New York",
    profileImage: "https://placekitten.com/200/200"
  },
  {
    id: 2,
    name: "Dr. Sarah Johnson",
    specialty: ["Dermatology"],
    experience: 10,
    fees: 1500,
    consultationType: "In-clinic",
    clinic: "Skin Health Clinic",
    location: "Los Angeles",
    profileImage: "https://placekitten.com/201/201"
  }
];

export const getDoctors = () => {
  return mockDoctors;
};