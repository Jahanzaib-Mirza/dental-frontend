import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Appointment } from '../../lib/api/services/appointments';
import { calculateAge } from '../../lib/utils/dateUtils';
import { getInitials } from '../../lib/utils/stringUtils';
import InitialAvatar from '../Common/InitialAvatar';

interface AppointmentTableProps {
  appointments: Appointment[];
}

export const AppointmentTable: React.FC<AppointmentTableProps> = ({ appointments }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center mb-4">
        <h3 className="text-sm font-medium">Appointments List</h3>
        <span className="bg-blue-100 ml-2 text-blue-600 text-xs px-2 py-1 rounded-full">
          {appointments.length} Appointments
        </span>
      </div>

      <table className="w-full border-collapse text-xs">
        <thead>
          <tr className="bg-gray-100 text-gray-600">
            <th className="text-left p-2">Patient Name</th>
            <th className="text-left p-2">Date</th>
            <th className="text-left p-2">Time</th>
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
                <InitialAvatar 
                  initials={getInitials(appointment.patient?.name || '')} 
                  size={8}
                  bgColor="bg-blue-500"
                  textColor="text-white"
                  className="border-none shadow-none text-xs"
                />
                <div>
                  <p className="font-sm">{appointment.patient?.name || 'N/A'}</p>
                  <p className="text-gray-500 text-xxs">{appointment.patient?.email || 'N/A'}</p>
                </div>
              </td>
              <td className="p-2">{new Date(appointment.date).toLocaleDateString()}</td>
              <td className="p-2">{appointment.time || 'N/A'}</td>
              <td className="p-2">{appointment.patient?.gender || 'N/A'}</td>
              <td className="p-2">{appointment.patient?.dob ? calculateAge(appointment.patient.dob) : 'N/A'}</td>
              <td className="p-2">{appointment.reason || 'N/A'}</td>
              <td className="p-2">
                <span
                  className={`px-2 py-1 text-xxs rounded-full ${
                    appointment.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : appointment.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : appointment.status === "confirmed"
                      ? "bg-blue-100 text-blue-700"
                      : appointment.status === "cancelled"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {appointment.status || 'N/A'}
                </span>
              </td>
              <td className="p-2">{appointment.doctor?.name || 'N/A'}</td>
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