const BASE_URL = 'https://dental-backend-htv7.onrender.com';

export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: `${BASE_URL}/api/auth/login`,
    REGISTER: `${BASE_URL}/api/auth/register`,
    PROFILE: `${BASE_URL}/api/auth/profile`,
    LOGOUT: `${BASE_URL}/api/auth/logout`,
    ME: `${BASE_URL}/api/auth/me`,
  },

  // User endpoints
  USERS: {
    BASE: `${BASE_URL}/api/users`,
    DOCTORS: `${BASE_URL}/api/users/doctors`,
    BY_ID: (id: string) => `${BASE_URL}/api/users/${id}`,
  },

  // Patient endpoints
  PATIENTS: {
    BASE: `${BASE_URL}/api/patients`,
    BY_ID: (id: string) => `${BASE_URL}/api/patients/${id}`,
  },

  // Appointment endpoints
  APPOINTMENTS: {
    BASE: `${BASE_URL}/api/appointments`,
    AVAILABLE_SLOTS: `${BASE_URL}/api/appointments/available-slots`,
    BY_ID: (id: string) => `${BASE_URL}/api/appointments/${id}`,
  },
} as const; 