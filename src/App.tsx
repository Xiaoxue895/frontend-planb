import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DownloadPage from "./pages/DownloadPage";
import PhoneDemo from "./pages/PhoneDemo";
import OnboardingPage from "./pages/OnboardingPage";
import WebApp from "./pages/WebApp";
import LoginForm from "./features/auth/components/LoginForm";
import SignupForm from "./features/auth/components/SignupForm";
import JobListPage from "./pages/JobListPage"
import JobDetailPage from "./pages/JobDetailPage"
import ManageResumesPage from "./pages/ManageResumePage"

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/download" element={<DownloadPage />} />
          <Route path="/phone-demo" element={<PhoneDemo />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/webapp" element={<WebApp />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/jobs" element={<JobListPage />} />
          <Route path="/jobs/:id" element={<JobDetailPage />} />
          <Route path="/resumes" element={<ManageResumesPage />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;