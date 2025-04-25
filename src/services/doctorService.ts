
interface Doctor {
  id: string;
  name: string;
  specialty: string[];
  experience: number;
  fees: number;
  consultationType: "Video" | "In-clinic" | "Both";
  qualification: string;
  location: string;
  clinic: string;
}

class DoctorService {
  private static instance: DoctorService;
  private doctors: Doctor[] = [];
  private isLoading: boolean = false;
  private error: string | null = null;

  private constructor() {}

  public static getInstance(): DoctorService {
    if (!DoctorService.instance) {
      DoctorService.instance = new DoctorService();
    }
    return DoctorService.instance;
  }

  public async fetchDoctors(): Promise<Doctor[]> {
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
      
      // Transform the API response to match our Doctor interface
      this.doctors = data.map((item: any) => {
        // Extract specialty names from the specialities array
        const specialties = item.specialities ? 
          item.specialities.map((s: any) => s.name) : 
          [];
        
        // Extract experience years from string (e.g., "15 Years of experience")
        const experienceMatch = item.experience ? 
          item.experience.match(/(\d+)/) : 
          null;
        const experienceYears = experienceMatch ? parseInt(experienceMatch[1], 10) : 0;
        
        // Extract fee amount (e.g., "₹ 600")
        const feesMatch = item.fees ? 
          item.fees.match(/₹\s*(\d+)/) : 
          null;
        const feesAmount = feesMatch ? parseInt(feesMatch[1], 10) : 0;
        
        // Determine consultation type
        let consultationType: "Video" | "In-clinic" | "Both" = "In-clinic";
        if (item.video_consult && item.in_clinic) {
          consultationType = "Both";
        } else if (item.video_consult) {
          consultationType = "Video";
        }

        return {
          id: item.id || "",
          name: item.name || "",
          specialty: specialties,
          experience: experienceYears,
          fees: feesAmount,
          consultationType: consultationType,
          qualification: item.doctor_introduction || "",
          location: item.clinic && item.clinic.address ? item.clinic.address.locality : "",
          clinic: item.clinic ? item.clinic.name : ""
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

  public getLoadingStatus(): boolean {
    return this.isLoading;
  }

  public getError(): string | null {
    return this.error;
  }
}

export default DoctorService;
export type { Doctor };
