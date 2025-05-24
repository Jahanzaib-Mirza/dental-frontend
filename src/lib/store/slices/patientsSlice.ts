import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { patientService } from '../../api/services/patients';
import type { Patient, CreatePatientData } from '../../api/services/patients';

interface PatientsState {
  patients: Patient[];
  isLoading: boolean;
  error: string | null;
  isCreating: boolean;
  isUpdating: boolean;
}

const initialState: PatientsState = {
  patients: [],
  isLoading: false,
  error: null,
  isCreating: false,
  isUpdating: false,
};

export const fetchPatients = createAsyncThunk(
  'patients/fetchPatients',
  async () => {
    const response = await patientService.getPatients();
    return response.data;
  }
);

export const createPatient = createAsyncThunk(
  'patients/createPatient',
  async (patientData: CreatePatientData) => {
    const response = await patientService.createPatient(patientData);
    return response.data;
  }
);

export const updatePatient = createAsyncThunk(
  'patients/updatePatient',
  async ({ id, patientData }: { id: string; patientData: Partial<CreatePatientData> }) => {
    const response = await patientService.updatePatient(id, patientData);
    return response.data;
  }
);

const patientsSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Patients
      .addCase(fetchPatients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.patients = action.payload;
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch patients';
      })
      // Create Patient
      .addCase(createPatient.pending, (state) => {
        state.isCreating = true;
        state.error = null;
      })
      .addCase(createPatient.fulfilled, (state, action) => {
        state.isCreating = false;
        state.patients.push(action.payload);
      })
      .addCase(createPatient.rejected, (state, action) => {
        state.isCreating = false;
        state.error = action.error.message || 'Failed to create patient';
      })
      // Update Patient
      .addCase(updatePatient.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
      })
      .addCase(updatePatient.fulfilled, (state, action) => {
        state.isUpdating = false;
        const index = state.patients.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.patients[index] = action.payload;
        }
      })
      .addCase(updatePatient.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.error.message || 'Failed to update patient';
      });
  },
});

export default patientsSlice.reducer; 