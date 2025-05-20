import { useState } from 'react';
import { DoctorList } from '../components/Doctor/DoctorList';
import { DoctorPagination } from '../components/Doctor/DoctorPagination';
import { AddDoctorModal } from '../components/Doctor/AddDoctorModal';
import type { DoctorFormData } from '../components/Doctor/AddDoctorModal';
import { FaPlus } from 'react-icons/fa';

export default function DoctorAppointment() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddDoctor = (doctorData: DoctorFormData) => {
    // TODO: Implement the API call to add the doctor
    console.log('New doctor data:', doctorData);
    // After successful API call, you might want to refresh the doctor list
  };

  return (
    <div className="flex-1 px-4 py-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Doctor Appointment</h2>
       
        <div className="bg-blue-900 text-white p-2 rounded-lg text-xs flex flex-row items-center">
          <FaPlus color="white" />
          <button
            onClick={() => setIsModalOpen(true)}
            className="ml-1"
          >
            Add Doctor
          </button>
        </div>
      </div>
      <div className="mb-4 text-sm text-gray-500">
        <span className="font-semibold text-gray-700">Showing:</span> All Consultations of All Healthcare Providers
      </div>
      <DoctorList />
      <DoctorPagination />

      <AddDoctorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddDoctor}
      />
    </div>
  );
} 