import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { AddPatientModal } from '../components/Patient/AddPatientModal';

const AddAppointment = () => {
  const navigate = useNavigate();
  const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);

  const [form, setForm] = useState({
    patientName: '',
    doctor: '',
    date: '',
    time: '',
    reason: '',
  });

  const patients = ['John Doe', 'Alice Smith', 'Michael Brown'];
  const doctors = ['Dr. Smith', 'Dr. Johnson'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted:', form);
    // Submit logic here
  };

  const handleAddPatient = (patientData: any) => {
    console.log('New patient data:', patientData);
    // Here you would typically make an API call to save the patient
    // and then refresh the patient list
    setIsPatientModalOpen(false);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-[#0A0F56]">Add Appointment</h1>

      <form onSubmit={handleSubmit}>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="space-y-6 max-w-2xl">
            {/* Patient Name */}
            <div>
              <label className="block text-sm font-semibold mb-1 text-[#0A0F56]">Patient Name</label>
              <Select
                options={patients.map((p) => ({ value: p, label: p }))}
                value={form.patientName ? { value: form.patientName, label: form.patientName } : null}
                onChange={(selected) => setForm((prev) => ({ ...prev, patientName: selected?.value || '' }))}
                isClearable
                placeholder="Select a patient"
                className="text-sm"
              />
              <button
                type="button"
                onClick={() => setIsPatientModalOpen(true)}
                className="mt-2 text-sm text-[#0A0F56] underline hover:text-[#05093a]"
              >
                + Add New Patient
              </button>
            </div>

            {/* Doctor */}
            <div>
              <label className="block text-sm font-semibold mb-1 text-[#0A0F56]">Doctor</label>
              <Select
                options={doctors.map((d) => ({ value: d, label: d }))}
                value={form.doctor ? { value: form.doctor, label: form.doctor } : null}
                onChange={(selected) => setForm((prev) => ({ ...prev, doctor: selected?.value || '' }))}
                isClearable
                placeholder="Select a doctor"
                className="text-sm"
              />
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1 text-[#0A0F56]">Date</label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A0F56]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-[#0A0F56]">Time</label>
                <input
                  type="time"
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A0F56]"
                />
              </div>
            </div>

            {/* Reason */}
            <div>
              <label className="block text-sm font-semibold mb-1 text-[#0A0F56]">Reason</label>
              <textarea
                name="reason"
                value={form.reason}
                onChange={handleChange}
                rows={3}
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A0F56]"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-[#0A0F56] text-white px-4 py-2 rounded-md hover:bg-[#060b3e] transition"
            >
              Submit Appointment
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
