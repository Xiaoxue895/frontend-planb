'use client';

import React, { useState } from 'react';

export default function WaitlistEmailForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email) return;
    setStep(2); // Move to additional info step
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.name) return;

    const form = new FormData();
    form.append('entry.1305314608', formData.email);   // Email
    form.append('entry.1788866372', formData.name);    // Name
    form.append('entry.1666390546', formData.message); // Message

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
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitted(true); // Still show success since no-cors mode doesn't return response
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (submitted) {
    return (
      <div className="text-center">
        <p className="text-white text-lg font-semibold">✅ Thanks! You're on our waitlist.</p>
        <p className="text-white opacity-80 text-sm mt-2">We'll keep you updated on JobHatch progress!</p>
      </div>
    );
  }

  // Step 1: Email input
  if (step === 1) {
    return (
      <form onSubmit={handleEmailSubmit} className="flex justify-center gap-3">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your Email"
          className="px-4 py-2 rounded-lg text-gray-800 flex-1 max-w-xs"
          required
        />
        <button 
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
        >
          Contact Us
        </button>
      </form>
    );
  }

  // Step 2: Additional information
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
        Tell us a bit more about yourself
      </h3>
      <form onSubmit={handleFinalSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email address"
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
          readOnly
        />
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your name"
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Optional message"
          className="w-full border border-gray-300 rounded px-3 py-2 h-24"
        />
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setStep(1)}
            className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition-colors"
          >
            Back
          </button>
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Join Waitlist
          </button>
        </div>
      </form>
    </div>
  );
} 