import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { fetchDoctors } from '../../lib/store/slices/doctorsSlice';
import { DoctorCard } from './DoctorCard';
import type { RootState } from '../../lib/store/store';
import type { User } from '../../lib/api/services/users';

export function DoctorList() {
  const dispatch = useAppDispatch();
  const { doctors, isLoading, error } = useAppSelector((state: RootState) => state.doctors);

  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0A0F56]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4 bg-red-50 rounded-md">
        Error loading doctors: {error}
      </div>
    );
  }

  if (doctors.length === 0) {
    return (
      <div className="text-gray-500 p-4 bg-gray-50 rounded-md">
        No doctors found.
      </div>
    );
  }

  return (
    <div>
      {doctors.map((doctor: User) => (
        <DoctorCard
          key={doctor.id}
          name={doctor.name}
          specialty={doctor.specialization || 'General Dentist'}
          time={doctor.availability?.length ? 'Available' : 'Not available'}
          date={'Contact for details'}
          description={doctor.education || 'Professional dental care provider'}
          avatar={doctor.profileImage || `https://randomuser.me/api/portraits/${doctor.gender === 'male' ? 'men' : 'women'}/1.jpg`}
          experience={doctor.experience || 0}
          gender={doctor.gender || 'Not specified'}
          age={doctor.age || 0}
        />
      ))}
    </div>
  );
} 