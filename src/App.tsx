import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginForm from "./features/auth/LoginForm";
import SignupForm from "./features/auth/SignupForm";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;