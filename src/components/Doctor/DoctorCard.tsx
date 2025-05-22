import { useState } from 'react';
import { EditDoctorModal } from './EditDoctorModal';
import type { User } from '../../lib/api/services/users';

interface DoctorCardProps {
  doctor: User;
  onEdit: (id: string, doctorData: any, onSuccess: () => void) => void;
  isUpdating?: boolean;
}

export function DoctorCard({ doctor, onEdit, isUpdating }: DoctorCardProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEdit = (id: string, doctorData: any) => {
    onEdit(id, doctorData, () => setIsEditModalOpen(false));
  };

  return (
    <>
      <div className="flex items-center bg-white rounded-lg shadow-sm p-3 mb-3">
        <img 
          src={doctor.profileImage || `https://randomuser.me/api/portraits/${doctor.gender === 'male' ? 'men' : 'women'}/1.jpg`} 
          alt={doctor.name} 
          className="w-16 h-16 rounded-full mr-5" 
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-gray-900 text-lg">{doctor.name}</div>
              <div className="text-xs text-indigo-700 font-medium mb-1">{doctor.specialization || 'General Dentist'}</div>
              <div className="text-xs text-gray-500">
                {doctor.availability?.length ? 'Available' : 'Not available'} 
                <span className="mx-1">•</span> Contact for details
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {doctor.education || 'Professional dental care provider'}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {doctor.gender || 'Not specified'} • {doctor.age || 0} years • {doctor.experience || 0} years experience
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <button className="bg-blue-900 text-white px-4 py-1 rounded text-sm font-medium hover:bg-[#0A0F56] transition">
                View Appointments
              </button>
              <button 
                onClick={() => setIsEditModalOpen(true)}
                className="border border-[#0A0F56] text-[#0A0F56] px-4 py-1 rounded text-sm font-medium hover:bg-indigo-50 transition"
              >
                Edit Doctor
              </button>
            </div>
          </div>
        </div>
      </div>

      <EditDoctorModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEdit}
        isSubmitting={isUpdating}
        doctor={doctor}
      />
    </>
  );
} 