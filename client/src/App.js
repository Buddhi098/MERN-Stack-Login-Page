import React from 'react';
import { useStore } from './context/useStore';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WelcomePage from './pages/WelcomePage';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

const App = () => {
  const user = useStore((state) => state.user);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* Protected Route */}
        <Route path="/welcome" element={user ? <WelcomePage /> : <Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
