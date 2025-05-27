import { useLocation, useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiPhone, FiCalendar, FiMapPin, FiActivity, FiDollarSign } from 'react-icons/fi';
import InitialAvatar from '../components/Common/InitialAvatar';
import { getInitials } from '../lib/utils/stringUtils';
import { calculateAge } from '../lib/utils/dateUtils';

// Mock appointment history data - replace with actual API data
const mockAppointmentHistory = [
  {
    id: 1,
    appointmentDate: '2024-03-15',
    doctor: 'Dr. Smith',
    totalAmount: 345.00,
    status: 'Completed',
    services: [
      { name: 'Dental Consultation', amount: 150.00 },
      { name: 'Teeth Cleaning', amount: 120.00 },
      { name: 'X-Ray Examination', amount: 75.00 }
    ],
    notes: 'Regular checkup with cleaning and preventive care'
  },
  {
    id: 2,
    appointmentDate: '2024-02-20',
    doctor: 'Dr. Johnson',
    totalAmount: 200.00,
    status: 'Completed',
    services: [
      { name: 'Filling', amount: 200.00 }
    ],
    notes: 'Composite filling for upper molar cavity'
  },
  {
    id: 3,
    appointmentDate: '2024-01-10',
    doctor: 'Dr. Smith',
    totalAmount: 950.00,
    status: 'Completed',
    services: [
      { name: 'Root Canal', amount: 800.00 },
      { name: 'X-Ray Examination', amount: 75.00 },
      { name: 'Consultation', amount: 75.00 }
    ],
    notes: 'Root canal treatment with follow-up consultation'
  },
  {
    id: 4,
    appointmentDate: '2023-12-05',
    doctor: 'Dr. Brown',
    totalAmount: 280.00,
    status: 'Completed',
    services: [
      { name: 'Teeth Whitening', amount: 250.00 },
      { name: 'Consultation', amount: 30.00 }
    ],
    notes: 'Professional teeth whitening treatment'
  },
  {
    id: 5,
    appointmentDate: '2023-11-18',
    doctor: 'Dr. Wilson',
    totalAmount: 120.00,
    status: 'Completed',
    services: [
      { name: 'Routine Cleaning', amount: 120.00 }
    ],
    notes: 'Regular dental cleaning and oral hygiene check'
  }
];

const PatientProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const patient = location.state?.patient;

  if (!patient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f4f6fb] to-[#e9eaf7] flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <p className="text-gray-500 text-lg mb-4">
          No patient data found. Please navigate from the patient list.
        </p>
          <button
            onClick={() => navigate('/patients')}
            className="bg-[#0A0F56] text-white px-6 py-2 rounded-lg hover:bg-[#232a7c] transition-colors"
          >
            Back to Patients
          </button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const totalSpent = mockAppointmentHistory.reduce((sum, service) => sum + service.totalAmount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f4f6fb] to-[#e9eaf7] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate('/patients')}
            className="flex items-center text-[#0A0F56] hover:text-[#232a7c] transition-colors"
          >
            <span className="mr-2">←</span>
            Back to Patients
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left Column - Patient Information */}
          <div className="lg:col-span-3 space-y-6">
            {/* Patient Header Card */}
            <div className="bg-gradient-to-r from-[#0A0F56] via-[#1a1f6b] to-[#232a7c] rounded-2xl shadow-xl p-6 text-white relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
              </div>
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                        <InitialAvatar 
                          initials={getInitials(patient.name)} 
                          size={12}
                          bgColor="bg-white"
                          textColor="text-[#0A0F56]"
                          className="text-lg font-bold shadow-none border-0"
                        />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-400 rounded-full flex items-center justify-center border-2 border-white">
                        <span className="text-white text-xs font-bold">✓</span>
                      </div>
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold mb-1 text-white">{patient.name}</h1>
                      <p className="text-blue-100 text-sm font-medium">Patient Profile</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1 border border-white/20">
                      <p className="text-xs text-blue-100 font-medium">Patient ID</p>
                      <p className="text-sm font-bold text-white">{patient.id}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="px-4 py-2 bg-emerald-500/20 backdrop-blur-sm rounded-full text-sm font-semibold text-emerald-100 border border-emerald-400/30">
                      ✓ Active Patient
                    </span>
                    <span className="px-4 py-2 bg-blue-500/20 backdrop-blur-sm rounded-full text-sm font-semibold text-blue-100 border border-blue-400/30">
                      {mockAppointmentHistory.length} Total Visits
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-blue-100 font-medium">Member Since</p>
                    <p className="text-sm font-bold text-white">
                      {patient.createdAt ? new Date(patient.createdAt).getFullYear() : '2024'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics Card */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                  <FiDollarSign className="text-white text-lg" />
                </div>
                <h3 className="text-xl font-bold text-[#0A0F56]">Patient Statistics</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard 
                  label="Total Visits"
                  value={mockAppointmentHistory.length.toString()}
                  color="bg-blue-500"
                />
                <StatCard 
                  label="Total Spent"
                  value={`$${totalSpent.toFixed(0)}`}
                  color="bg-green-500"
                />
                <StatCard 
                  label="Last Visit"
                  value={new Date(mockAppointmentHistory[0]?.appointmentDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  color="bg-purple-500"
                />
                <StatCard 
                  label="Status"
                  value="Active"
                  color="bg-emerald-500"
                />
              </div>
            </div>

            {/* Contact Information Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#0A0F56] rounded-lg flex items-center justify-center">
                  <FiUser className="text-white text-lg" />
                </div>
                <h3 className="text-xl font-bold text-[#0A0F56]">Contact Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoCard 
                  icon={<FiMail className="text-[#0A0F56]" />}
                  label="Email Address"
                  value={patient.email || `${patient.username}@example.com`}
                />
                <InfoCard 
                  icon={<FiPhone className="text-[#0A0F56]" />}
                  label="Phone Number"
                  value={patient.phone || '+1 (555) 123-4567'}
                />
                <InfoCard 
                  icon={<FiMapPin className="text-[#0A0F56]" />}
                  label="Address"
                  value={patient.address || 'Not provided'}
                />
                <InfoCard 
                  icon={<FiCalendar className="text-[#0A0F56]" />}
                  label="Date of Birth"
                  value={patient.dob ? new Date(patient.dob).toLocaleDateString() : 'Not provided'}
                />
              </div>
            </div>

            {/* Personal Details Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#0A0F56] rounded-lg flex items-center justify-center">
                  <FiActivity className="text-white text-lg" />
                </div>
                <h3 className="text-xl font-bold text-[#0A0F56]">Personal Details</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <InfoCard 
                  icon={<FiUser className="text-[#0A0F56]" />}
                  label="Gender"
                  value={patient.gender || patient.sex || 'Not specified'}
                />
                <InfoCard 
                  icon={<FiCalendar className="text-[#0A0F56]" />}
                  label="Age"
                  value={`${patient.age || calculateAge(patient.dob)} years`}
                />
                <InfoCard 
                  icon={<FiActivity className="text-[#0A0F56]" />}
                  label="Blood Type"
                  value={patient.bloodType || 'Not specified'}
                />
              </div>
            </div>

            {/* Medical Information Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                  <FiActivity className="text-white text-lg" />
                </div>
                <h3 className="text-xl font-bold text-[#0A0F56]">Medical Information</h3>
              </div>
              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FiActivity className="text-red-600" />
                    <span className="font-semibold text-red-800">Current Condition</span>
                  </div>
                  <p className="text-red-700">{patient.disease || patient.reason || 'General checkup'}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoCard 
                    icon={<FiUser className="text-[#0A0F56]" />}
                    label="Allergies"
                    value={patient.allergies || 'None reported'}
                  />
                  <InfoCard 
                    icon={<FiActivity className="text-[#0A0F56]" />}
                    label="Emergency Contact"
                    value={patient.emergencyContact || 'Not provided'}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Appointment History */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#0A0F56]">Treatment History</h2>
                <span className="text-sm text-gray-500">
                  {mockAppointmentHistory.length} total appointments
                </span>
              </div>

              {mockAppointmentHistory.length === 0 ? (
                <div className="text-center py-12">
                  <FiActivity className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No Appointment History</h3>
                  <p className="text-gray-500">This patient hasn't had any appointments yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {mockAppointmentHistory.map((appointment) => (
                    <div 
                      key={appointment.id}
                      className="bg-gradient-to-r from-[#f8f9fd] to-white rounded-xl p-5 border border-gray-100 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-[#0A0F56]">
                              Appointment #{appointment.id}
                            </h3>
                            <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(appointment.status)}`}>
                              {appointment.status}
                            </span>
                          </div>
                          
                          <p className="text-gray-600 text-sm mb-3">{appointment.notes}</p>
                          
                          {/* Services in this appointment */}
                          <div className="mb-4">
                            <h4 className="text-sm font-semibold text-gray-700 mb-2">Services Provided:</h4>
                            <div className="grid grid-cols-1 gap-2">
                              {appointment.services.map((service, index) => (
                                <div key={index} className="flex justify-between items-center bg-gray-50 rounded-lg px-3 py-2">
                                  <span className="text-sm text-gray-700">{service.name}</span>
                                  <span className="text-sm font-semibold text-[#0A0F56]">${service.amount.toFixed(2)}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <FiCalendar className="text-[#0A0F56]" />
                              <span className="text-gray-600">Date:</span>
                              <span className="font-medium">
                                {new Date(appointment.appointmentDate).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FiUser className="text-[#0A0F56]" />
                              <span className="text-gray-600">Doctor:</span>
                              <span className="font-medium">{appointment.doctor}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FiDollarSign className="text-[#0A0F56]" />
                              <span className="text-gray-600">Total:</span>
                              <span className="font-semibold text-[#0A0F56]">
                                ${appointment.totalAmount.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Summary Footer */}
              {mockAppointmentHistory.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="bg-gradient-to-r from-[#0A0F56] to-[#232a7c] rounded-xl p-4 text-white">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold">Total Appointments Completed</h4>
                        <p className="text-blue-100 text-sm">Complete appointment history</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">{mockAppointmentHistory.length}</div>
                        <div className="text-blue-100 text-sm">Appointments</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for info items
// const InfoItem = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
//   <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
//     <div className="flex-shrink-0">{icon}</div>
//     <div className="flex-1 min-w-0">
//       <p className="text-sm font-medium text-gray-700">{label}</p>
//       <p className="text-sm text-gray-900 truncate">{value}</p>
//     </div>
//   </div>
// );

// Enhanced info card component
const InfoCard = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 hover:shadow-sm transition-shadow">
    <div className="flex items-center gap-3">
      <div className="flex-shrink-0">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</p>
        <p className="text-sm font-semibold text-gray-900 truncate mt-1">{value}</p>
      </div>
    </div>
  </div>
);

// Statistics card component
const StatCard = ({ label, value, color }: { label: string; value: string; color: string }) => (
  <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
    <div className="text-center">
      <div className={`w-8 h-8 ${color} rounded-lg flex items-center justify-center mx-auto mb-2`}>
        <span className="text-white text-sm font-bold">{value.charAt(0)}</span>
      </div>
      <p className="text-lg font-bold text-gray-900">{value}</p>
      <p className="text-xs text-gray-500 font-medium">{label}</p>
    </div>
  </div>
);

export default PatientProfile;
