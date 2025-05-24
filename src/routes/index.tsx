import { createBrowserRouter, Navigate } from 'react-router-dom';
import { LoginForm } from '../features/auth/components/LoginForm';
import { ProtectedRoute } from '../features/auth/components/ProtectedRoute';
import DoctorAppointment from '../pages/DoctorAppointment';
import { DashboardLayout } from '../layouts/DashboardLayout';
import AppointmentTable from '../pages/AppointmentList';
import PatientList from '../pages/PatientList';
import AddAppointment from '../pages/AddAppointment';
import PatientProfile from '../pages/PatientProfile';
import Services from '../pages/Services';
import AppointmentDetails from '../pages/AppointmentDetails';

// Define UserRole type to fix type errors
type UserRole = 'admin' | 'doctor' | 'receptionist';

// Define User type to match expected structure
interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  clinicId: string;
}

const mockUser: User = {
  id: '1',
  email: 'admin@clinic.com',
  name: 'Abu Fahim',
  role: 'admin',
  clinicId: 'clinic-1',
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    element: <LoginForm />,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardLayout>
          <div>Dashboard Content</div>
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/doctors',
    element: (
      <ProtectedRoute>
        <DashboardLayout>
          <DoctorAppointment />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/appointments',
    element: (
      <ProtectedRoute>
        <DashboardLayout>
          <AppointmentTable />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/patients',
    element: (
      <ProtectedRoute>
        <DashboardLayout>
          <PatientList />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/services',
    element: (
      <ProtectedRoute>
        <DashboardLayout>
          <Services />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/add-appointment',
    element: (
      <ProtectedRoute>
        <DashboardLayout>
          <AddAppointment />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/patient-profile',
    element: (
      <ProtectedRoute>
        <DashboardLayout>
          <PatientProfile />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/appointment-details',
    element: (
      <ProtectedRoute>
        <DashboardLayout>
          <AppointmentDetails />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
]);
