import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { FiClock, FiCalendar, FiUpload } from 'react-icons/fi';
import Select from 'react-select';
import type { MultiValue } from 'react-select';

const serviceOptions = [
  { value: 'consultation', label: 'Consultation' },
  { value: 'xray', label: 'X-Ray' },
  { value: 'cleaning', label: 'Cleaning' },
  { value: 'filling', label: 'Filling' },
  { value: 'extraction', label: 'Extraction' },
  { value: 'whitening', label: 'Whitening' },
];

const AppointmentDetails = () => {
  const location = useLocation();
  const appointment = location.state?.appointment;

  // Editable fields: empty by default
  const [reason, setReason] = useState('');
  const [reviewNotes, setReviewNotes] = useState('');
  const [selectedServices, setSelectedServices] = useState<MultiValue<{ value: string; label: string }>>([]);
  const [isInternational, setIsInternational] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // For status dropdowns
  // const [roomNumber, setRoomNumber] = useState('Room Number: 288');
  // const [riskStatus, setRiskStatus] = useState('Risky');
  // const [treatmentStatus, setTreatmentStatus] = useState('Under Treatment');

  if (!appointment) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500 text-lg">
          No appointment data found. Please navigate from the appointment list.
        </p>
      </div>
    );
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSave = () => {
    // Here you would typically send the data to your backend
    console.log('Saved:', { reason, reviewNotes, isInternational, selectedFile, selectedServices });
    alert('Diagnosis details saved!');
  };

  return (
    <div className="h-full p-6 bg-gray-50">
      {/* Main Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-[#E0E3F0] h-full">
        <div className="grid grid-cols-12 h-full">
          {/* Left Column - Patient Info */}
          <div className="col-span-4 p-6 border-r border-[#E0E3F0] overflow-y-auto h-full">
            {/* Patient Image, Name, Age/Gender */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative mb-2">
                <img
                  src={appointment.image}
                  alt={appointment.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#2563EB] rounded-full flex items-center justify-center border-2 border-white">
                  <span className="text-white text-lg">✓</span>
                </div>
              </div>
              <div className="text-center">
                <h2 className="font-bold text-xl text-[#232360]">{appointment.name}</h2>
                <p className="text-sm text-gray-500 mt-1">{appointment.age} Years, {appointment.sex}</p>
              </div>
            </div>
            {/* Reason For Consultation Card */}
            <div className="bg-[#F0F4FF] rounded-xl p-4 mb-8 shadow border border-[#D1D9F0] w-full">
              <p className="text-xs text-[#232360] mb-2 font-bold">Reason For Consultation</p>
              <div>
                <textarea
                  className="w-full border border-[#B6C3E6] rounded-lg p-3 text-sm h-20 resize-none bg-[#F7F8FA] font-semibold text-[#232360]"
                  value={reason}
                  onChange={e => setReason(e.target.value)}
                  placeholder="Enter reason for consultation..."
                />
              </div>
            </div>
            {/* Two-column grid for Email, Phone, DOB, Diseases */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-xs mb-2">
              <div>
                <p className="text-gray-500 font-semibold">Email</p>
                <p className="text-[#232360] font-bold break-all">{appointment.username}@gmail.com</p>
              </div>
              <div>
                <p className="text-gray-500 font-semibold">Phone</p>
                <p className="text-[#232360] font-bold">(704) 555-0127</p>
              </div>
              <div>
                <p className="text-gray-500 font-semibold">Date of Birth</p>
                <p className="text-[#232360] font-bold">14 February 2001</p>
              </div>
              <div>
                <p className="text-gray-500 font-semibold">Diseases</p>
                <p className="text-[#232360] font-bold">Cardiology</p>
              </div>
            </div>
          </div>
          {/* Right Column - Styled Form */}
          <div className="col-span-8 p-6 overflow-y-auto h-full">
            <form onSubmit={e => { e.preventDefault(); handleSave(); }} className="space-y-8">
              <div className="grid grid-cols-2 gap-8">
                <FormField label="Doctor" value="Dr. Stephen Conley" readOnly />
                <FormField label="Patient Name" value={appointment.name} readOnly />
                {/* Services Multi-Select */}
              
                <FormIconField label="Start Time" value="11:20 pm" icon={<FiClock className="text-[#2563EB] mr-2" />} readOnly />
                <FormIconField label="Date of Consultation" value="16-12-2021" icon={<FiCalendar className="text-[#2563EB] mr-2" />} readOnly />
              </div>
              <div className="col-span-2">
                  <label className="block text-sm mb-2 font-bold text-[#232360]">Services</label>
                  <Select
                    isMulti
                    options={serviceOptions}
                    value={selectedServices}
                    onChange={setSelectedServices}
                    classNamePrefix="react-select"
                    placeholder="Select services..."
                    styles={{
                      control: (base, state) => ({ ...base, minHeight: '44px', borderRadius: '0.75rem', borderColor: state.isFocused ? '#2563EB' : '#B6C3E6', boxShadow: state.isFocused ? '0 0 0 2px #2563EB33' : 'none', background: '#F7F8FA', fontWeight: 600 }),
                      multiValue: (base) => ({ ...base, backgroundColor: '#2563EB22', color: '#232360', fontWeight: 600 }),
                      option: (base, state) => ({ ...base, backgroundColor: state.isSelected ? '#0A0F56' : state.isFocused ? '#F0F4FF' : 'white', color: state.isSelected ? 'white' : '#232360', fontWeight: 600 }),
                      placeholder: (base) => ({ ...base, color: '#A0AEC0', fontWeight: 500 }),
                    }}
                  />
                </div>
              <FormTextArea
                label="Medicines"
                value={reason}
                onChange={e => setReason(e.target.value)}
                placeholder="Enter prescribed medicines..."
              />
              <FormTextArea
                label="Review Notes"
                value={reviewNotes}
                onChange={e => setReviewNotes(e.target.value)}
                placeholder="Enter review notes..."
              />
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={isInternational}
                  onChange={e => setIsInternational(e.target.checked)}
                  className="accent-[#2563EB] rounded focus:ring-2 focus:ring-[#2563EB]"
                />
                <span className="text-sm font-semibold text-[#232360]">International Patient</span>
              </div>
              {/* File Upload */}
              <div className="bg-[#F7F8FA] border-2 border-dashed border-[#2563EB] rounded-lg p-8 text-center flex flex-col items-center transition-shadow hover:shadow-lg">
                <FiUpload className="text-3xl text-[#2563EB] mb-2" />
                <p className="text-base text-[#232360] mb-1 font-semibold">
                  <span className="text-[#2563EB] font-bold cursor-pointer">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-400 mb-2">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="mt-2 inline-block cursor-pointer text-[#2563EB] text-sm font-semibold"
                >
                  Browse Files
                </label>
              </div>
              {/* File Progress */}
              {selectedFile && (
                <div className="mt-4 bg-[#F7F8FA] rounded-lg p-4 border border-[#2563EB]">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-[#2563EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                      {selectedFile.name} <span className="text-gray-400 ml-2">200 KB</span>
                    </span>
                    <span className="font-semibold text-[#2563EB]">10%</span>
                  </div>
                  <div className="bg-gray-200 h-1 rounded-full mt-1">
                    <div className="bg-[#2563EB] h-1 rounded-full w-[10%]"></div>
                  </div>
                </div>
              )}
              <div className="flex justify-end mt-10">
                <button
                  type="submit"
                  className="bg-[#0A0F56] text-white px-8 py-3 rounded-lg text-base hover:bg-[#2563EB] transition font-bold shadow-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Components
// const DetailField = ({ label, value }: { label: string; value: string }) => (
//   <div>
//     <p className="text-sm text-gray-500">{label}</p>
//     <p className="text-sm">{value}</p>
//   </div>
// );

const FormField = ({ label, value, readOnly = false }: { label: string; value: string; readOnly?: boolean }) => (
  <div>
    <label className="block text-sm mb-2 font-bold text-[#232360]">{label}</label>
    <input
      type="text"
      value={value}
      readOnly={readOnly}
      className="w-full border border-[#B6C3E6] rounded-lg p-3 text-sm bg-[#F7F8FA] font-semibold text-[#232360] focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]"
    />
  </div>
);

// const FormSelect = ({ label, value, options }: { label: string; value: string; options: string[] }) => (
//   <div>
//     <label className="block text-sm mb-2 font-bold text-[#232360]">{label}</label>
//     <select className="w-full border border-[#B6C3E6] rounded-lg p-3 text-sm bg-[#F7F8FA] font-semibold text-[#232360] focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]" value={value}>
//       {options.map(opt => <option key={opt}>{opt}</option>)}
//     </select>
//   </div>
// );

const FormIconField = ({ label, value, icon, readOnly = false }: { label: string; value: string; icon: React.ReactNode; readOnly?: boolean }) => (
  <div>
    <label className="block text-sm mb-2 font-bold text-[#232360]">{label}</label>
    <div className="flex items-center border border-[#B6C3E6] rounded-lg p-3 bg-[#F7F8FA] font-semibold text-[#232360] focus-within:border-[#2563EB] focus-within:ring-2 focus-within:ring-[#2563EB]">
      {icon}
      <input
        type="text"
        value={value}
        readOnly={readOnly}
        className="bg-transparent border-none outline-none text-sm w-full font-semibold text-[#232360]"
      />
    </div>
  </div>
);

const FormTextArea = ({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; placeholder?: string }) => (
  <div>
    <label className="block text-sm mb-2 font-bold text-[#232360]">{label}</label>
    <textarea
      className="w-full border border-[#B6C3E6] rounded-lg p-3 text-sm h-20 resize-none bg-[#F7F8FA] font-semibold text-[#232360] focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  </div>
);

export default AppointmentDetails; 