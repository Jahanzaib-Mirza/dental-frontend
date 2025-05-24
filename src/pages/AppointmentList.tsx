import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { FaPlus, FaFilter, FaSearch } from "react-icons/fa";
import { AppointmentTable } from "../components/Appointment/AppointmentTable";
import { Pagination } from "../components/Common/Pagination";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { fetchAppointments } from "../lib/store/slices/appointmentsSlice";
import { fetchDoctors } from "../lib/store/slices/doctorsSlice";
import { toast } from "react-hot-toast";
import { type Appointment } from "../lib/api/services/appointments";
import type { RootState } from "../lib/store/store";
import type { User } from "../lib/api/services/users";

const AppointmentList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const { appointments, isLoading, error } = useAppSelector((state: RootState) => state.appointments);
  const { doctors, isLoading: isLoadingDoctors } = useAppSelector((state: RootState) => state.doctors);

  const appointmentStatusOptions = [
    { value: "Pending", label: "Pending" },
    { value: "Confirmed", label: "Confirmed" },
    { value: "Complete", label: "Complete" },
    { value: "Cancelled", label: "Cancelled" },
  ];

  useEffect(() => {
    dispatch(fetchAppointments())
      .unwrap()
      .catch((error) => {
        toast.error(error || 'Failed to fetch appointments');
      });
    dispatch(fetchDoctors())
      .unwrap()
      .catch((error) => {
        toast.error(error || 'Failed to fetch doctors');
      });
  }, [dispatch]);

  const filteredAppointments = useMemo(() => {
    return appointments
      .filter((appointment: Appointment) => {
        if (selectedDoctorId && appointment.doctor.id !== selectedDoctorId) {
          return false;
        }
        if (selectedStatus && appointment.status !== selectedStatus) {
          return false;
        }
        if (searchTerm) {
          const lowerSearchTerm = searchTerm.toLowerCase();
          const patientName = appointment.patient?.name?.toLowerCase() || '';
          const patientEmail = appointment.patient?.email?.toLowerCase() || '';
          const appointmentDate = new Date(appointment.date).toLocaleDateString().toLowerCase();
          return (
            patientName.includes(lowerSearchTerm) ||
            patientEmail.includes(lowerSearchTerm) ||
            appointmentDate.includes(lowerSearchTerm)
          );
        }
        return true;
      });
  }, [appointments, searchTerm, selectedDoctorId, selectedStatus]);

  // Transform API data to match table format
  const transformedAppointments = filteredAppointments.map((appointment: Appointment) => ({
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
        <h1 className="text-xl sm:text-3xl font-bold text-[#0A0F56]">Appointment Dashboard</h1>
        <p className="text-gray-500 text-md">
            Manage and track all patient appointments efficiently.
          </p>
        </div>
        <button
          onClick={() => navigate('/add-appointment')}
          className="bg-gradient-to-r from-[#0A0F56] to-[#232a7c] text-white px-5 py-2.5 rounded-xl text-sm font-medium flex items-center hover:from-[#232a7c] hover:to-[#0A0F56] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <FaPlus className="mr-2 text-base" />
          Add Appointment
        </button>
      </div>

      {/* Filters and Search Section */}
      <div className="mb-6 p-4 bg-white rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          {/* Search Input */}
          <div className="relative">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                id="search"
                placeholder="Search by patient name, email, or date..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 pl-10 text-sm w-full focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
          </div>

          {/* Doctor Filter */}
          <div>
            <label htmlFor="doctorFilter" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <FaFilter className="text-[#0A0F56] mr-2" /> Doctor
            </label>
            <Select
              id="doctorFilter"
              options={[{ value: '', label: 'All Doctors' }, ...doctors.map((d: User) => ({ value: d.id, label: d.name }))]}
              value={doctors.find((d: User) => d.id === selectedDoctorId) ?
                { value: selectedDoctorId, label: doctors.find((d: User) => d.id === selectedDoctorId)?.name || '' } :
                { value: '', label: 'All Doctors' }
              }
              onChange={(selectedOption) => setSelectedDoctorId(selectedOption ? selectedOption.value : null)}
              isClearable
              placeholder="Select Doctor"
              isLoading={isLoadingDoctors}
              className="text-sm"
              styles={{ control: (base) => ({ ...base, minHeight: '42px', borderColor: '#D1D5DB' }), menu: base => ({ ...base, zIndex: 20 }) }}
            />
          </div>

          {/* Status Filter */}
          <div>
            <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <FaFilter className="text-[#0A0F56] mr-2" /> Status
            </label>
            <Select
              id="statusFilter"
              options={[{ value: '', label: 'All Statuses' }, ...appointmentStatusOptions]}
              value={appointmentStatusOptions.find(option => option.value === selectedStatus) || { value: '', label: 'All Statuses' }}
              onChange={(selectedOption) => setSelectedStatus(selectedOption ? selectedOption.value : null)}
              isClearable
              placeholder="Select Status"
              className="text-sm"
              styles={{ control: (base) => ({ ...base, minHeight: '42px', borderColor: '#D1D5DB' }), menu: base => ({ ...base, zIndex: 20 }) }}
            />
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

