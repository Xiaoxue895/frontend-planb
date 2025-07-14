// API Configuration
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://test-backend-q9ne.onrender.com/api'  // In production, proxy handles backend requests
  : 'http://localhost:8000/api';  // In development, direct backend connection

export const API_ENDPOINTS = {
  resumes: `${API_BASE_URL}/resumes`,
  coverLetters: `${API_BASE_URL}/cover_letters`,
  onboarding: `${API_BASE_URL}/onboarding`,
  auth: {
    signup: `${API_BASE_URL}/auth/signup`,
    login: `${API_BASE_URL}/auth/login`,
    csrfRestore: `${API_BASE_URL}/auth/csrf/restore`,
  },
  profiles: `${API_BASE_URL}/profiles`,
  aiResume: `${API_BASE_URL}/ai_resume`, 
  aiCoverLetter: `${API_BASE_URL}/ai_cover_letter`,
  ai: `${API_BASE_URL}/ai`,
};

export default API_BASE_URL; 