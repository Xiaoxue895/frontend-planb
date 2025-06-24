'use client';

import React, { useState } from 'react';

interface UserResponses {
  role: string;
  status: string;
  clarity: string;
  urgency: string;
  resumeAction: string;
}

interface EnhancedWaitlistFormProps {
  userResponses: UserResponses;
  onSuccess: () => void;
}

export default function EnhancedWaitlistForm({ userResponses, onSuccess }: EnhancedWaitlistFormProps) {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.name) return;

    const form = new FormData();
    form.append('entry.1305314608', formData.email);   // Email
    form.append('entry.1788866372', formData.name);    // Name
    form.append('entry.1666390546', formData.message); // Message
    
    // Add onboarding responses as additional fields
    form.append('entry.1234567890', userResponses.role);        // Role (job seeker/mentor/both)
    form.append('entry.1234567891', userResponses.status);      // Job search status
    form.append('entry.1234567892', userResponses.clarity);     // Career clarity
    form.append('entry.1234567893', userResponses.urgency);     // Urgency level
    form.append('entry.1234567894', userResponses.resumeAction); // Resume action taken

    try {
      await fetch(
        'https://docs.google.com/forms/d/e/1FAIpQLSfKUxYaAAkRuK-DgvKI1W_IVo1OVGgZ8Fm9I6-2mEvEkO2fKw/formResponse',
        {
          method: 'POST',
          mode: 'no-cors',
          body: form,
        }
      );
      setSubmitted(true);
      setTimeout(() => {
        onSuccess();
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitted(true);
      setTimeout(() => {
        onSuccess();
      }, 2000);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-xl p-6 shadow-lg text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Welcome to JobHatch!</h3>
        <p className="text-gray-600 mb-4">
          Thank you for completing your onboarding. We've recorded your preferences:
        </p>
        <div className="text-left text-sm text-gray-700 bg-gray-50 rounded-lg p-4 mb-4">
          <div><strong>Role:</strong> {getRoleText(userResponses.role)}</div>
          <div><strong>Status:</strong> {getStatusText(userResponses.status)}</div>
          <div><strong>Clarity:</strong> {getClarityText(userResponses.clarity)}</div>
          <div><strong>Urgency:</strong> {getUrgencyText(userResponses.urgency)}</div>
          {userResponses.resumeAction && (
            <div><strong>Resume:</strong> {getResumeActionText(userResponses.resumeAction)}</div>
          )}
        </div>
        <p className="text-blue-600 font-semibold">Redirecting to your personalized dashboard...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
        Tell us how to reach you
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email address"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
          required
        />
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your full name"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
          required
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Any specific goals or questions? (optional)"
          className="w-full border border-gray-300 rounded px-3 py-2 h-24 focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
        >
          Complete Setup & Enter JobHatch
        </button>
      </form>
    </div>
  );
}

// Helper functions to convert response codes to readable text
function getRoleText(role: string): string {
  switch (role) {
    case 'mentee': return 'Looking for a job';
    case 'mentor': return 'Want to mentor others';
    case 'both': return 'Both job seeking and mentoring';
    default: return 'Not specified';
  }
}

function getStatusText(status: string): string {
  switch (status) {
    case 'active': return 'Actively applying';
    case 'exploring': return 'Just exploring';
    case 'notnow': return 'Not right now';
    default: return 'Not specified';
  }
}

function getClarityText(clarity: string): string {
  switch (clarity) {
    case 'yes': return 'Know target role/industry';
    case 'notSure': return 'Need guidance on career direction';
    default: return 'Not specified';
  }
}

function getUrgencyText(urgency: string): string {
  switch (urgency) {
    case 'asap': return 'Need job ASAP';
    case 'timing': return 'Taking my time';
    case 'exploring': return 'Just exploring possibilities';
    default: return 'Not specified';
  }
}

function getResumeActionText(action: string): string {
  switch (action) {
    case 'uploaded': return 'Uploaded existing resume';
    case 'build_new': return 'Will build new resume';
    default: return 'Not specified';
  }
} 