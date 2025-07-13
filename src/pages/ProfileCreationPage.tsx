import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { csrfFetch, restoreCSRF } from '@/app/csrfFetch';

const ProfileCreationPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    location: '',
    experience_years: '',
    preferred_roles: '',
    open_to_roles: '',
    bio: '',
    github_url: '',
    portfolio_url: '',
    linkedin_url: '',
    twitter_url: '',
    resume_url: '',
    achievements: '',
    pronouns: '',
    gender: '',
    ethnicity: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    restoreCSRF().catch(console.error);
  }, []);

  const handleSubmit = async () => {
    const preferredRolesArray = formData.preferred_roles
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);
    const openToRolesArray = formData.open_to_roles
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    const experienceYearsNumber = Number(formData.experience_years);

    try {
      const response = await csrfFetch('/api/profile/', {
        method: 'POST',
        body: JSON.stringify({
          ...formData,
          experience_years: experienceYearsNumber,
          preferred_roles: preferredRolesArray,
          open_to_roles: openToRolesArray,
        }),
      });

      if (response.ok) {
        navigate('/onboarding/complete');
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to save profile');
      }
    } catch (error) {
      console.error('Profile creation error:', error);
      alert('Failed to save profile. Please try again.');
    }
  };

  const handleSkip = () => {
    navigate('/onboarding/complete');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-center space-x-8">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="ml-2 text-green-600 font-medium">Resume/CV</span>
            </div>
            <div className="w-16 h-0.5 bg-green-500"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="ml-2 text-green-600 font-medium">Analyze</span>
            </div>
            <div className="w-16 h-0.5 bg-green-500"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="ml-2 text-green-600 font-medium">Pricing</span>
            </div>
            <div className="w-16 h-0.5 bg-orange-500"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">4</span>
              </div>
              <span className="ml-2 text-orange-500 font-medium">Profile</span>
            </div>
            {/* <div className="w-16 h-0.5 bg-gray-300"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-500 text-sm font-semibold">5</span>
              </div>
              <span className="ml-2 text-gray-400 font-medium">Preferences</span>
            </div> */}
            <div className="w-16 h-0.5 bg-gray-300"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-500 text-sm font-semibold">5</span>
              </div>
              <span className="ml-2 text-gray-400 font-medium">Done</span>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-2xl mx-auto px-6 py-16 bg-white rounded-2xl shadow-lg space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Create Your Profile</h1>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            value={formData.location}
            onChange={e => handleInputChange('location', e.target.value)}
            placeholder="City, State, or Country"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
          <input
            type="number"
            min={0}
            value={formData.experience_years}
            onChange={e => handleInputChange('experience_years', e.target.value)}
            placeholder="e.g., 5"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Roles (comma separated)</label>
          <input
            type="text"
            value={formData.preferred_roles}
            onChange={e => handleInputChange('preferred_roles', e.target.value)}
            placeholder="e.g., Software Engineer, Product Manager"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Open to Roles (comma separated)</label>
          <input
            type="text"
            value={formData.open_to_roles}
            onChange={e => handleInputChange('open_to_roles', e.target.value)}
            placeholder="e.g., Designer, Data Scientist"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
          <textarea
            value={formData.bio}
            onChange={e => handleInputChange('bio', e.target.value)}
            rows={4}
            placeholder="A brief introduction about yourself"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">GitHub URL</label>
          <input
            type="url"
            value={formData.github_url}
            onChange={e => handleInputChange('github_url', e.target.value)}
            placeholder="https://github.com/username"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Portfolio URL</label>
          <input
            type="url"
            value={formData.portfolio_url}
            onChange={e => handleInputChange('portfolio_url', e.target.value)}
            placeholder="https://yourportfolio.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
          <input
            type="url"
            value={formData.linkedin_url}
            onChange={e => handleInputChange('linkedin_url', e.target.value)}
            placeholder="https://linkedin.com/in/username"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Twitter URL</label>
          <input
            type="url"
            value={formData.twitter_url}
            onChange={e => handleInputChange('twitter_url', e.target.value)}
            placeholder="https://twitter.com/username"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Resume URL</label>
          <input
            type="url"
            value={formData.resume_url}
            onChange={e => handleInputChange('resume_url', e.target.value)}
            placeholder="Link to your resume"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Achievements</label>
          <textarea
            value={formData.achievements}
            onChange={e => handleInputChange('achievements', e.target.value)}
            rows={3}
            placeholder="List your achievements"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Pronouns</label>
          <input
            type="text"
            value={formData.pronouns}
            onChange={e => handleInputChange('pronouns', e.target.value)}
            placeholder="e.g. she/her, he/him, they/them"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
          <input
            type="text"
            value={formData.gender}
            onChange={e => handleInputChange('gender', e.target.value)}
            placeholder="Your gender"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Ethnicity</label>
          <input
            type="text"
            value={formData.ethnicity}
            onChange={e => handleInputChange('ethnicity', e.target.value)}
            placeholder="Your ethnicity"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div className="flex space-x-4">
          <button
            onClick={handleSubmit}
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Create Profile
          </button>
          <button
            onClick={handleSkip}
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCreationPage;

