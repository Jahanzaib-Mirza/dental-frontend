import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { LoginForm } from '../features/auth/components/LoginForm';
import DoctorAppointment from '../pages/DoctorAppointment';
import { DashboardLayout } from '../layouts/DashboardLayout';
import AppointmentTable from '../pages/AppointmentList'; // ✅ Make sure path is correct
import PatientList from '../pages/PatientList';
import AddAppointment from '../pages/AddAppointment';
import PatientProfile from '../pages/PatientProfile';
import Services from '../pages/Services';
import { AuthContext } from '../App';
import AppointmentDetails from '../pages/AppointmentDetails';
import Expense from '../pages/Expense';
import Invoice from '../pages/Invoice';

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

// Protected Route Component
const ProtectedRoute = () => {
  const { isAuthenticated } = useContext(AuthContext);
  
  useEffect(() => {
    console.log('ProtectedRoute - Auth status:', isAuthenticated);
  }, [isAuthenticated]);
  
  if (!isAuthenticated) {
    console.log('Not authenticated, redirecting to login');
    return <Navigate to="/login" replace />;
  }
  
  console.log('Authenticated, rendering content');
  return <Outlet />;
};

// Dashboard Home Component
const Dashboard = () => {
  useEffect(() => {
    console.log('Dashboard component mounted');
  }, []);
  
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0A0F56] mb-2">Welcome to Medic Dental Clinic</h1>
        <p className="text-gray-600">Manage your dental practice with our comprehensive dashboard</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Quick Stats Cards */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Today's Appointments</p>
              <h3 className="text-3xl font-bold text-[#0A0F56] mt-1">24</h3>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <svg className="w-6 h-6 text-[#0A0F56]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-green-500 text-sm font-medium">↑ 12%</span>
            <span className="text-gray-500 text-sm"> from last week</span>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Active Patients</p>
              <h3 className="text-3xl font-bold text-[#0A0F56] mt-1">1,328</h3>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <svg className="w-6 h-6 text-[#0A0F56]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-green-500 text-sm font-medium">↑ 3%</span>
            <span className="text-gray-500 text-sm"> from last month</span>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Available Doctors</p>
              <h3 className="text-3xl font-bold text-[#0A0F56] mt-1">8</h3>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <svg className="w-6 h-6 text-[#0A0F56]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-gray-500 text-sm">All doctors available</span>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-bold text-[#0A0F56] mb-4">Upcoming Appointments</h2>
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">Jane Cooper</div>
                      <div className="text-sm text-gray-500">Root Canal</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">09:30 AM</div>
                  <div className="text-sm text-gray-500">Today</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Dr. Stephen Conley</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Confirmed</span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">Robert Fox</div>
                      <div className="text-sm text-gray-500">Check-up</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">10:15 AM</div>
                  <div className="text-sm text-gray-500">Today</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Dr. Jane Roberts</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">In Progress</span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">Esther Howard</div>
                      <div className="text-sm text-gray-500">Cleaning</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">11:00 AM</div>
                  <div className="text-sm text-gray-500">Today</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Dr. Stephen Conley</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Waiting</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    element: (
      <LoginForm
        onSubmit={(credentials) => {
          console.log('Login attempt:', credentials);
          // Authentication is now handled by AuthContext
        }}
        isLoading={false}
        error={null}
      />
    ),
  },
  {
    path: '/dashboard',
    element: (
      <DashboardLayout user={mockUser}>
        <Dashboard />
      </DashboardLayout>
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
    path: '/services',
    element: (
      <DashboardLayout user={mockUser}>
        <Services />
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
  },
  {
    path: '/appointment-details',
    element: (
      <DashboardLayout user={mockUser}>
        <AppointmentDetails />
      </DashboardLayout>
    ),
  },
  {
    path: '/expense',
    element: (
      <DashboardLayout user={mockUser}>
        <Expense />
      </DashboardLayout>
    ),
  },
  {
    path: '/invoice',
    element: (
      <DashboardLayout user={mockUser}>
        <Invoice />
      </DashboardLayout>
    ),
  }
]);
