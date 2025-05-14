import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddAppointment = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    patientName: '',
    doctor: '',
    date: '',
    time: '',
    reason: '',
  });

  const [image, setImage] = useState<string | null>(null);

  const patients = ['John Doe', 'Alice Smith', 'Michael Brown']; // Replace with real data

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted:', form, image);
    // Send form + image to backend
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-[#0A0F56]">Add Appointment</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 rounded-xl shadow-md">

          {/* Left Section: Form */}
          <div className="space-y-6">

            {/* Patient Dropdown */}
            <div>
              <label className="block text-sm font-semibold mb-1 text-[#0A0F56]">Patient Name</label>
              <select
                name="patientName"
                value={form.patientName}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A0F56]"
              >
                <option value="">Select a patient</option>
                {patients.map((patient, idx) => (
                  <option key={idx} value={patient}>{patient}</option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => navigate('/add-patient')}
                className="mt-2 text-sm text-[#0A0F56] underline hover:text-[#05093a]"
              >
                + Add New Patient
              </button>
            </div>

            {/* Doctor Selection */}
            <div>
              <label className="block text-sm font-semibold mb-1 text-[#0A0F56]">Doctor</label>
              <select
                name="doctor"
                value={form.doctor}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A0F56]"
              >
                <option value="">Select a doctor</option>
                <option value="Dr. Smith">Dr. Smith</option>
                <option value="Dr. Johnson">Dr. Johnson</option>
              </select>
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

          {/* Right Section: Image Upload */}
          <div className="flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-lg p-4 h-full">
            <label htmlFor="imageUpload" className="cursor-pointer flex flex-col items-center">
              {image ? (
                <img src={image} alt="Preview" className="w-40 h-40 rounded-full object-cover mb-3" />
              ) : (
                <div className="w-40 h-40 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-3">
                  No Image
                </div>
              )}
              <span className="text-sm text-[#0A0F56] hover:underline">Click to upload image</span>
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

        </div>
      </form>
    </div>
  );
};

export default AddAppointment;
