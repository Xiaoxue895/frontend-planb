import React from 'react';
import { useAppSelector } from '@/hooks/reduxHooks';
import { isAdmin, getAdminRoutes } from '@/utils/adminUtils';
import { Navigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';

const AdminDashboard: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);

  // Redirect if not admin
  if (!isAdmin(user)) {
    return <Navigate to="/" replace />;
  }

  const adminRoutes = getAdminRoutes(user);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <div className="max-w-7xl mx-auto py-8 px-4">
        {/* Admin Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-lg p-6 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center">
                <i className="fas fa-shield-alt mr-3"></i>
                Admin Dashboard
              </h1>
              <p className="text-red-100 mt-2">
                Welcome back, {user.username || user.email}
              </p>
            </div>
            <div className="text-right">
              <div className="bg-red-700 rounded-lg px-4 py-2">
                <div className="text-sm text-red-200">System Status</div>
                <div className="text-lg font-bold flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                  Online
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">1,234</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <i className="fas fa-users text-blue-600"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active Jobs</p>
                <p className="text-2xl font-bold text-gray-900">567</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <i className="fas fa-briefcase text-green-600"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Companies</p>
                <p className="text-2xl font-bold text-gray-900">89</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <i className="fas fa-building text-purple-600"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Applications</p>
                <p className="text-2xl font-bold text-gray-900">2,456</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <i className="fas fa-file-alt text-orange-600"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Navigation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Admin Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {adminRoutes.map((route) => (
              <a
                key={route.path}
                href={route.path}
                className="block p-4 border border-gray-200 rounded-lg hover:border-red-300 hover:bg-red-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <i className={`${route.icon} text-red-600`}></i>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{route.name}</h3>
                    <p className="text-sm text-gray-600">Manage and configure</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <i className="fas fa-user-plus text-blue-600 text-sm"></i>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">New user registered</p>
                <p className="text-xs text-gray-500">john.doe@example.com - 2 minutes ago</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <i className="fas fa-briefcase text-green-600 text-sm"></i>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">New job posted</p>
                <p className="text-xs text-gray-500">Software Engineer at TechCorp - 15 minutes ago</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <i className="fas fa-file-alt text-orange-600 text-sm"></i>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">Job application submitted</p>
                <p className="text-xs text-gray-500">Application for Product Designer role - 1 hour ago</p>
              </div>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <i className="fas fa-info-circle text-red-600"></i>
            <div>
              <p className="text-sm text-red-800 font-medium">Security Notice</p>
              <p className="text-xs text-red-700">
                You are logged in as an administrator. All actions are logged and monitored.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 