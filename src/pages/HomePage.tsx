import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../features/home/components/HeroSection';
import HowItWorksSection from '../features/home/components/HowItWorksSection';
import TestimonialsSection from '../features/home/components/TestimonialsSection';
import DownloadSection from '../components/DownloadSection';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <DownloadSection />
      </main>
      <Footer />
      
      {/* Fixed App Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <a 
          href="/webapp" 
          className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-all hover:scale-105"
        >
          <span>Enter App</span>
          <i className="fas fa-arrow-right text-sm"></i>
        </a>
      </div>
    </div>
  );
};

export default HomePage; 