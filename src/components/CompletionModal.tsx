import React from 'react';
import { useNavigate } from 'react-router-dom';

interface CompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CompletionModal: React.FC<CompletionModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleFeatureProfile = async () => {
    try {
      const response = await fetch('/api/onboarding/complete', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        navigate(data.redirect_url || '/webapp');
      } else {
        throw new Error('Failed to complete onboarding');
      }
    } catch (error) {
      console.error('Completion error:', error);
      navigate('/webapp');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">

        <div className="text-center mb-6">
          <img
            src="/images/chick-pc-owl.png"
            alt="Chick and Owl with Laptop"
            className="w-32 h-32 object-contain mx-auto"
          />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">
          Help us connect you with recruiters!
        </h2>

        <div className="text-gray-600 text-sm mb-6">
          <p className="mb-4">Dear Job Seeker,</p>
          <p className="mb-4">
            Your skills and preferences have been saved. We may recommend your profile to recruiters who are looking 
            for candidates like you. Your information is kept private from your current or past employers, 
            and you can opt out anytime.
          </p>
          <p className="mb-4">
            You can now explore our web app, or join our Discord community to share feedback and help us improve.
          </p>
          <p className="font-medium">Before moving forward, please confirm the following:</p>
        </div>

        <div className="space-y-3 mb-6">
          <label className="flex items-start space-x-3">
            <input
              type="checkbox"
              className="mt-1 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
              defaultChecked
            />
            <span className="text-sm text-gray-700">
              I agree to be contacted by recruiters
            </span>
          </label>
          <label className="flex items-start space-x-3">
            <input
              type="checkbox"
              className="mt-1 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
              defaultChecked
            />
            <span className="text-sm text-gray-700">
              I will respond to messages from recruiters in a timely manner
            </span>
          </label>
        </div>

        <button
          onClick={handleFeatureProfile}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          Go to Web App
        </button>

        <a
          href="https://discord.gg/your-discord-link"
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-4 text-center text-sm text-orange-500 hover:underline"
        >
          Join our Discord Community
        </a>
      </div>
    </div>
  );
};

export default CompletionModal;
