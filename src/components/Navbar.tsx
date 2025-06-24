import React, { useState } from 'react';

const Navbar = () => {
  const [activeTab, setActiveTab] = useState('home');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    
    // Scroll to section or handle navigation
    if (tab === 'download') {
      const downloadSection = document.getElementById('download');
      downloadSection?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2">
            <img 
              src="/images/LOGO.jpg" 
              alt="JobHatch Logo" 
              className="h-10 w-auto"
            />
            <span className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Baloo 2, cursive' }}>
              JOBHATCH
            </span>
          </a>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a 
              href="#home" 
              className={`tab-link ${activeTab === 'home' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-600 hover:text-blue-500'} px-3 py-2 text-sm font-medium transition-colors`}
              onClick={() => handleTabClick('home')}
            >
              Home
            </a>
            <a 
              href="#download" 
              className={`tab-link ${activeTab === 'download' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-600 hover:text-blue-500'} px-3 py-2 text-sm font-medium transition-colors`}
              onClick={() => handleTabClick('download')}
            >
              Download
            </a>
            <a 
              href="/webapp" 
              className="app-link text-gray-600 hover:text-blue-500 px-3 py-2 text-sm font-medium transition-colors inline-flex items-center space-x-1"
            >
              <span>Web App</span>
              <i className="fas fa-external-link-alt text-xs"></i>
            </a>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-3">
            <button 
              className="login-btn px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-500 transition-colors"
              id="loginBtn"
            >
              Login
            </button>
            <button 
              className="signup-btn px-4 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors"
              id="signupBtn"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
  