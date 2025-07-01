// API Configuration
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/api'  // In production, proxy handles backend requests
  : 'http://localhost:8000/api';  // In development, direct backend connection

export const API_ENDPOINTS = {
  resumes: `${API_BASE_URL}/resumes`,
  onboarding: `${API_BASE_URL}/onboarding`,
  auth: `${API_BASE_URL}/auth`,
  profiles: `${API_BASE_URL}/profiles`,
  ai: `${API_BASE_URL}/ai`,
};

export default API_BASE_URL; 