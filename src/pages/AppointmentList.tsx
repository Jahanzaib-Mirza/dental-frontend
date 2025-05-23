import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
// import Icon from "../components/Icons";
import { FaPlus } from "react-icons/fa";
import { AppointmentTable } from "../components/Appointment/AppointmentTable";
import { Pagination } from "../components/Common/Pagination";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { fetchAppointments } from "../lib/store/slices/appointmentsSlice";
import { toast } from "react-hot-toast";
import { type Appointment } from "../lib/api/services/appointments";
const AppointmentList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const { appointments, isLoading, error } = useAppSelector((state) => state.appointments);

  useEffect(() => {
    dispatch(fetchAppointments())
      .unwrap()
      .catch((error) => {
        toast.error(error || 'Failed to fetch appointments');
      });
  }, [dispatch]);

  // Transform API data to match table format
  const transformedAppointments = appointments.map((appointment: Appointment) => ({
    name: appointment.patient?.name || 'N/A',
    username: appointment.patient?.email || 'N/A',
    id: appointment.id,
    date: new Date(appointment.date).toLocaleDateString(),
    time: appointment.time,
    sex: appointment.patient?.gender || 'N/A',
    age: appointment.patient?.age || 'N/A',
    disease: appointment.reason,
    status: appointment.status,
    doctor: appointment.doctor?.name || 'N/A',
    image: appointment.patient?.profileImage || 'https://i.pravatar.cc/40?img=1',
  }));

  if (isLoading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading appointments...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>{error}</p>
          <button 
            onClick={() => dispatch(fetchAppointments())}
            className="mt-4 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">Appointment List</h2>
          <p className="text-gray-500 text-xs">
            Showing: All Consultations of All Healthcare Providers
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <input
            type="text"
            placeholder="Search by email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded-lg p-2 text-xs outline-none"
          />
          <div className="bg-blue-900 text-white p-2 rounded-lg text-xs flex flex-row items-center">
            <FaPlus color="white" />
            <button 
              onClick={() => navigate('/add-appointment')}
              className="ml-1"
            >
              Add Appointment
            </button>
          </div>
        </div>
      </div>

      <AppointmentTable appointments={transformedAppointments} />
      
      <Pagination
        currentPage={currentPage}
        totalPages={10}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default AppointmentList;

