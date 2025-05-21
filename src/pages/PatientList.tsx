import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from "react-icons/fa";
import { PatientTable } from '../components/Patient/PatientTable';
import { Pagination } from '../components/Common/Pagination';
import { AddPatientModal } from '../components/Patient/AddPatientModal';

const PatientList = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddPatient = (patientData: any) => {
        console.log('New patient data:', patientData);
        // Here you would typically make an API call to save the patient
        // and then refresh the patient list
    };

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
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border rounded-lg p-2 text-xs outline-none"
                    />
                    <div className="bg-blue-900 text-white p-2 rounded-lg text-xs flex flex-row items-center">
                        <FaPlus color="white" />
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className="ml-1"
                        >
                            Add Patient
                        </button>
                    </div>
                </div>
            </div>

            <PatientTable patients={patients} />
            
            <Pagination
                currentPage={currentPage}
                totalPages={10}
                onPageChange={setCurrentPage}
            />

            <AddPatientModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddPatient}
            />
        </div>
    );
};

export default PatientList;
