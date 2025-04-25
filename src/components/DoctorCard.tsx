
import React from "react";
import type { Doctor } from "../services/doctorService";

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  return (
    <div data-testid="doctor-card" className="bg-white rounded-lg shadow p-4 mb-4 flex flex-col md:flex-row md:items-start gap-4">
      <div className="flex-shrink-0">
        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-2xl font-bold text-gray-500">
            {doctor.name.charAt(0)}
          </span>
        </div>
      </div>
      
      <div className="flex-grow">
        <h2 data-testid="doctor-name" className="text-xl font-bold text-gray-800">{doctor.name}</h2>
        
        <div data-testid="doctor-specialty" className="text-gray-600 mb-1">
          {doctor.specialty.join(", ")}
        </div>
        
        <div className="text-sm text-gray-500 mb-1">{doctor.qualification}</div>
        
        <div data-testid="doctor-experience" className="text-sm text-gray-700 mb-2">
          {doctor.experience} yrs exp.
        </div>
        
        <div className="text-sm mb-2">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
            </svg>
            <span>{doctor.clinic}</span>
          </div>
          
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <span>{doctor.location}</span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col items-end justify-between">
        <div data-testid="doctor-fee" className="text-lg font-bold text-gray-800">
          ₹ {doctor.fees}
        </div>
        
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-700 transition">
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;
