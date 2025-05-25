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
import Expense from '../pages/Expense';
import Invoice from '../pages/Invoice';
import { useSelector } from 'react-redux';
import type { RootState } from '../lib/store/store';

// Define UserRole type to fix type errors


// Create a wrapper component to provide user from Redux
const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <DashboardLayout user={user}>
      {children}
    </DashboardLayout>
  );
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
        <DashboardWrapper>
          <div>Dashboard Content</div>
        </DashboardWrapper>
      </ProtectedRoute>
    ),
  },
  {
    path: '/doctors',
    element: (
      <ProtectedRoute>
        <DashboardWrapper>
          <DoctorAppointment />
        </DashboardWrapper>
      </ProtectedRoute>
    ),
  },
  {
    path: '/appointments',
    element: (
      <ProtectedRoute>
        <DashboardWrapper>
          <AppointmentTable />
        </DashboardWrapper>
      </ProtectedRoute>
    ),
  },
  {
    path: '/patients',
    element: (
      <ProtectedRoute>
        <DashboardWrapper>
          <PatientList />
        </DashboardWrapper>
      </ProtectedRoute>
    ),
  },
  {
    path: '/services',
    element: (
      <ProtectedRoute>
        <DashboardWrapper>
          <Services />
        </DashboardWrapper>
      </ProtectedRoute>
    ),
  },
  {
    path: '/add-appointment',
    element: (
      <ProtectedRoute>
        <DashboardWrapper>
          <AddAppointment />
        </DashboardWrapper>
      </ProtectedRoute>
    ),
  },
  {
    path: '/patient-profile',
    element: (
      <ProtectedRoute>
        <DashboardWrapper>
          <PatientProfile />
        </DashboardWrapper>
      </ProtectedRoute>
    ),
  },
  {
    path: '/appointment-details',
    element: (
      <ProtectedRoute>
        <DashboardWrapper>
          <AppointmentDetails />
        </DashboardWrapper>
      </ProtectedRoute>
    ),
  },
  {
    path: '/expense',
    element: (
      <ProtectedRoute>
        <DashboardWrapper>
          <Expense />
        </DashboardWrapper>
      </ProtectedRoute>
    ),
  },
  {
    path: '/invoice',
    element: (
      <ProtectedRoute>
        <DashboardWrapper>
          <Invoice />
        </DashboardWrapper>
      </ProtectedRoute>
    ),
  },
]);
