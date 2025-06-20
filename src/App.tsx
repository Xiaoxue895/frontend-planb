import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginForm from "./features/auth/components/LoginForm";
import SignupForm from "./features/auth/components/SignupForm";
import JobListPage from "./pages/JobListPage"
import JobDetailPage from "./pages/JobDetailPage"

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/jobs" element={<JobListPage />} />
          <Route path="/jobs/:id" element={<JobDetailPage />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;