import React from "react";
import { useNavigate } from 'react-router-dom';


const AppointmentTable = () => {
  const navigate = useNavigate();

  const patients = [
    {
      name: "Olivia Rhyne",
      username: "@olivia",
      id: "#85736733",
      date: "Dec 07, 23",
      sex: "Male",
      age: 70,
      disease: "Diabetes",
      status: "Complete",
      doctor: "Dr. Mohon Roy",
      image: "https://i.pravatar.cc/40?img=1",
    },
    {
      name: "Phoenix Baker",
      username: "@phoenix",
      id: "#85736734",
      date: "Dec 09, 23",
      sex: "Female",
      age: 63,
      disease: "Blood pressure",
      status: "In-Treatment",
      doctor: "Dr. Imran Ali",
      image: "https://i.pravatar.cc/40?img=2",
    },
      {
      name: "Olivia Rhyne",
      username: "@olivia",
      id: "#85736733",
      date: "Dec 07, 23",
      sex: "Male",
      age: 70,
      disease: "Diabetes",
      status: "Complete",
      doctor: "Dr. Mohon Roy",
      image: "https://i.pravatar.cc/40?img=1",
    },
    {
      name: "Phoenix Baker",
      username: "@phoenix",
      id: "#85736734",
      date: "Dec 09, 23",
      sex: "Female",
      age: 63,
      disease: "Blood pressure",
      status: "In-Treatment",
      doctor: "Dr. Imran Ali",
      image: "https://i.pravatar.cc/40?img=2",
    },  {
      name: "Olivia Rhyne",
      username: "@olivia",
      id: "#85736733",
      date: "Dec 07, 23",
      sex: "Male",
      age: 70,
      disease: "Diabetes",
      status: "Complete",
      doctor: "Dr. Mohon Roy",
      image: "https://i.pravatar.cc/40?img=1",
    },
    {
      name: "Phoenix Baker",
      username: "@phoenix",
      id: "#85736734",
      date: "Dec 09, 23",
      sex: "Female",
      age: 63,
      disease: "Blood pressure",
      status: "In-Treatment",
      doctor: "Dr. Imran Ali",
      image: "https://i.pravatar.cc/40?img=2",
    },  {
      name: "Olivia Rhyne",
      username: "@olivia",
      id: "#85736733",
      date: "Dec 07, 23",
      sex: "Male",
      age: 70,
      disease: "Diabetes",
      status: "Complete",
      doctor: "Dr. Mohon Roy",
      image: "https://i.pravatar.cc/40?img=1",
    },
    {
      name: "Phoenix Baker",
      username: "@phoenix",
      id: "#85736734",
      date: "Dec 09, 23",
      sex: "Female",
      age: 63,
      disease: "Blood pressure",
      status: "In-Treatment",
      doctor: "Dr. Imran Ali",
      image: "https://i.pravatar.cc/40?img=2",
    },  {
      name: "Olivia Rhyne",
      username: "@olivia",
      id: "#85736733",
      date: "Dec 07, 23",
      sex: "Male",
      age: 70,
      disease: "Diabetes",
      status: "Complete",
      doctor: "Dr. Mohon Roy",
      image: "https://i.pravatar.cc/40?img=1",
    },
    {
      name: "Phoenix Baker",
      username: "@phoenix",
      id: "#85736734",
      date: "Dec 09, 23",
      sex: "Female",
      age: 63,
      disease: "Blood pressure",
      status: "In-Treatment",
      doctor: "Dr. Imran Ali",
      image: "https://i.pravatar.cc/40?img=2",
    },
    // You can add more patients here...
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">Appointment List</h2>
          <p className="text-gray-500 text-xs">
            Showing: All Consultations of All Healthcare Providers
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <input
            type="text"
            placeholder="Search by email"
            className="border rounded-lg p-2 text-xs outline-none"
          />
          <button className="bg-blue-900 text-white p-2 rounded-lg text-xs" 
                onClick={() => navigate('/add-appointment')}
          >
            + Add Appointment
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center mb-4">
          <h3 className="text-sm font-medium">Patients List</h3>
          <span className="bg-blue-100 ml-2 text-blue-600 text-xs px-2 py-1 rounded-full">
            {patients.length} users
          </span>
        </div>

        <table className="w-full border-collapse text-xs">
          <thead>
            <tr className="bg-gray-100 text-gray-600">
              <th className="text-left p-2">Patient Name</th>
              <th className="text-left p-2">Patient ID</th>
              <th className="text-left p-2">Date</th>
              <th className="text-left p-2">Sex</th>
              <th className="text-left p-2">Age</th>
              <th className="text-left p-2">Disease</th>
              <th className="text-left p-2">Status</th>
              <th className="text-left p-2">Doctor Name</th>
              <th className="text-left p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient, index) => (
              <tr key={index} className="border-t border-gray-200 text-gray-700 hover:bg-gray-50">
                <td className="flex items-center space-x-2 p-2">
                  <img
                    src={patient.image}
                    alt="profile"
                    className="w-6 h-6 rounded-full"
                  />
                  <div>
                    <p className="font-sm">{patient.name}</p>
                    <p className="text-gray-500 text-xxs">{patient.username}</p>
                  </div>
                </td>
                <td className="p-2">{patient.id}</td>
                <td className="p-2">{patient.date}</td>
                <td className="p-2">{patient.sex}</td>
                <td className="p-2">{patient.age}</td>
                <td className="p-2">{patient.disease}</td>
                <td className="p-2">
                  <span
                    className={`px-2 py-1 text-xxs rounded-full ${
                      patient.status === "Complete"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {patient.status}
                  </span>
                </td>
                <td className="p-2">{patient.doctor}</td>
                <td className="p-2 flex space-x-2">
                  <button className="text-gray-400 hover:text-blue-500 text-xxs">✏️</button>
                  <button className="text-gray-400 hover:text-red-500 text-xxs">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 text-xs">
          <button className="px-3 py-1 bg-gray-200 rounded-lg">← Previous</button>
          <div className="flex space-x-1">
            <button className="px-2 py-1 bg-blue-500 text-white rounded-lg">1</button>
            <button className="px-2 py-1 bg-gray-200 rounded-lg">2</button>
            <button className="px-2 py-1 bg-gray-200 rounded-lg">3</button>
            <span className="px-2 py-1">...</span>
            <button className="px-2 py-1 bg-gray-200 rounded-lg">10</button>
          </div>
          <button className="px-3 py-1 bg-gray-200 rounded-lg">Next →</button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentTable;
