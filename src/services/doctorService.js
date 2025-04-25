
import * as React from "react"

class DoctorService {
  static instance;
  doctors = [];
  isLoading = false;
  error = null;

  constructor() {}

  static getInstance() {
    if (!DoctorService.instance) {
      DoctorService.instance = new DoctorService();
    }
    return DoctorService.instance;
  }

  async fetchDoctors() {
    if (this.doctors.length > 0) {
      return this.doctors;
    }

    this.isLoading = true;
    this.error = null;

    try {
      const response = await fetch(
        "https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch doctors");
      }
      
      const data = await response.json();
      
      this.doctors = data.map((item) => {
        const specialties = item.specialities ? 
          item.specialities.map((s) => s.name) : 
          [];
        
        const experienceMatch = item.experience ? 
          item.experience.match(/(\d+)/) : 
          null;
        const experienceYears = experienceMatch ? parseInt(experienceMatch[1], 10) : 0;
        
        const feesMatch = item.fees ? 
          item.fees.match(/₹\s*(\d+)/) : 
          null;
        const feesAmount = feesMatch ? parseInt(feesMatch[1], 10) : 0;
        
        let consultationType = "In-clinic";
        if (item.video_consult && item.in_clinic) {
          consultationType = "Both";
        } else if (item.video_consult) {
          consultationType = "Video";
        }

        const profileImage = item.photo || 
          `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=random`;

        return {
          id: item.id || "",
          name: item.name || "",
          specialty: specialties,
          experience: experienceYears,
          fees: feesAmount,
          consultationType: consultationType,
          qualification: item.doctor_introduction || "",
          location: item.clinic && item.clinic.address ? item.clinic.address.locality : "",
          clinic: item.clinic ? item.clinic.name : "",
          profileImage: profileImage
        };
      });
      
      return this.doctors;
    } catch (error) {
      this.error = error instanceof Error ? error.message : "Unknown error occurred";
      console.error("Error fetching doctors:", error);
      return [];
    } finally {
      this.isLoading = false;
    }
  }

  getLoadingStatus() {
    return this.isLoading;
  }

  getError() {
    return this.error;
  }
}

export default DoctorService;
