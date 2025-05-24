import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from 'react-router-dom';
import Select, { components } from 'react-select';
import { FaPlus, FaSearch, FaFilter, FaUserMd, FaCalendarAlt, FaListAlt, FaTimesCircle } from "react-icons/fa";
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
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const { appointments, isLoading, error } = useAppSelector((state: RootState) => state.appointments);
  const { doctors, isLoading: isLoadingDoctors } = useAppSelector((state: RootState) => state.doctors);

  const appointmentStatusOptions = [
    { value: "pending", label: "Pending" },
    { value: "confirmed", label: "Confirmed" },
    { value: "complete", label: "Complete" },
    { value: "cancelled", label: "Cancelled" },
  ];

  useEffect(() => {
    const doctorIdFromUrl = searchParams.get("doctorId");
    if (doctorIdFromUrl) {
      setSelectedDoctorId(doctorIdFromUrl);
    }
  }, [searchParams]);

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

  const customSelectStyles = {
    control: (base: any, state: any) => ({
      ...base,
      borderRadius: '0.5rem',
      borderColor: state.isFocused ? '#0A0F56' : '#e5e7eb',
      minHeight: '42px',
      boxShadow: state.isFocused ? '0 0 0 1px #0A0F56' : '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      '&:hover': {
        borderColor: '#0A0F56'
      },
      fontSize: '0.875rem', // text-sm
    }),
    menu: (base: any) => ({
      ...base,
      borderRadius: '0.5rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      zIndex: 20,
      fontSize: '0.875rem', // text-sm
    }),
    option: (base: any, state: any) => ({
        ...base,
        backgroundColor: state.isSelected ? '#0A0F56' : state.isFocused ? '#e0e7ff' : base.backgroundColor,
        color: state.isSelected ? 'white' : state.isFocused ? '#0A0F56' : base.color,
        '&:active': {
            backgroundColor: '#0A0F56',
            color: 'white',
        },
         fontSize: '0.875rem', // text-sm
    }),
    placeholder: (base: any) => ({
        ...base,
        color: '#9ca3af', // gray-400
        fontSize: '0.875rem', // text-sm
    }),
    singleValue: (base: any) => ({
        ...base,
        color: '#1f2937', // gray-800
        fontSize: '0.875rem', // text-sm
    }),
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-gradient-to-br from-[#f4f6fb] to-[#e9eaf7] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0A0F56] mx-auto"></div>
          <p className="mt-4 text-gray-700">Loading appointments...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-gradient-to-br from-[#f4f6fb] to-[#e9eaf7] min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600 bg-white p-8 rounded-xl shadow-2xl">
          <p className="text-lg font-semibold">Oops! Something went wrong.</p>
          <p className="text-sm mt-2 mb-4">{error}</p>
          <button 
            onClick={() => {
              dispatch(fetchAppointments());
              dispatch(fetchDoctors());
            }}
            className="mt-4 px-6 py-2 bg-gradient-to-r from-[#0A0F56] to-[#232a7c] text-white rounded-lg hover:from-[#232a7c] hover:to-[#0A0F56] transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Retry Loading Data
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-br from-[#f4f6fb] to-[#e9eaf7] min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0A0F56]">Appointment Dashboard</h1>
          <p className="text-gray-600 text-sm mt-1">
            Manage and track all patient appointments efficiently.
          </p>
        </div>
        <button 
          onClick={() => navigate('/add-appointment')}
          className="mt-4 sm:mt-0 bg-gradient-to-r from-[#0A0F56] to-[#232a7c] text-white px-5 py-2.5 rounded-xl text-sm font-medium flex items-center hover:from-[#232a7c] hover:to-[#0A0F56] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <FaPlus className="mr-2 text-base" />
          Schedule New Appointment
        </button>
      </div>

      {/* Filters and Search Section */}
      <div className="mb-6 p-5 bg-white rounded-lg shadow-md border border-gray-200">
        <div className="flex items-center mb-4">
          <FaFilter className="text-[#0A0F56] text-lg mr-2" />
          <h2 className="text-lg font-semibold text-[#0A0F56]">Filter & Search Appointments</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 items-end">
          {/* Search Input */}
          <div className="relative">
            <label htmlFor="search" className="block text-xs font-medium text-gray-600 mb-1.5">
              <FaSearch className="inline mr-1 mb-0.5 text-gray-400" /> Search by Patient / Date
            </label>
            <input
              type="text"
              id="search"
              placeholder="Enter name, email, or date (MM/DD/YYYY)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A0F56] focus:border-transparent transition-all shadow-sm hover:border-gray-400"
            />
          </div>

          {/* Doctor Filter */}
          <div>
            <label htmlFor="doctorFilter" className="block text-xs font-medium text-gray-600 mb-1.5">
              <FaUserMd className="inline mr-1 mb-0.5 text-gray-400" /> Filter by Doctor
            </label>
            <Select
              id="doctorFilter"
              options={[{ value: '', label: 'All Doctors' }, ...doctors.map((d: User) => ({ value: d.id, label: d.name })) ]}
              value={doctors.find((d: User) => d.id === selectedDoctorId) ? 
                { value: selectedDoctorId, label: doctors.find((d: User) => d.id === selectedDoctorId)?.name || '' } : 
                { value: '', label: 'All Doctors' }
              }
              onChange={(selectedOption) => setSelectedDoctorId(selectedOption ? selectedOption.value : null)}
              isClearable
              placeholder="Select a Doctor..."
              isLoading={isLoadingDoctors}
              styles={customSelectStyles}
              components={{ 
                DropdownIndicator:() => <FaCalendarAlt className="mx-2 text-gray-400" />,
                ClearIndicator: (props) => (
                  <components.ClearIndicator {...props}>
                    <FaTimesCircle className="text-gray-400 hover:text-red-500" />
                  </components.ClearIndicator>
                )
              }}
            />
          </div>

          {/* Status Filter */}
          <div>
            <label htmlFor="statusFilter" className="block text-xs font-medium text-gray-600 mb-1.5">
              <FaListAlt className="inline mr-1 mb-0.5 text-gray-400" /> Filter by Status
            </label>
            <Select
              id="statusFilter"
              options={[{ value: '', label: 'All Statuses' }, ...appointmentStatusOptions]}
              value={appointmentStatusOptions.find(option => option.value === selectedStatus) || { value: '', label: 'All Statuses' }}
              onChange={(selectedOption) => setSelectedStatus(selectedOption ? selectedOption.value : null)}
              isClearable
              placeholder="Select a Status..."
              styles={customSelectStyles}
              components={{ 
                DropdownIndicator:() => <FaCalendarAlt className="mx-2 text-gray-400" />,
                ClearIndicator: (props) => (
                  <components.ClearIndicator {...props}>
                    <FaTimesCircle className="text-gray-400 hover:text-red-500" />
                  </components.ClearIndicator>
                )
              }}
            />
          </div>
        </div>
      </div>

      <AppointmentTable appointments={transformedAppointments} />
      
      {filteredAppointments.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredAppointments.length / 10)} // Assuming 10 items per page
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default AppointmentList;

