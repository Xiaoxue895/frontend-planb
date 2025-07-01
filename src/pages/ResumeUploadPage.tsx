import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api';

const ResumeUploadPage: React.FC = () => {
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setError(''); // Clear any previous errors
    }
  };

  const handleUploadResume = async () => {
    if (!uploadedFile) {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.pdf,.doc,.docx,.rtf,.wp,.txt';
      input.onchange = (event) => {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
          setUploadedFile(file);
          uploadFile(file);
        }
      };
      input.click();
    } else {
      uploadFile(uploadedFile);
    }
  };

  const uploadFile = async (file: File) => {
    setIsUploading(true);
    setError('');
    
    try {
      console.log('Starting file upload:', file.name);
      
      // Check file size (limit to 10MB)
      if (file.size > 10 * 1024 * 1024) {
        throw new Error('File size must be less than 10MB');
      }

      // Check file type
      const allowedTypes = ['pdf', 'doc', 'docx', 'rtf', 'wp', 'txt'];
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      if (!fileExtension || !allowedTypes.includes(fileExtension)) {
        throw new Error(`File type not supported. Please use: ${allowedTypes.join(', ')}`);
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', file.name);

      console.log('Making API request to', API_ENDPOINTS.resumes);
      
      const response = await fetch(API_ENDPOINTS.resumes, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      console.log('API response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('Upload successful:', data);
        
        // Show success message briefly
        alert(`Resume uploaded successfully! ${data.storage_type === 'local' ? '(Stored locally - AWS not configured)' : ''}`);
        
        // Navigate to analysis page with resume ID
        navigate(`/onboarding/analyze/${data.resume.id}`);
      } else {
        const errorData = await response.json();
        console.error('Upload failed:', errorData);
        throw new Error(errorData.error || 'Upload failed');
      }
    } catch (error: any) {
      console.error('Upload error:', error);
      const errorMessage = error.message || 'Failed to upload resume. Please try again.';
      setError(errorMessage);
      
      // Show error in alert for immediate feedback
      alert(`Upload failed: ${errorMessage}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSkip = () => {
    navigate('/onboarding/pricing');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">🐥</span>
              </div>
              <span className="text-xl font-bold text-gray-900">JOBHATCH</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <span className="font-medium">Mia Yue</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-center space-x-8">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">1</span>
              </div>
              <span className="ml-2 text-orange-500 font-medium">Resume/CV</span>
            </div>
            <div className="w-16 h-0.5 bg-gray-300"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-500 text-sm font-semibold">2</span>
              </div>
              <span className="ml-2 text-gray-400 font-medium">Analyze</span>
            </div>
            <div className="w-16 h-0.5 bg-gray-300"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-500 text-sm font-semibold">3</span>
              </div>
              <span className="ml-2 text-gray-400 font-medium">Profile</span>
            </div>
            <div className="w-16 h-0.5 bg-gray-300"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-500 text-sm font-semibold">4</span>
              </div>
              <span className="ml-2 text-gray-400 font-medium">Preferences</span>
            </div>
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

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Upload a recent resume or CV
          </h1>
          <p className="text-lg text-gray-600 mb-16">
            Autocomplete your profile in just a few seconds by uploading a resume.
          </p>

          {/* Upload Box */}
          <div className="max-w-md mx-auto bg-white rounded-2xl border-2 border-gray-200 p-12 mb-8">
            {/* Chick Character */}
            <div className="mb-8">
              <div className="relative">
                <img
                  src="/images/homepage-chick-offer.png"
                  alt="JobHatch Character"
                  className="w-24 h-24 mx-auto object-contain"
                />
                {/* Document icon overlay */}
                <div className="absolute -top-2 -right-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-8">
              Click the button below to upload your resume as a .pdf, .doc, .docx, .rtf, .wp or .txt file (max 10MB)
            </p>

            {uploadedFile && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-700 text-sm">
                  ✓ {uploadedFile.name} selected ({(uploadedFile.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              </div>
            )}

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">
                  ❌ {error}
                </p>
              </div>
            )}

            <button
              onClick={handleUploadResume}
              disabled={isUploading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? 'Uploading...' : 'Upload Resume'}
            </button>

            {/* Debug info for development */}
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-4 p-2 bg-gray-100 rounded text-xs text-gray-600">
                <p>Debug: API endpoint {API_ENDPOINTS.resumes}</p>
                <p>Accepted types: PDF, DOC, DOCX, RTF, WP, TXT</p>
              </div>
            )}
          </div>

          <button
            onClick={handleSkip}
            className="text-gray-500 hover:text-gray-700 font-medium underline"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeUploadPage; 