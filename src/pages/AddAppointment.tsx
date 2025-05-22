import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { AddPatientModal } from '../components/Patient/AddPatientModal';
import { FiUser, FiCalendar, FiClock, FiFileText, FiPlus } from 'react-icons/fi';

const AddAppointment = () => {
  const navigate = useNavigate();
  const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    patientName: '',
    patientSource: '',
    visitType: 'first-time',
    isInternational: false,
    doctor: '',
    visitType2: '',
    slotNumber: '',
    appointmentDate: '',
    appointmentTime: '',
    isWalkin: false,
    needsAttention: false,
    notes: '',
    enableRepeat: false
  });

  const patients = ['John Doe', 'Alice Smith', 'Michael Brown'];
  const doctors = ['Dr. Smith', 'Dr. Johnson'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted:', { ...formData });
    // Submit logic here
  };

  const handleAddPatient = (patientData: any) => {
    console.log('New patient data:', patientData);
    setIsPatientModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f4f6fb] to-[#e9eaf7] py-3 px-4 sm:px-6 flex flex-col items-center">
      <div className="w-full max-w-5xl">
        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-3xl border border-[#E0E3F0] overflow-hidden">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-[#0A0F56] to-[#232a7c] px-8 py-2">
              <h1 className="text-3xl font-bold text-white text-center">Schedule New Appointment</h1>
              <p className="text-center text-blue-100 mt-1">Fill in the details below to create a new appointment</p>
            </div>

            <div className="p-8 py-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-6">
                {/* Left Column */}
                <div className="space-y-8">
                  {/* Patient Information Card */}
                  <div className="bg-gradient-to-br from-[#f8f9fd] to-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-center mb-4">
                      <FiUser className="text-[#0A0F56] text-xl mr-3" />
                      <h2 className="text-xl font-semibold text-[#0A0F56]">Patient Information</h2>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Patient Name</label>
                        <Select
                          options={patients.map((p) => ({ value: p, label: p }))}
                          value={formData.patientName ? { value: formData.patientName, label: formData.patientName } : null}
                          onChange={(selected) => setFormData((prev) => ({ ...prev, patientName: selected ? selected.value : '' }))}
                          isClearable
                          isSearchable
                          placeholder="Select or search patient name"
                          className="text-sm"
                          styles={{
                            control: (base) => ({
                              ...base,
                              borderRadius: '0.75rem',
                              borderColor: '#e5e7eb',
                              minHeight: '48px',
                              boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                              '&:hover': {
                                borderColor: '#0A0F56'
                              }
                            }),
                            menu: (base) => ({
                              ...base,
                              borderRadius: '0.75rem',
                              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                            })
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => setIsPatientModalOpen(true)}
                          className="mt-1 inline-flex items-center text-sm text-[#0A0F56] hover:text-[#232a7c] transition-colors"
                        >
                          <FiPlus className="mr-1" />
                          Add New Patient
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Doctor Assignment Card */}
                  <div className="bg-gradient-to-br from-[#f8f9fd] to-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-center mb-4">
                      <FiUser className="text-[#0A0F56] text-xl mr-3" />
                      <h2 className="text-xl font-semibold text-[#0A0F56]">Doctor Assignment</h2>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Select Doctor</label>
                      <Select
                        options={doctors.map((d) => ({ value: d, label: d }))}
                        value={formData.doctor ? { value: formData.doctor, label: formData.doctor } : null}
                        onChange={(selected) => setFormData((prev) => ({ ...prev, doctor: selected ? selected.value : '' }))}
                        isClearable
                        isSearchable
                        placeholder="Select or search doctor"
                        className="text-sm"
                        styles={{
                          control: (base) => ({
                            ...base,
                            borderRadius: '0.75rem',
                            borderColor: '#e5e7eb',
                            minHeight: '48px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                            '&:hover': {
                              borderColor: '#0A0F56'
                            }
                          }),
                          menu: (base) => ({
                            ...base,
                            borderRadius: '0.75rem',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                          })
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                  {/* Visit Details Card */}
                  <div className="bg-gradient-to-br from-[#f8f9fd] to-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-center mb-4">
                      <FiCalendar className="text-[#0A0F56] text-xl mr-3" />
                      <h2 className="text-xl font-semibold text-[#0A0F56]">Visit Details</h2>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Appointment Time</label>
                        <div className="bg-white rounded-xl p-4 shadow-sm">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="relative">
                              <input
                                type="date"
                                name="appointmentDate"
                                value={formData.appointmentDate}
                                onChange={handleChange}
                                className="w-full bg-white border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A0F56] focus:border-transparent transition-all"
                              />
                            </div>
                            <div className="relative">
                              <input
                                type="time"
                                name="appointmentTime"
                                value={formData.appointmentTime}
                                onChange={handleChange}
                                className="w-full bg-white border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A0F56] focus:border-transparent transition-all"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Notes Section Card */}
                  <div className="bg-gradient-to-br from-[#f8f9fd] to-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-center mb-2">
                      <FiFileText className="text-[#0A0F56] text-lg mr-2" />
                      <h2 className="text-lg font-semibold text-[#0A0F56]">Additional Information</h2>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Review Notes</label>
                        <textarea
                          name="notes"
                          value={formData.notes}
                          onChange={handleChange}
                          placeholder="Enter appointment details..."
                          className="w-full border border-gray-200 rounded-lg p-2 text-sm h-16 resize-none focus:outline-none focus:ring-2 focus:ring-[#0A0F56] focus:border-transparent transition-all bg-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-4 py-2">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#0A0F56] to-[#232a7c] text-white py-4 rounded-xl text-lg font-semibold hover:from-[#232a7c] hover:to-[#0A0F56] transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Schedule Appointment
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <AddPatientModal
        isOpen={isPatientModalOpen}
        onClose={() => setIsPatientModalOpen(false)}
        onSubmit={handleAddPatient}
      />
    </div>
  );
};

export default AddAppointment;
