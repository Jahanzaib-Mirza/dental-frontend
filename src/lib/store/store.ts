import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import doctorsReducer from './slices/doctorsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    doctors: doctorsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 