import { useRoleAccess } from '../lib/hooks/useRoleAccess';

export default function Dashboard() {
  const { userRole, isOwner, isReceptionist, isDoctor } = useRoleAccess();

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0A0F56] mb-2">
            Welcome to Medic Dashboard
          </h1>
          <p className="text-gray-600">
            {isOwner() && "You have full access to all features as an Owner."}
            {isReceptionist() && "You can manage appointments, patients, and administrative tasks."}
            {isDoctor() && "You can view appointments, patients, and manage treatments."}
          </p>
        </div>

        {/* Role-specific content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Quick Stats Cards */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Your Role</h3>
                <p className="text-2xl font-bold text-[#0A0F56] capitalize mt-2">
                  {userRole}
                </p>
              </div>
              <div className="w-12 h-12 bg-[#0A0F56] rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">👤</span>
              </div>
            </div>
          </div>

          {/* Appointments Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Appointments</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {isDoctor() ? "Your appointments" : "All appointments"}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">📅</span>
              </div>
            </div>
          </div>

          {/* Patients Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Patients</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {isDoctor() ? "Your patients" : "All patients"}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">👥</span>
              </div>
            </div>
          </div>

          {/* Owner/Receptionist specific cards */}
          {(isOwner() || isReceptionist()) && (
            <>
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Services</h3>
                    <p className="text-sm text-gray-600 mt-1">Manage dental services</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl">🦷</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Invoices</h3>
                    <p className="text-sm text-gray-600 mt-1">Billing management</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl">💰</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Expenses</h3>
                    <p className="text-sm text-gray-600 mt-1">Track expenses</p>
                  </div>
                  <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl">📊</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Owner specific cards */}
          {isOwner() && (
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Doctors</h3>
                  <p className="text-sm text-gray-600 mt-1">Manage doctors</p>
                </div>
                <div className="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl">👨‍⚕️</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Role-specific information */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Access Permissions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-gray-700 mb-2">You can access:</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Dashboard
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Appointments
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Patients
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Account Settings
                </li>
                {(isOwner() || isReceptionist()) && (
                  <>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Services Management
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Invoices & Billing
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Expense Tracking
                    </li>
                  </>
                )}
                {isOwner() && (
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Doctor Management
                  </li>
                )}
              </ul>
            </div>
            
            {isReceptionist() && (
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Restricted access:</h3>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                    Treatment Details (Doctor/Owner only)
                  </li>
                </ul>
              </div>
            )}
            
            {isDoctor() && (
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Restricted access:</h3>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                    Doctor Management
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                    Services Management
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                    Financial Management
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 