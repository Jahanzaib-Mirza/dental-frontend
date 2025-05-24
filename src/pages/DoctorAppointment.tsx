import { useState } from 'react';
import { DoctorList } from '../components/Doctor/DoctorList';
import { DoctorPagination } from '../components/Doctor/DoctorPagination';
import { AddDoctorModal } from '../components/Doctor/AddDoctorModal';
import type { DoctorFormData } from '../components/Doctor/AddDoctorModal';
import { FaPlus } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../lib/hooks';
import { createDoctor } from '../lib/store/slices/doctorsSlice';
import { toast } from 'react-hot-toast';
import type { RootState } from '../lib/store/store';

export default function DoctorAppointment() {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { isCreating } = useAppSelector((state: RootState) => state.doctors);

  const handleAddDoctor = async (doctorData: DoctorFormData) => {
    try {
      await dispatch(createDoctor(doctorData)).unwrap();
      toast.success('Doctor added successfully');
      setIsModalOpen(false);
    } catch (error: any) {
      // The API returns { status: 'error', error: { code: string, message: string } }
      toast.error(error);
    }
  };

  return (
    <div className="flex-1 px-4 py-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-4">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#0A0F56]">Doctors</h1>
       
        <button 
          onClick={() => setIsModalOpen(true)}
          disabled={isCreating}
          className="bg-gradient-to-r from-[#0A0F56] to-[#232a7c] text-white px-5 py-2.5 rounded-xl text-sm font-medium flex items-center hover:from-[#232a7c] hover:to-[#0A0F56] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <FaPlus className="mr-2 text-base" />
          Add Doctor
        </button>
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
        isSubmitting={isCreating}
      />
    </div>
  );
} 