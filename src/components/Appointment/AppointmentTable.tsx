import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from "react-icons/fa";

interface AppointmentTableProps {
  appointments: Array<{
    name: string;
    username: string;
    id: string;
    date: string;
    sex: string;
    age: number;
    disease: string;
    status: string;
    doctor: string;
    image: string;
  }>;
}

export const AppointmentTable: React.FC<AppointmentTableProps> = ({ appointments }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center mb-4">
        <h3 className="text-sm font-medium">Patients List</h3>
        <span className="bg-blue-100 ml-2 text-blue-600 text-xs px-2 py-1 rounded-full">
          {appointments.length} users
        </span>
      </div>

      <table className="w-full border-collapse text-xs">
        <thead>
          <tr className="bg-gray-100 text-gray-600">
            <th className="text-left p-2">Patient Name</th>
            <th className="text-left p-2">Patient ID</th>
            <th className="text-left p-2">Date</th>
            <th className="text-left p-2">Sex</th>
            <th className="text-left p-2">Age</th>
            <th className="text-left p-2">Disease</th>
            <th className="text-left p-2">Status</th>
            <th className="text-left p-2">Doctor Name</th>
            <th className="text-left p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment, index) => (
            <tr 
              key={index} 
              className="border-t border-gray-200 text-gray-700 hover:bg-gray-50 cursor-pointer"
              onClick={() => navigate('/appointment-details', { state: { appointment } })}
            >
              <td className="flex items-center space-x-2 p-2">
                <img
                  src={appointment.image}
                  alt="profile"
                  className="w-6 h-6 rounded-full"
                />
                <div>
                  <p className="font-sm">{appointment.name}</p>
                  <p className="text-gray-500 text-xxs">{appointment.username}</p>
                </div>
              </td>
              <td className="p-2">{appointment.id}</td>
              <td className="p-2">{appointment.date}</td>
              <td className="p-2">{appointment.sex}</td>
              <td className="p-2">{appointment.age}</td>
              <td className="p-2">{appointment.disease}</td>
              <td className="p-2">
                <span
                  className={`px-2 py-1 text-xxs rounded-full ${
                    appointment.status === "Complete"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {appointment.status}
                </span>
              </td>
              <td className="p-2">{appointment.doctor}</td>
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