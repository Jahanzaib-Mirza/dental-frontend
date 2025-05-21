import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
// import Icon from "../components/Icons";
import { FaPlus } from "react-icons/fa";
import { AppointmentTable } from "../components/Appointment/AppointmentTable";
import { Pagination } from "../components/Common/Pagination";

const AppointmentList = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const appointments = [
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded-lg p-2 text-xs outline-none"
          />
          <div className="bg-blue-900 text-white p-2 rounded-lg text-xs flex flex-row items-center">
            <FaPlus color="white" />
            <button 
              onClick={() => navigate('/add-appointment')}
              className="ml-1"
            >
              Add Appointment
            </button>
          </div>
        </div>
      </div>

      <AppointmentTable appointments={appointments} />
      
      <Pagination
        currentPage={currentPage}
        totalPages={10}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default AppointmentList;

