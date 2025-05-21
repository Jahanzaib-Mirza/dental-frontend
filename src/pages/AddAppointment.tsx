import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { AddPatientModal } from '../components/Patient/AddPatientModal';

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
    <div className="min-h-screen bg-gradient-to-br from-[#f4f6fb] to-[#e9eaf7] py-2 px-2 sm:px-6 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-3xl shadow-2xl border border-[#E0E3F0] px-8 md:p-6">
            <h1 className="text-2xl font-bold text-[#0A0F56] text-center drop-shadow-sm mb-4">Add Appointment</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-8">
              {/* Left Column */}
              <div className="space-y-8">
                {/* Patient Name Section */}
                <div className="bg-[#f8f9fd] rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <h2 className="text-lg font-semibold text-[#0A0F56] mb-4">Patient Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Patient name</label>
                      <Select
                        options={patients.map((p) => ({ value: p, label: p }))}
                        value={formData.patientName ? { value: formData.patientName, label: formData.patientName } : null}
                        onChange={(selected) => setFormData((prev) => ({ ...prev, patientName: selected ? selected.value : '' }))}
                        isClearable
                        isSearchable
                        placeholder="Select or search patient name"
                        className="text-sm"
                        styles={{
                          control: (base) => ({ ...base, borderRadius: '0.75rem', borderColor: '#e5e7eb', minHeight: '44px' }),
                          menu: (base) => ({ ...base, borderRadius: '0.75rem' })
                        }}
                      />
                      <span
                        className="mt-2 inline-block text-sm text-[#0A0F56] underline cursor-pointer hover:text-[#232a7c] transition-colors"
                        onClick={() => setIsPatientModalOpen(true)}
                      >
                        Add Patient
                      </span>
                    </div>
                  </div>
                </div>

                {/* Doctor Selection */}
                <div className="bg-[#f8f9fd] rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <h2 className="text-lg font-semibold text-[#0A0F56] mb-4">Doctor Assignment</h2>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Select Doctor</label>
                    <Select
                      options={doctors.map((d) => ({ value: d, label: d }))}
                      value={formData.doctor ? { value: formData.doctor, label: formData.doctor } : null}
                      onChange={(selected) => setFormData((prev) => ({ ...prev, doctor: selected ? selected.value : '' }))}
                      isClearable
                      isSearchable
                      placeholder="Select or search doctor"
                      className="text-sm"
                      styles={{
                        control: (base) => ({ ...base, borderRadius: '0.75rem', borderColor: '#e5e7eb', minHeight: '44px' }),
                        menu: (base) => ({ ...base, borderRadius: '0.75rem' })
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                {/* Visit Details */}
                <div className="bg-[#f8f9fd] rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <h2 className="text-lg font-semibold text-[#0A0F56] mb-4">Visit Details</h2>
                  <div className="space-y-4">
                    {/* Visit Type & Slot */}


                    {/* Time Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 ">Appointment Time</label>
                      <div className="bg-[#F8F7FF] py-3 rounded-lg space-y-4">
                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-2">
                          <input
                            type="date"
                            name="appointmentDate"
                            value={formData.appointmentDate}
                            onChange={handleChange}
                            className="flex-1 bg-white border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A0F56] focus:border-transparent transition-shadow focus:shadow-md"
                          />
                          <input
                            type="time"
                            name="appointmentTime"
                            value={formData.appointmentTime}
                            onChange={handleChange}
                            className="flex-1 bg-white border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A0F56] focus:border-transparent transition-shadow focus:shadow-md"
                          />
                        </div>

                      </div>
                    </div>
                  </div>
                </div>

                {/* Notes Section */}
                <div className="bg-[#f8f9fd] rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <h2 className="text-lg font-semibold text-[#0A0F56] mb-4">Additional Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Review Notes</label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder="Enter appointment details..."
                        className="w-full border border-gray-200 rounded-lg p-3 text-sm h-32 resize-none focus:outline-none focus:ring-2 focus:ring-[#0A0F56] focus:border-transparent transition-shadow focus:shadow-md"
                      />
                    </div>

                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button - Full Width */}
            <div className="mt-10">
              <button
                type="submit"
                className="w-full bg-[#0A0F56] text-white py-4 rounded-2xl text-base font-semibold hover:bg-[#090D45] transition-colors flex items-center justify-center shadow-xl tracking-wide group"
              >
                Add Appointment
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </button>
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
