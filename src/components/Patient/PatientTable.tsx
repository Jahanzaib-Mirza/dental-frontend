import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Patient } from '../../lib/api/services/patients';

interface PatientTableProps {
  patients: Patient[];
  onEdit: (patient: Patient) => void;
}

export const PatientTable: React.FC<PatientTableProps> = ({ patients, onEdit }) => {
  const navigate = useNavigate();

  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

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
            <th className="text-left p-2">Email</th>
            <th className="text-left p-2">Phone</th>
            <th className="text-left p-2">Gender</th>
            <th className="text-left p-2">Age</th>
            <th className="text-left p-2">Address</th>
            <th className="text-left p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr
              key={patient.id}
              className="border-t border-gray-200 text-gray-700 hover:bg-gray-50 cursor-pointer"
              onClick={() => navigate('/patient-profile', { state: { patient } })}
            >
              <td className="flex items-center space-x-2 p-2">
                <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                  {patient.name.charAt(0)}
                </div>
                <div>
                  <p>{patient.name}</p>
                  <p className="text-gray-500 text-xxs">{patient.email}</p>
                </div>
              </td>
              <td className="p-2">{patient.email}</td>
              <td className="p-2">{patient.phone}</td>
              <td className="p-2">{patient.gender}</td>
              <td className="p-2">{calculateAge(patient.dob)}</td>
              <td className="p-2">{patient.address}</td>
              <td className="p-2 flex space-x-2">
                <button 
                  className="text-gray-400 hover:text-blue-500 text-xxs"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(patient);
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