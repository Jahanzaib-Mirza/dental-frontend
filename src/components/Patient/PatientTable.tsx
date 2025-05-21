import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Patient {
  name: string;
  username: string;
  id: string;
  date: string;
  sex: string;
  age: number;
  disease: string;
  doctor: string;
  image: string;
}

interface PatientTableProps {
  patients: Patient[];
}

export const PatientTable: React.FC<PatientTableProps> = ({ patients }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center mb-4">
        <h3 className="text-sm font-medium">Patients</h3>
        <span className="bg-blue-100 ml-2 text-blue-600 text-xs px-2 py-1 rounded-full">
          {patients.length} patients
        </span>
      </div>

      <table className="w-full border-collapse text-xs">
        <thead>
          <tr className="bg-gray-100 text-gray-600">
            <th className="text-left p-2">Patient</th>
            <th className="text-left p-2">Patient ID</th>
            <th className="text-left p-2">Date</th>
            <th className="text-left p-2">Sex</th>
            <th className="text-left p-2">Age</th>
            <th className="text-left p-2">Disease</th>
            <th className="text-left p-2">Doctor</th>
            <th className="text-left p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient, index) => (
            <tr
              key={index}
              className="border-t border-gray-200 text-gray-700 hover:bg-gray-50 cursor-pointer"
              onClick={() => navigate('/patient-profile', { state: { patient } })}
            >
              <td className="flex items-center space-x-2 p-2">
                <img
                  src={patient.image}
                  alt="profile"
                  className="w-6 h-6 rounded-full"
                />
                <div>
                  <p>{patient.name}</p>
                  <p className="text-gray-500 text-xxs">{patient.username}</p>
                </div>
              </td>
              <td className="p-2">{patient.id}</td>
              <td className="p-2">{patient.date}</td>
              <td className="p-2">{patient.sex}</td>
              <td className="p-2">{patient.age}</td>
              <td className="p-2">{patient.disease}</td>
              <td className="p-2">{patient.doctor}</td>
              <td className="p-2 flex space-x-2">
                <button 
                  className="text-gray-400 hover:text-blue-500 text-xxs"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle edit
                  }}
                >
                  ✏️
                </button>
                <button 
                  className="text-gray-400 hover:text-red-500 text-xxs"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle delete
                  }}
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}; 