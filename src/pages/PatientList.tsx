import React from 'react';
import { useNavigate } from 'react-router-dom';

const patients = [

    {
        name: "Olivia Rhyne",
        username: "@olivia",
        id: "#85736733",
        date: "Dec 07, 23",
        sex: "Male",
        age: 70,
        disease: "Diabetes",
        doctor: "Dr. Mohon Roy",
        image: "https://i.pravatar.cc/40?img=1",
    },
    {
        name: "Phoenix Baker",
        username: "@phoenix",
        id: "#85736735",
        date: "Dec 09, 23",
        sex: "Female",
        age: 63,
        disease: "Blood pressure",
        doctor: "Dr. Imran Ali",
        image: "https://i.pravatar.cc/40?img=2",
    },
    {
        name: "Eleanor Pena",
        username: "@eleanor",
        id: "#85736736",
        date: "Dec 10, 23",
        sex: "Female",
        age: 45,
        disease: "Thyroid",
        doctor: "Dr. Mahira",
        image: "https://i.pravatar.cc/40?img=3",
    },
    {
        name: "Olivia Rhyne",
        username: "@olivia",
        id: "#85736733",
        date: "Dec 07, 23",
        sex: "Male",
        age: 70,
        disease: "Diabetes",
        doctor: "Dr. Mohon Roy",
        image: "https://i.pravatar.cc/40?img=1",
    },
    {
        name: "Phoenix Baker",
        username: "@phoenix",
        id: "#85736735",
        date: "Dec 09, 23",
        sex: "Female",
        age: 63,
        disease: "Blood pressure",
        doctor: "Dr. Imran Ali",
        image: "https://i.pravatar.cc/40?img=2",
    },
    {
        name: "Eleanor Pena",
        username: "@eleanor",
        id: "#85736736",
        date: "Dec 10, 23",
        sex: "Female",
        age: 45,
        disease: "Thyroid",
        doctor: "Dr. Mahira",
        image: "https://i.pravatar.cc/40?img=3",
    }, {
        name: "Olivia Rhyne",
        username: "@olivia",
        id: "#85736733",
        date: "Dec 07, 23",
        sex: "Male",
        age: 70,
        disease: "Diabetes",
        doctor: "Dr. Mohon Roy",
        image: "https://i.pravatar.cc/40?img=1",
    },
    {
        name: "Phoenix Baker",
        username: "@phoenix",
        id: "#85736735",
        date: "Dec 09, 23",
        sex: "Female",
        age: 63,
        disease: "Blood pressure",
        doctor: "Dr. Imran Ali",
        image: "https://i.pravatar.cc/40?img=2",
    },
    {
        name: "Eleanor Pena",
        username: "@eleanor",
        id: "#85736736",
        date: "Dec 10, 23",
        sex: "Female",
        age: 45,
        disease: "Thyroid",
        doctor: "Dr. Mahira",
        image: "https://i.pravatar.cc/40?img=3",
    }, {
        name: "Olivia Rhyne",
        username: "@olivia",
        id: "#85736733",
        date: "Dec 07, 23",
        sex: "Male",
        age: 70,
        disease: "Diabetes",
        doctor: "Dr. Mohon Roy",
        image: "https://i.pravatar.cc/40?img=1",
    },
    {
        name: "Phoenix Baker",
        username: "@phoenix",
        id: "#85736735",
        date: "Dec 09, 23",
        sex: "Female",
        age: 63,
        disease: "Blood pressure",
        doctor: "Dr. Imran Ali",
        image: "https://i.pravatar.cc/40?img=2",
    },
    {
        name: "Eleanor Pena",
        username: "@eleanor",
        id: "#85736736",
        date: "Dec 10, 23",
        sex: "Female",
        age: 45,
        disease: "Thyroid",
        doctor: "Dr. Mahira",
        image: "https://i.pravatar.cc/40?img=3",
    },
];

const PatientList = () => {
    const navigate = useNavigate();

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-xl font-semibold">Patient List</h2>
                    <p className="text-gray-500 text-xs">
                        Showing: All Patients and Their Information
                    </p>
                </div>
                {/* <input
          type="text"
          placeholder="Search patients..."
          className="border rounded-lg p-2 text-xs outline-none"
        />
          <button className="bg-blue-900 text-white p-2 rounded-lg text-xs"
          >
            + Add Appointment
          </button> */}
                <div className="flex items-center space-x-3">
                    <input
                        type="text"
                        placeholder="Search by email"
                        className="border rounded-lg p-2 text-xs outline-none"
                    />
                    <button className="bg-blue-900 text-white p-2 rounded-lg text-xs"
                        onClick={() => navigate('/add-patient')}
                    >
                        + Add Patient
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow-md p-4">
                <div className="flex items-center mb-4">
                    <h3 className="text-sm font-medium">Patients</h3>
                    <span className="bg-blue-100 ml-2 text-blue-600 text-xs px-2 py-1 rounded-full">
                        {patients.length} patients
                    </span>
                </div>

                <table className="w-full border-collapse text-xs">
                    <thead>
                        <tr className="bg-gray-100 text-gray-600">
                            <th className="text-left p-2">Patient</th>
                            <th className="text-left p-2">Patient ID</th>
                            <th className="text-left p-2">Date</th>
                            <th className="text-left p-2">Sex</th>
                            <th className="text-left p-2">Age</th>
                            <th className="text-left p-2">Disease</th>
                            <th className="text-left p-2">Doctor</th>
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
                                        <p>{patient.name}</p>
                                        <p className="text-gray-500 text-xxs">{patient.username}</p>
                                    </div>
                                </td>
                                <td className="p-2">{patient.id}</td>
                                <td className="p-2">{patient.date}</td>
                                <td className="p-2">{patient.sex}</td>
                                <td className="p-2">{patient.age}</td>
                                <td className="p-2">{patient.disease}</td>
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

export default PatientList;
