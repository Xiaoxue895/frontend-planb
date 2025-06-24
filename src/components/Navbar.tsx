import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ProfileButton from '@/features/auth/components/ProfileButton';

const Navbar = () => {
  const location = useLocation();
  
  const getActiveTab = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path === '/jobs') return 'jobs';
    if (path === '/download') return 'download';
    return '';
  };

  const activeTab = getActiveTab();

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/images/LOGO.jpg" 
              alt="JobHatch Logo" 
              className="h-10 w-auto"
            />
            <span className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Baloo 2, cursive' }}>
              JOBHATCH
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className={`tab-link ${activeTab === 'home' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-600 hover:text-blue-500'} px-3 py-2 text-sm font-medium transition-colors`}
            >
              Home
            </Link>
            <Link 
              to="/jobs" 
              className={`tab-link ${activeTab === 'jobs' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-600 hover:text-blue-500'} px-3 py-2 text-sm font-medium transition-colors`}
            >
              Jobs
            </Link>
            <Link 
              to="/download" 
              className={`tab-link ${activeTab === 'download' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-600 hover:text-blue-500'} px-3 py-2 text-sm font-medium transition-colors`}
            >
              Download
            </Link>
            <Link 
              to="/webapp" 
              className="app-link text-gray-600 hover:text-blue-500 px-3 py-2 text-sm font-medium transition-colors inline-flex items-center space-x-1"
            >
              <span>Web App</span>
              <i className="fas fa-external-link-alt text-xs"></i>
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-3">
            <ProfileButton />
            {/* <button 
              className="login-btn px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-500 transition-colors"
              id="loginBtn"
            >
              Login
            </button> */}
            {/* <button 
              className="signup-btn px-4 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors"
              id="signupBtn"
            >
              Sign Up
            </button> */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
  