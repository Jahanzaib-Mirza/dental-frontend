import axios from 'axios';

const baseURL = 'https://dental-backend-htv7.onrender.com';

const api = axios.create({
  baseURL,
  withCredentials: true, // Important for cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // You can add any request modifications here
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle specific error cases
      switch (error.response.status) {
        case 401:
          // Handle unauthorized (token expired/invalid)
          console.error('Unauthorized access - 401. App should redirect via routing.');
          break;
        case 403:
          // Handle forbidden
          console.error('Access forbidden');
          break;
        default:
          // Handle other errors
          console.error('API Error:', error.response.data);
      }
    }
    return Promise.reject(error);
  }
);

export default api; 