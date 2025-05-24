import api from '../axios';
import { API_ENDPOINTS } from '../endpoints';

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: 'male' | 'female' | 'other';
  dob: string;
  address: string;
  medicalHistory?: string;
  allergies?: string;
  balance: number;
}

export interface CreatePatientData {
  name: string;
  email: string;
  phone: string;
  gender: 'male' | 'female' | 'other';
  dob: string;
  address: string;
  medicalHistory?: string;
  allergies?: string;
}

export const patientService = {
  getPatients: async () => {
    const response = await api.get(API_ENDPOINTS.PATIENTS.BASE);
    return response.data;
  },

  getPatient: async (id: string) => {
    const response = await api.get(API_ENDPOINTS.PATIENTS.BY_ID(id));
    return response.data;
  },

  createPatient: async (data: CreatePatientData) => {
    const response = await api.post(API_ENDPOINTS.PATIENTS.BASE, data);
    return response.data;
  },

  updatePatient: async (id: string, data: Partial<CreatePatientData>) => {
    const response = await api.put(API_ENDPOINTS.PATIENTS.BY_ID(id), data);
    return response.data;
  }
}; 