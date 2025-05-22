import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from "react-icons/fa";
import { PatientTable } from '../components/Patient/PatientTable';
import { Pagination } from '../components/Common/Pagination';
import { AddPatientModal } from '../components/Patient/AddPatientModal';
import { EditPatientModal } from '../components/Patient/EditPatientModal';
import { useAppDispatch, useAppSelector } from '../lib/hooks';
import { fetchPatients, createPatient, updatePatient } from '../lib/store/slices/patientsSlice';
import type { RootState } from '../lib/store/store';
import type { Patient } from '../lib/api/services/patients';
import { toast } from 'react-hot-toast';

const PatientList = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
    
    const { patients, isLoading, error, isCreating, isUpdating } = useAppSelector((state: RootState) => state.patients);

    useEffect(() => {
        dispatch(fetchPatients());
    }, [dispatch]);

    const handleAddPatient = async (patientData: any) => {
        try {
            await dispatch(createPatient(patientData)).unwrap();
            toast.success('Patient added successfully');
            setIsAddModalOpen(false);
        } catch (err) {
            toast.error('Failed to add patient');
        }
    };

    const handleEditPatient = async (id: string, patientData: any) => {
        try {
            await dispatch(updatePatient({ id, patientData })).unwrap();
            toast.success('Patient updated successfully');
            setIsEditModalOpen(false);
            setSelectedPatient(null);
        } catch (err) {
            toast.error('Failed to update patient');
        }
    };

    const handleEditClick = (patient: Patient) => {
        setSelectedPatient(patient);
        setIsEditModalOpen(true);
    };

    // Filter patients based on search term
    const filteredPatients = Array.isArray(patients) ? patients.filter(patient => 
        patient.email.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

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
                            onClick={() => setIsAddModalOpen(true)}
                            className="ml-1"
                            disabled={isCreating}
                        >
                            Add Patient
                        </button>
                    </div>
                </div>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center h-full">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0A0F56]"></div>
                </div>
            ) : error ? (
                <div className="text-red-500 p-4 bg-red-50 rounded-md">
                    Error loading patients: {error}
                </div>
            ) : filteredPatients.length === 0 ? (
                <div className="text-gray-500 p-4 bg-gray-50 rounded-md">
                    No patients found.
                </div>
            ) : (
                <>
                    <PatientTable 
                        patients={filteredPatients} 
                        onEdit={handleEditClick}
                    />
                    
                    <Pagination
                        currentPage={currentPage}
                        totalPages={Math.ceil(filteredPatients.length / 10)}
                        onPageChange={setCurrentPage}
                    />
                </>
            )}

            <AddPatientModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSubmit={handleAddPatient}
                isSubmitting={isCreating}
            />

            <EditPatientModal
                isOpen={isEditModalOpen}
                onClose={() => {
                    setIsEditModalOpen(false);
                    setSelectedPatient(null);
                }}
                onSubmit={handleEditPatient}
                patient={selectedPatient}
                isSubmitting={isUpdating}
            />
        </div>
    );
};

export default PatientList;
