import { DoctorList } from '../components/Doctor/DoctorList';
import { DoctorPagination } from '../components/Doctor/DoctorPagination';

export default function DoctorAppointment() {
  return (
    <div className="flex-1 px-4 py-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Doctor Appointment</h2>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-semibold shadow hover:bg-indigo-700 transition">
          <span className="text-lg font-bold">+</span> Add Doctor
        </button>
      </div>
      <div className="mb-4 text-sm text-gray-500">
        <span className="font-semibold text-gray-700">Showing:</span> All Consultations of All Healthcare Providers
      </div>
      <DoctorList />
      <DoctorPagination />
    </div>
  );
} 