import { createBrowserRouter } from 'react-router-dom';
import { LoginForm } from '../features/auth/components/LoginForm';
import DoctorAppointment from '../pages/DoctorAppointment';
import { DashboardLayout } from '../layouts/DashboardLayout';

const mockUser = {
  id: '1',
  email: 'admin@clinic.com',
  name: 'Abu Fahim',
  role: 'admin',
  clinicId: 'clinic-1',
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginForm 
      onSubmit={(credentials) => {
        console.log('Login attempt:', credentials);
        // TODO: Implement actual login logic
      }} 
      isLoading={false} 
      error={null} 
    />,
  },
  {
    path: '/doctor-appointment',
    element: (
      <DashboardLayout user={mockUser}>
        <DoctorAppointment />
      </DashboardLayout>
    ),
  },
]); 