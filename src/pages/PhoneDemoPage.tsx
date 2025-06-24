import React from 'react';
import { useNavigate } from 'react-router-dom';

const PhoneDemoPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
            >
              <i className="fas fa-arrow-left"></i>
              <span>Back to Home</span>
            </button>
            <h1 className="text-xl font-bold">JobHatch Phone Demo</h1>
            <div></div>
          </div>
        </div>
      </header>

      <div className="text-center py-8">
        <h2 className="text-2xl font-bold mb-4">Experience our mobile app features</h2>
        <p className="text-gray-600 mb-6">Interactive phone demo coming soon!</p>
      </div>
    </div>
  );
};

export default PhoneDemoPage; 