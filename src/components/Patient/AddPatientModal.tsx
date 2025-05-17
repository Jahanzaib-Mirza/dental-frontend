import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

interface AddPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (patientData: any) => void;
}

export const AddPatientModal: React.FC<AddPatientModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [formData, setFormData] = useState({
    patientName: '',
    patientSource: '',
    visitType: 'first-time',
    isInternational: false,
    doctor: '',
    visitType2: '',
    slotNumber: '',
    appointmentDate: '25/05/2022',
    appointmentTime: '03:00 PM',
    isWalkin: false,
    needsAttention: false,
    notes: '',
    enableRepeat: false
  });

  const [image, setImage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
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
    onSubmit({ ...formData, image });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[600px] max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Add Patient</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Patient Image Upload */}
          <div className="flex justify-center">
            <label htmlFor="patientImage" className="cursor-pointer">
              {image ? (
                <img 
                  src={image} 
                  alt="Patient" 
                  className="w-24 h-24 rounded-full object-cover border-2 border-[#0A0F56]"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-[#F8F7FF] border-2 border-dashed border-[#0A0F56] flex items-center justify-center">
                  <span className="text-[#0A0F56] text-sm">Add Photo</span>
                </div>
              )}
              <input
                id="patientImage"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Patient Name */}
          <div>
            <label className="block text-sm mb-2">Patient name</label>
            <div className="relative">
              <input
                type="text"
                name="patientName"
                value={formData.patientName}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg p-3 pr-12 text-sm"
                placeholder="Enter patient name & number"
              />
              <button 
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#0A0F56] text-white p-2 rounded-lg"
              >
                <FaSearch size={14} />
              </button>
            </div>
          </div>

          {/* About the patient */}
          <div>
            <label className="block text-sm mb-2">About the patient</label>
            <div className="bg-[#F8F7FF] p-4 rounded-lg space-y-3">
              <select
                name="patientSource"
                value={formData.patientSource}
                onChange={handleChange}
                className="w-full bg-white border border-gray-200 rounded-lg p-3 text-sm"
              >
                <option value="">Select patient source</option>
                <option value="referral">Referral</option>
                <option value="walk-in">Walk-in</option>
                <option value="online">Online</option>
              </select>

              <div className="flex space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="visitType"
                    value="first-time"
                    checked={formData.visitType === 'first-time'}
                    onChange={handleChange}
                    className="text-[#0A0F56]"
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
                    className="text-[#0A0F56]"
                  />
                  <span className="text-sm">Re-Visit</span>
                </label>
              </div>
            </div>

            <label className="flex items-center space-x-2 mt-2">
              <input
                type="checkbox"
                name="isInternational"
                checked={formData.isInternational}
                onChange={handleChange}
                className="text-[#0A0F56] rounded"
              />
              <span className="text-sm">International Patient</span>
            </label>
          </div>

          {/* Doctor */}
          <div>
            <label className="block text-sm mb-2">Doctor</label>
            <div className="grid grid-cols-3 gap-3">
              <select
                name="doctor"
                value={formData.doctor}
                onChange={handleChange}
                className="bg-white border border-gray-200 rounded-lg p-3 text-sm"
              >
                <option value="">Select doctor</option>
                <option value="dr-smith">Dr. Smith</option>
                <option value="dr-johnson">Dr. Johnson</option>
              </select>
              <select
                name="visitType2"
                value={formData.visitType2}
                onChange={handleChange}
                className="bg-white border border-gray-200 rounded-lg p-3 text-sm"
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
                className="bg-white border border-gray-200 rounded-lg p-3 text-sm"
              />
            </div>
          </div>

          {/* Time */}
          <div>
            <label className="block text-sm mb-2">Time</label>
            <div className="bg-[#F8F7FF] p-4 rounded-lg space-y-3">
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={formData.appointmentDate}
                  readOnly
                  className="bg-white border border-gray-200 rounded-lg p-3 text-sm"
                />
                <input
                  type="text"
                  value={formData.appointmentTime}
                  readOnly
                  className="bg-white border border-gray-200 rounded-lg p-3 text-sm"
                />
                <button
                  type="button"
                  className="text-[#0A0F56] text-sm hover:underline"
                >
                  Change Time
                </button>
              </div>

              <div className="flex space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="isWalkin"
                    checked={formData.isWalkin}
                    onChange={handleChange}
                    className="text-[#0A0F56] rounded"
                  />
                  <span className="text-sm">Mark Apt as Arrived</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="isWalkin"
                    checked={formData.isWalkin}
                    onChange={handleChange}
                    className="text-[#0A0F56] rounded"
                  />
                  <span className="text-sm">Is Walkin</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="needsAttention"
                    checked={formData.needsAttention}
                    onChange={handleChange}
                    className="text-[#0A0F56] rounded"
                  />
                  <span className="text-sm">Needs Attention</span>
                </label>
              </div>
            </div>
          </div>

          {/* Review Notes */}
          <div>
            <label className="block text-sm mb-2">Review Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Enter patient details..."
              className="w-full border border-gray-200 rounded-lg p-3 text-sm h-24 resize-none"
            />
          </div>

          {/* Enable repeats */}
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="enableRepeat"
              checked={formData.enableRepeat}
              onChange={handleChange}
              className="text-[#0A0F56] rounded"
            />
            <span className="text-sm">Enable repeats patient</span>
          </label>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#0A0F56] text-white px-6 py-3 rounded-lg text-sm hover:bg-[#090D45] transition-colors flex items-center"
            >
              Add Appointment
              <span className="ml-2">→</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 