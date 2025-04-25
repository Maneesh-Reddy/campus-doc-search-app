
import React from 'react';

const DoctorCard = ({ doctor }) => {
  return (
    <div className="bg-white rounded-lg shadow mb-4 p-4">
      <div className="flex items-start">
        <img 
          src={doctor.profileImage} 
          alt={doctor.name}
          className="w-24 h-24 rounded-full object-cover mr-4"
        />
        <div className="flex-grow">
          <h2 className="text-xl font-semibold">{doctor.name}</h2>
          <p className="text-gray-600">{doctor.specialty.join(', ')}</p>
          <p className="text-gray-500">{doctor.experience} years experience</p>
          <p className="text-blue-600 font-semibold">₹{doctor.fees} per consultation</p>
          <div className="mt-2">
            <span className={`
              px-2 py-1 rounded text-sm mr-2
              ${doctor.consultationType === 'Video' ? 'bg-green-100 text-green-700' :
                doctor.consultationType === 'In-clinic' ? 'bg-blue-100 text-blue-700' :
                'bg-purple-100 text-purple-700'}
            `}>
              {doctor.consultationType}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
