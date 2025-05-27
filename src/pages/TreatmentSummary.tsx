import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FiClock, FiCalendar, FiEye, FiCpu, FiUser, FiFileText, FiDollarSign } from 'react-icons/fi';
import { calculateAge } from '../lib/utils/dateUtils';
import InitialAvatar from '../components/Common/InitialAvatar';
import { getInitials } from '../lib/utils/stringUtils';
import { useAppDispatch, useAppSelector } from '../lib/hooks';
import { fetchTreatment, fetchTreatmentByAppointment } from '../lib/store/slices/treatmentsSlice';
import type { RootState } from '../lib/store/store';

const TreatmentSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const appointment = location.state?.appointment;
  const dispatch = useAppDispatch();
  
  const { currentTreatment, isLoading } = useAppSelector((state: RootState) => state.treatments);

  useEffect(() => {
    if (appointment?.treatmentId) {
      // If appointment has treatmentId, fetch by treatment ID
      dispatch(fetchTreatment(appointment.treatmentId));
    } else if (appointment?.id) {
      // Otherwise, try to fetch treatment by appointment ID
      dispatch(fetchTreatmentByAppointment(appointment.id));
    }
  }, [dispatch, appointment?.treatmentId, appointment?.id]);

  if (!appointment) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50">
        <div className="text-center bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <p className="text-gray-500 text-lg mb-4">
            No appointment data found. Please navigate from the appointment list.
          </p>
          <button
            onClick={() => navigate('/appointments')}
            className="bg-[#0A0F56] text-white px-6 py-2 rounded-lg hover:bg-[#232a7c] transition-colors"
          >
            Back to Appointments
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0A0F56] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading treatment details...</p>
        </div>
      </div>
    );
  }

  const handlePreviewReportImage = (imageUrl: string) => {
    if (imageUrl) {
      window.open(imageUrl, '_blank');
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const totalAmount = currentTreatment?.servicesUsed?.reduce((sum, service) => sum + service.price, 0) || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f4f6fb] to-[#e9eaf7] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate('/appointments')}
            className="flex items-center text-[#0A0F56] hover:text-[#232a7c] transition-colors"
          >
            <span className="mr-2">←</span>
            Back to Appointments
          </button>
          <div className="flex items-center gap-3">
            <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold border border-green-200">
              ✓ Treatment Completed
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Patient & Appointment Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Patient Header Card */}
            <div className="bg-gradient-to-r from-[#0A0F56] via-[#1a1f6b] to-[#232a7c] rounded-2xl shadow-xl p-6 text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
              </div>
              
              <div className="relative z-10">
                <div className="flex flex-col items-center mb-4">
                  <div className="relative mb-3">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                      <InitialAvatar 
                        initials={getInitials(appointment.patient.name)} 
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
                  <div className="text-center">
                    <h2 className="text-xl font-bold mb-1 text-white">{appointment.patient.name}</h2>
                    <p className="text-blue-100 text-sm">
                      {appointment.patient.dob ? calculateAge(appointment.patient.dob) : 'N/A'} Years, {appointment.patient.gender}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Appointment Details Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#0A0F56] rounded-lg flex items-center justify-center">
                  <FiCalendar className="text-white text-lg" />
                </div>
                <h3 className="text-xl font-bold text-[#0A0F56]">Appointment Details</h3>
              </div>
              <div className="space-y-4">
                <ReadOnlyField label="Doctor" value={appointment.doctor.name} icon={<FiUser className="text-[#0A0F56]" />} />
                <ReadOnlyField label="Date" value={appointment.date ? new Date(appointment.date).toLocaleDateString() : 'N/A'} icon={<FiCalendar className="text-[#0A0F56]" />} />
                <ReadOnlyField label="Time" value={appointment.time} icon={<FiClock className="text-[#0A0F56]" />} />
                <ReadOnlyField label="Reason for Visit" value={appointment.reason} icon={<FiFileText className="text-[#0A0F56]" />} />
              </div>
            </div>

            {/* Patient Contact Info */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <FiUser className="text-white text-lg" />
                </div>
                <h3 className="text-xl font-bold text-[#0A0F56]">Patient Information</h3>
              </div>
              <div className="space-y-3">
                <div className="text-sm">
                  <p className="text-gray-500 font-semibold">Email</p>
                  <p className="text-[#232360] font-bold break-all">{appointment.patient.email}</p>
                </div>
                <div className="text-sm">
                  <p className="text-gray-500 font-semibold">Phone</p>
                  <p className="text-[#232360] font-bold">{appointment.patient.phone}</p>
                </div>
                <div className="text-sm">
                  <p className="text-gray-500 font-semibold">Date of Birth</p>
                  <p className="text-[#232360] font-bold">{appointment.patient.dob ? new Date(appointment.patient.dob).toLocaleDateString() : 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Treatment Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Treatment Summary Header */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                    <FiFileText className="text-white text-lg" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#0A0F56]">Treatment Summary</h2>
                </div>
                {currentTreatment && (
                  <div className="text-right text-sm text-gray-500">
                    <p>Created: {formatDate(currentTreatment.createdAt)}</p>
                    <p>Updated: {formatDate(currentTreatment.updatedAt)}</p>
                  </div>
                )}
              </div>
              
              {/* Treatment Information Grid */}
              {currentTreatment && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  <ReadOnlyField 
                    label="Treatment ID" 
                    value={currentTreatment.id || 'N/A'} 
                    icon={<FiFileText className="text-[#0A0F56]" />} 
                  />
                  <ReadOnlyField 
                    label="Appointment ID" 
                    value={currentTreatment.appointment || 'N/A'} 
                    icon={<FiCalendar className="text-[#0A0F56]" />} 
                  />
                  <ReadOnlyField 
                    label="Doctor ID" 
                    value={currentTreatment.doctor || 'N/A'} 
                    icon={<FiUser className="text-[#0A0F56]" />} 
                  />
                  <ReadOnlyField 
                    label="Patient ID" 
                    value={currentTreatment.patient || 'N/A'} 
                    icon={<FiUser className="text-[#0A0F56]" />} 
                  />
                  <ReadOnlyField 
                    label="Organization" 
                    value={currentTreatment.organization || 'N/A'} 
                    icon={<FiFileText className="text-[#0A0F56]" />} 
                  />
                  <ReadOnlyField 
                    label="Location" 
                    value={currentTreatment.location || 'N/A'} 
                    icon={<FiFileText className="text-[#0A0F56]" />} 
                  />
                </div>
              )}
            </div>

            {/* Invoice Information */}
            {currentTreatment && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                    <FiDollarSign className="text-white text-lg" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#0A0F56]">Invoice Information</h3>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <ReadOnlyField 
                    label="Invoice Status" 
                    value={currentTreatment.invoice ? 'Generated' : 'Not Generated'} 
                    icon={<FiDollarSign className="text-[#0A0F56]" />} 
                  />
                  {currentTreatment.invoice && (
                    <div className="mt-3">
                      <ReadOnlyField 
                        label="Invoice ID" 
                        value={currentTreatment.invoice} 
                        icon={<FiFileText className="text-[#0A0F56]" />} 
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Diagnosis & Notes */}
            {currentTreatment && (
              <>
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                  <h3 className="text-lg font-semibold text-[#0A0F56] mb-4">Diagnosis & Treatment Notes</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-[#232360] mb-2">Diagnosis</label>
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm min-h-[80px] whitespace-pre-wrap">
                        {currentTreatment.diagnosis || 'No diagnosis provided'}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#232360] mb-2">Treatment Notes</label>
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm min-h-[80px] whitespace-pre-wrap">
                        {currentTreatment.notes || 'No notes provided'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Services Used */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-[#0A0F56]">Services Provided</h3>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Total Amount</p>
                      <p className="text-xl font-bold text-[#0A0F56]">${totalAmount.toFixed(2)}</p>
                    </div>
                  </div>
                  {currentTreatment.servicesUsed && currentTreatment.servicesUsed.length > 0 ? (
                    <div className="space-y-3">
                      {currentTreatment.servicesUsed.map((service, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg px-4 py-3 border border-gray-200">
                          <div className="flex justify-between items-center">
                            <div className="flex-1">
                              <p className="font-medium text-gray-800">{service.name}</p>
                              <p className="text-xs text-gray-500 mt-1">Service ID: {service.id}</p>
                            </div>
                            <span className="font-bold text-[#0A0F56] text-lg">${service.price.toFixed(2)}</span>
                          </div>
                        </div>
                      ))}
                      <div className="border-t border-gray-300 pt-3 mt-4">
                        <div className="flex justify-between items-center bg-[#0A0F56] text-white rounded-lg px-4 py-3">
                          <span className="font-semibold">Total Amount</span>
                          <span className="font-bold text-xl">${totalAmount.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
                      <FiDollarSign className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-gray-500">No services recorded for this treatment</p>
                    </div>
                  )}
                </div>

                {/* Prescribed Medications */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                      <FiFileText className="text-white text-lg" />
                    </div>
                    <h3 className="text-lg font-semibold text-[#0A0F56]">Prescribed Medications</h3>
                  </div>
                  {currentTreatment.prescribedMedications && currentTreatment.prescribedMedications.length > 0 ? (
                    <div className="space-y-4">
                      {currentTreatment.prescribedMedications.map((medication, index) => (
                        <div key={index} className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                            <div className="bg-white rounded-lg p-3 border border-blue-100">
                              <p className="font-semibold text-blue-800 text-xs uppercase tracking-wide">Medicine Name</p>
                              <p className="text-blue-700 font-medium mt-1">{medication.name}</p>
                            </div>
                            <div className="bg-white rounded-lg p-3 border border-blue-100">
                              <p className="font-semibold text-blue-800 text-xs uppercase tracking-wide">Dosage</p>
                              <p className="text-blue-700 font-medium mt-1">{medication.dosage}</p>
                            </div>
                            <div className="bg-white rounded-lg p-3 border border-blue-100">
                              <p className="font-semibold text-blue-800 text-xs uppercase tracking-wide">Frequency</p>
                              <p className="text-blue-700 font-medium mt-1">{medication.frequency}</p>
                            </div>
                            <div className="bg-white rounded-lg p-3 border border-blue-100">
                              <p className="font-semibold text-blue-800 text-xs uppercase tracking-wide">Duration</p>
                              <p className="text-blue-700 font-medium mt-1">{medication.duration}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 bg-blue-50 rounded-lg border border-blue-200">
                      <FiFileText className="mx-auto h-8 w-8 text-blue-400 mb-2" />
                      <p className="text-blue-600">No medications prescribed for this treatment</p>
                    </div>
                  )}
                </div>

                {/* Reports */}
                {currentTreatment.reports && currentTreatment.reports.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                    <h3 className="text-lg font-semibold text-[#0A0F56] mb-4">Medical Reports</h3>
                    <div className="space-y-4">
                      {currentTreatment.reports.map((report, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-800">{report.testName}</h4>
                              <p className="text-sm text-gray-600 mt-1">{report.result}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              {report.aiAnalysis && (
                                <>
                                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                                    <FiCpu className="mr-1 h-3 w-3" />
                                    AI Analyzed
                                  </span>
                                  {report.aiAnalysis.imageType && (
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                                      {report.aiAnalysis.imageType.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                    </span>
                                  )}
                                </>
                              )}
                              {report.imageUrl && (
                                <button
                                  onClick={() => handlePreviewReportImage(report.imageUrl)}
                                  className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-100 transition-colors"
                                  title="View Image"
                                >
                                  <FiEye size={18} />
                                </button>
                              )}
                            </div>
                          </div>
                          
                          {/* AI Analysis Results */}
                          {report.aiAnalysis && (
                            <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <h5 className="text-sm font-semibold text-blue-900">AI Analysis Results</h5>
                                <span className="text-sm text-blue-700 font-medium">
                                  {report.aiAnalysis.confidence}% Confidence
                                </span>
                              </div>
                              
                              {report.aiAnalysis.detectedConditions && report.aiAnalysis.detectedConditions.length > 0 && (
                                <div className="mb-3">
                                  <p className="text-sm font-semibold text-blue-800 mb-2">Detected Conditions:</p>
                                  <div className="flex flex-wrap gap-1">
                                    {report.aiAnalysis.detectedConditions.map((condition, condIndex) => (
                                      <span
                                        key={condIndex}
                                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200"
                                      >
                                        {condition}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                              
                              {report.aiAnalysis.recommendations && report.aiAnalysis.recommendations.length > 0 && (
                                <div>
                                  <p className="text-sm font-semibold text-blue-800 mb-2">AI Recommendations:</p>
                                  <ul className="text-sm text-blue-700 space-y-1">
                                    {report.aiAnalysis.recommendations.slice(0, 3).map((rec, recIndex) => (
                                      <li key={recIndex} className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>{rec}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Follow-up Information */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                  <h3 className="text-lg font-semibold text-[#0A0F56] mb-4">Follow-up Information</h3>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm font-semibold text-gray-700">Follow-up Recommended</p>
                        <p className="text-sm text-gray-900 mt-1">
                          {currentTreatment.followUpRecommended ? 'Yes' : 'No'}
                        </p>
                      </div>
                      {currentTreatment.followUpRecommended && (
                        <>
                          <div>
                            <p className="text-sm font-semibold text-gray-700">Follow-up Date</p>
                            <p className="text-sm text-gray-900 mt-1">
                              {currentTreatment.followUpDate || 'Not scheduled'}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-700">Follow-up Time</p>
                            <p className="text-sm text-gray-900 mt-1">
                              {currentTreatment.followUpTime || 'Not scheduled'}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}

            {!currentTreatment && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <div className="text-center py-8">
                  <FiFileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No Treatment Data Available</h3>
                  <p className="text-gray-500 mb-4">
                    Treatment details for this appointment are not available yet.
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
                    <h4 className="font-semibold text-blue-800 mb-2">Note:</h4>
                    <p className="text-blue-700 text-sm">
                      Treatment data will be available after the appointment is completed and the doctor has recorded the treatment details including diagnosis, medications, services, and reports.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for read-only fields
const ReadOnlyField = ({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) => (
  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
    <div className="flex-shrink-0">{icon}</div>
    <div className="flex-1 min-w-0">
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</p>
      <p className="text-sm font-semibold text-gray-900 truncate mt-1">{value}</p>
    </div>
  </div>
);

export default TreatmentSummary; 