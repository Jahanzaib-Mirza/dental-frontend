import { createBrowserRouter } from 'react-router-dom';
import { LoginForm } from '../features/auth/components/LoginForm';
import DoctorAppointment from '../pages/DoctorAppointment';
import { DashboardLayout } from '../layouts/DashboardLayout';
import AppointmentTable from '../pages/AppointmentList'; // ✅ Make sure path is correct
import PatientList from '../pages/PatientList';
import AddAppointment from '../pages/AddAppointment';
import PatientProfile from '../pages/PatientProfile';

const mockUser = {
  id: '1',
  email: 'admin@clinic.com',
  name: 'Abu Fahim',
  role: 'admin',
  clinicId: 'clinic-1',
};

export const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <LoginForm
        onSubmit={(credentials) => {
          console.log('Login attempt:', credentials);
          // TODO: Implement actual login logic
        }}
        isLoading={false}
        error={null}
      />
    ),
  },
  {
    path: '/doctors',
    element: (
      <DashboardLayout user={mockUser}>
        <DoctorAppointment />
      </DashboardLayout>
    ),
  },

  {
    path: '/appointments', // ✅ New route added here
    element: (
      <DashboardLayout user={mockUser}>
        <AppointmentTable />
      </DashboardLayout>
    ),
  },
  {
    path: '/patients', // ✅ New route for PatientList
    element: (
      <DashboardLayout user={mockUser}>
        <PatientList />
      </DashboardLayout>
    ),
  },
  {
    path: '/add-appointment',
    element: (
      <DashboardLayout user={mockUser}>
        <AddAppointment />
      </DashboardLayout>
    ),
  },
  {
    path: '/patient-profile',
    element: (
      <DashboardLayout user={mockUser}>
        <PatientProfile />  
      </DashboardLayout>
    ),
  }


]);
