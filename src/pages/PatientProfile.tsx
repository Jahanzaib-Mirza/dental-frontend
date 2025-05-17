// import React from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// const PatientProfile = () => {
//   const { state } = useLocation();
//   const navigate = useNavigate();

//   const patient = state?.patient;

//   if (!patient) {
//     return (
//       <div className="p-6">
//         <p className="text-red-500 text-sm">No patient data found.</p>
//         <button
//           className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
//           onClick={() => navigate(-1)}
//         >
//           Go Back
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6">
//         <div className="flex items-center space-x-4 mb-6">
//           <img
//             src={patient.image}
//             alt={patient.name}
//             className="w-16 h-16 rounded-full"
//           />
//           <div>
//             <h2 className="text-xl font-semibold">{patient.name}</h2>
//             <p className="text-gray-500 text-sm">{patient.username}</p>
//           </div>
//         </div>

//         <div className="space-y-3 text-sm text-gray-700">
//           <p><span className="font-medium">Patient ID:</span> {patient.id}</p>
//           <p><span className="font-medium">Email:</span> {patient.username}@example.com</p>
//           <p><span className="font-medium">Age:</span> {patient.age}</p>
//           <p><span className="font-medium">Gender:</span> {patient.sex}</p>
//           <p><span className="font-medium">Disease:</span> {patient.disease}</p>
//           <p><span className="font-medium">Doctor:</span> {patient.doctor}</p>
//           <p><span className="font-medium">Appointment Date:</span> {patient.date}</p>
//         </div>

//         <button
//           className="mt-6 bg-blue-600 text-white px-4 py-2 rounded text-sm"
//           onClick={() => navigate(-1)}
//         >
//           ← Back to Patient List
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PatientProfile;

import { useLocation, useNavigate } from 'react-router-dom';

const PatientProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const patient = location.state?.patient;

  if (!patient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-500 text-lg">
          No patient data found. Please navigate from the patient list.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-xl overflow-hidden">
        <div className="grid md:grid-cols-3 gap-6">

          {/* Left - Patient Details */}
          <div className="md:col-span-2 p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{patient.name}</h2>
            <p className="text-sm text-gray-500 mb-6">Profile Overview</p>

            <div className="space-y-4 text-gray-700 text-sm">
              <Detail label="Patient ID" value={patient.id} />
              <Detail label="Email" value={`${patient.username}@example.com`} />
              <Detail label="Age" value={patient.age} />
              <Detail label="Gender" value={patient.sex} />
              <Detail label="Disease" value={patient.disease} />
              <Detail label="Doctor" value={patient.doctor} />
              <Detail label="Appointment Date" value={patient.date} />
            </div>

            {/* Medical History */}
            <div className="mt-10">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Medical History</h3>
              <ul className="pl-4 list-disc text-gray-600 space-y-1 text-sm">
                <li>Jan 10, 2024 - Diagnosed with Fever</li>
                <li>Feb 18, 2024 - Diagnosed with Flu</li>
                <li>Mar 22, 2024 - Follow-up Consultation</li>
                {/* Replace with dynamic data if needed */}
              </ul>
            </div>

            <button
              onClick={() => navigate(-1)}
              className="mt-8 inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-sm transition"
            >
              ← Back to Patient List
            </button>
          </div>

          {/* Right - Image */}
          <div className="bg-gray-100 flex items-center justify-center p-8">
            <img
              src={patient.image}
              alt={patient.name}
              className="w-48 h-48 object-cover rounded-full border-2 border-gray-200 shadow-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Detail component for cleaner layout
const Detail = ({ label, value }) => (
  <p>
    <span className="font-medium text-gray-800">{label}:</span>{' '}
    <span className="text-gray-600">{value}</span>
  </p>
);

export default PatientProfile;
