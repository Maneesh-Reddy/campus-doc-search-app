
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
      this.doctors = data;
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
