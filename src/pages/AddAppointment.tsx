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
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-[#0A0F56]">Add Appointment</h1>
      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-2xl shadow-lg border border-[#E0E3F0] p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Patient Name Section */}
              <div className="bg-white rounded-xl p-6 border border-gray-100">
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
                    />
                    <span
                      className="mt-2 inline-block text-sm text-[#0A0F56] underline cursor-pointer hover:text-[#232a7c]"
                      onClick={() => setIsPatientModalOpen(true)}
                    >
                      Add Patient
                    </span>
                  </div>

                  {/* About the patient */}
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">About the patient</label>
                    <div className="bg-[#F8F7FF] p-4 rounded-lg space-y-4">
                      <select
                        name="patientSource"
                        value={formData.patientSource}
                        onChange={handleChange}
                        className="w-full bg-white border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#0A0F56] focus:border-transparent"
                      >
                        <option value="">Select patient source</option>
                        <option value="referral">Referral</option>
                        <option value="walk-in">Walk-in</option>
                        <option value="online">Online</option>
                      </select>

                      <div className="flex space-x-6">
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="visitType"
                            value="first-time"
                            checked={formData.visitType === 'first-time'}
                            onChange={handleChange}
                            className="text-[#0A0F56] focus:ring-[#0A0F56]"
                          />
                          <span className="text-sm">First-Time Visit</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="visitType"
                            value="re-visit"
                            checked={formData.visitType === 're-visit'}
                            onChange={handleChange}
                            className="text-[#0A0F56] focus:ring-[#0A0F56]"
                          />
                          <span className="text-sm">Re-Visit</span>
                        </label>
                      </div>
                    </div>

                    <label className="flex items-center space-x-2 mt-3">
                      <input
                        type="checkbox"
                        name="isInternational"
                        checked={formData.isInternational}
                        onChange={handleChange}
                        className="text-[#0A0F56] rounded focus:ring-[#0A0F56]"
                      />
                      <span className="text-sm">International Patient</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Doctor Selection */}
              <div className="bg-white rounded-xl p-6 border border-gray-100">
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
                  />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Visit Details */}
              <div className="bg-white rounded-xl p-6 border border-gray-100">
                <h2 className="text-lg font-semibold text-[#0A0F56] mb-4">Visit Details</h2>
                <div className="space-y-4">
                  {/* Visit Type & Slot */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Visit Type & Slot</label>
                    <div className="grid grid-cols-2 gap-4">
                      <select
                        name="visitType2"
                        value={formData.visitType2}
                        onChange={handleChange}
                        className="bg-white border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#0A0F56] focus:border-transparent"
                      >
                        <option value="">Select visit type</option>
                        <option value="consultation">Consultation</option>
                        <option value="follow-up">Follow-up</option>
                      </select>
                      <input
                        type="text"
                        name="slotNumber"
                        value={formData.slotNumber}
                        onChange={handleChange}
                        placeholder="Enter slots number"
                        className="bg-white border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#0A0F56] focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Time Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Appointment Time</label>
                    <div className="bg-[#F8F7FF] p-4 rounded-lg space-y-4">
                      <div className="flex space-x-4">
                        <input
                          type="date"
                          name="appointmentDate"
                          value={formData.appointmentDate}
                          onChange={handleChange}
                          className="flex-1 bg-white border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#0A0F56] focus:border-transparent"
                        />
                        <input
                          type="time"
                          name="appointmentTime"
                          value={formData.appointmentTime}
                          onChange={handleChange}
                          className="flex-1 bg-white border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#0A0F56] focus:border-transparent"
                        />
                      </div>
                      <div className="flex flex-wrap gap-4">
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            name="isWalkin"
                            checked={formData.isWalkin}
                            onChange={handleChange}
                            className="text-[#0A0F56] rounded focus:ring-[#0A0F56]"
                          />
                          <span className="text-sm">Mark Apt as Arrived</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            name="isWalkin"
                            checked={formData.isWalkin}
                            onChange={handleChange}
                            className="text-[#0A0F56] rounded focus:ring-[#0A0F56]"
                          />
                          <span className="text-sm">Is Walkin</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            name="needsAttention"
                            checked={formData.needsAttention}
                            onChange={handleChange}
                            className="text-[#0A0F56] rounded focus:ring-[#0A0F56]"
                          />
                          <span className="text-sm">Needs Attention</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes Section */}
              <div className="bg-white rounded-xl p-6 border border-gray-100">
                <h2 className="text-lg font-semibold text-[#0A0F56] mb-4">Additional Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Review Notes</label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Enter appointment details..."
                      className="w-full border border-gray-200 rounded-lg p-3 text-sm h-32 resize-none focus:ring-2 focus:ring-[#0A0F56] focus:border-transparent"
                    />
                  </div>

                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="enableRepeat"
                      checked={formData.enableRepeat}
                      onChange={handleChange}
                      className="text-[#0A0F56] rounded focus:ring-[#0A0F56]"
                    />
                    <span className="text-sm">Enable repeat appointment</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button - Full Width */}
          <div className="mt-8">
            <button
              type="submit"
              className="w-full bg-[#0A0F56] text-white py-4 rounded-xl text-sm font-medium hover:bg-[#090D45] transition-colors flex items-center justify-center shadow-lg"
            >
              Add Appointment
              <span className="ml-2">→</span>
            </button>
          </div>
        </div>
      </form>

      <AddPatientModal
        isOpen={isPatientModalOpen}
        onClose={() => setIsPatientModalOpen(false)}
        onSubmit={handleAddPatient}
      />
    </div>
  );
};

export default AddAppointment;
