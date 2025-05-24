import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import doctorsReducer from './slices/doctorsSlice';
import patientsReducer from './slices/patientsSlice';
import appointmentsReducer from './slices/appointmentsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    doctors: doctorsReducer,
    patients: patientsReducer,
    appointments: appointmentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 