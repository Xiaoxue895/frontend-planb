import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { csrfFetch } from '@/app/csrfFetch';
import Navbar from '@/components/Navbar';

const JobPreferencesPage: React.FC = () => {
  const navigate = useNavigate();
  const [interests, setInterests] = useState<string[]>([]);

  const toggleInterest = (interest: string) => {
    setInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = async () => {
    try {
      const response = await csrfFetch('/api/onboarding/preferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_type: 'job_seeker',
          interests,
        }),
        credentials: 'include',
      });

      if (response.ok) {
        navigate('/onboarding/complete');
      } else {
        const data = await response.json();
        throw new Error(data.error || 'Failed to save preferences. Please try again.');
      }
    } catch (error: any) {
      alert(error.message || 'Failed to save preferences. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-blue-50">
      <Navbar />
      <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-12">
        <h1 className="text-2xl font-bold mb-6 text-center">Select Your Job Preferences</h1>

        <div className="space-y-6">
          {/* Interests */}
          <div>
            <h2 className="text-lg font-semibold mb-3">What is your current status? (Select all that apply)</h2>
            <div className="flex flex-col space-y-3">
              {[
                { label: 'Actively seeking job', value: 'seeking_job', description: 'I am ready for interviews and can start right away.' },
                { label: 'Willing to mentor others', value: 'mentor_others', description: 'I want to help other job seekers or founders.' }
              ].map(({ label, value, description }) => (
                <label
                  key={value}
                  className={`p-4 border rounded-lg cursor-pointer flex flex-col ${
                    interests.includes(value) ? 'border-orange-500 bg-orange-50' : 'border-gray-300 bg-white hover:border-orange-400'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={interests.includes(value)}
                    onChange={() => toggleInterest(value)}
                    className="hidden"
                  />
                  <span className="font-medium text-gray-900">{label}</span>
                  <small className="text-gray-500">{description}</small>
                </label>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={interests.length === 0}
            className={`w-full py-3 rounded-lg text-white font-semibold transition-colors
              ${interests.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600'}`}
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobPreferencesPage;
