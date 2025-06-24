import React, { useState, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { thunkAdminLogin, skipAdminAuthForTesting, clearErrors } from '../authSlice';
import { isAuthSkipEnabled } from '@/utils/config';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const dispatch = useAppDispatch();
  const { errors, status } = useAppSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors) dispatch(clearErrors());
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    const result = await dispatch(thunkAdminLogin({
      email: formData.email,
      password: formData.password
    }));
    
    if (thunkAdminLogin.fulfilled.match(result)) {
      onSuccess?.();
      onClose();
    }
  };

  const handleSkipAuth = async () => {
    // For testing only - simulate successful admin auth
    if (isAuthSkipEnabled()) {
      const result = await dispatch(skipAdminAuthForTesting());
      if (skipAdminAuthForTesting.fulfilled.match(result)) {
        onSuccess?.();
        onClose();
      }
    }
  };

  const handleFillTestCredentials = () => {
    if (isAuthSkipEnabled()) {
      setFormData({
        email: 'admin@jobhatch.com',
        password: 'admin123'
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="relative max-w-md w-full">
        {/* Modal Container with Admin Styling */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-t-3xl relative overflow-hidden border border-red-500">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-300 hover:text-white z-10"
          >
            <i className="fas fa-times text-xl"></i>
          </button>

          {/* Content */}
          <div className="px-6 py-6 text-center">
            {/* Admin Shield Icon */}
            <div className="mb-4">
              <div className="w-16 h-16 mx-auto bg-red-600 rounded-full flex items-center justify-center mb-3 border-2 border-red-400">
                <div className="relative">
                  {/* Shield */}
                  <div className="w-8 h-10 bg-red-500 rounded-t-full relative">
                    <div className="w-8 h-5 bg-red-500 absolute bottom-0" style={{
                      clipPath: 'polygon(0% 0%, 100% 0%, 80% 100%, 20% 100%)'
                    }}></div>
                    {/* Crown on shield */}
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2">
                      <div className="w-0 h-0 border-l-2 border-r-2 border-b-3 border-l-transparent border-r-transparent border-b-yellow-400"></div>
                      <div className="w-0 h-0 border-l-1 border-r-1 border-b-2 border-l-transparent border-r-transparent border-b-yellow-300 absolute top-0.5 left-0.5"></div>
                    </div>
                    {/* Admin text */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">A</span>
                    </div>
                  </div>
                  
                  {/* Security indicators */}
                  <div className="absolute -top-2 -left-2 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                  <div className="absolute -top-2 -right-2 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-xl font-bold text-white mb-1">
              Administrator Access
            </h2>
            
            <p className="text-gray-300 mb-4 text-sm">
              Restricted area - Admin credentials required
            </p>

            {/* Security Warning */}
            <div className="bg-red-900 border border-red-700 rounded-lg p-3 mb-4">
              <div className="flex items-center space-x-2">
                <i className="fas fa-shield-alt text-red-400"></i>
                <span className="text-red-200 text-xs font-medium">
                  High Security Zone
                </span>
              </div>
            </div>

            {/* Testing Mode Notice */}
            {isAuthSkipEnabled() && (
              <div className="bg-purple-900 border border-purple-700 rounded-lg p-3 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <i className="fas fa-flask text-purple-400"></i>
                    <span className="text-purple-200 text-xs font-medium">
                      Testing Mode Active
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleFillTestCredentials}
                    className="text-purple-300 hover:text-purple-100 text-xs underline"
                  >
                    Fill Test Data
                  </button>
                </div>
                <p className="text-purple-300 text-xs mt-1">
                  Use: admin@jobhatch.com / admin123
                </p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Admin Email */}
              <div>
                <label className="block text-left text-gray-300 mb-1 font-medium text-sm">
                  Admin Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="admin@jobhatch.com"
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm text-white placeholder-gray-400"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                  <i className="fas fa-user-shield absolute right-3 top-2.5 text-gray-400 text-sm"></i>
                </div>
              </div>

              {/* Admin Password */}
              <div>
                <label className="block text-left text-gray-300 mb-1 font-medium text-sm">
                  Admin Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm text-white placeholder-gray-400"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    required
                  />
                  <i className="fas fa-lock absolute right-3 top-2.5 text-gray-400 text-sm"></i>
                </div>
              </div>

              {/* Error Messages */}
              {errors && (
                <div className="text-red-400 text-sm text-left bg-red-900 border border-red-700 rounded p-2">
                  {Object.values(errors).map((error, index) => (
                    <p key={index} className="flex items-center">
                      <i className="fas fa-exclamation-triangle mr-2"></i>
                      {error}
                    </p>
                  ))}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-colors disabled:opacity-50 text-sm mt-4 border border-red-500"
              >
                {status === 'loading' ? (
                  <span className="flex items-center justify-center">
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Authenticating...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <i className="fas fa-sign-in-alt mr-2"></i>
                    Admin Login
                  </span>
                )}
              </button>
            </form>

            {/* Development/Testing Skip Button */}
            {isAuthSkipEnabled() && (
              <div className="mt-3 pt-3 border-t border-slate-600">
                <button
                  type="button"
                  onClick={handleSkipAuth}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg transition-colors text-sm"
                >
                  🧪 Skip Admin Auth (Testing Only)
                </button>
                <p className="text-xs text-gray-400 mt-1">
                  Development mode - Admin bypass enabled
                </p>
              </div>
            )}

            {/* Security Notice */}
            <div className="mt-4 text-xs text-gray-400">
              <i className="fas fa-info-circle mr-1"></i>
              All admin actions are logged and monitored
            </div>
          </div>
        </div>

        {/* Dark Curved Bottom Section */}
        <div className="bg-slate-900 h-8" style={{
          borderRadius: '0 0 50% 50%'
        }}></div>
      </div>
    </div>
  );
};

export default AdminLoginModal; 