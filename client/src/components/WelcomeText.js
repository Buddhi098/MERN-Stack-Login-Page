import React from 'react';
import { Button } from '@mui/material';
import { useStore } from '../context/useStore';
import './styles/WelcomeText.css';
import { useNavigate } from 'react-router-dom';

const WelcomeText = () => {
  const navigate = useNavigate();
  const logout = useStore((state) => state.logout);

  const handleLogout = () => {
    logout(navigate);
  };

  return (
    <div className="welcome-page">
      <div className="star"></div>
      <div className="star"></div>
      <div className="star"></div>
      <div className="star"></div>

      <h1>Welcome to SpaceX!</h1>
      <p>Explore the vastness of the universe and beyond. Let’s get started on your journey!</p>
      
      <Button variant="contained" color="secondary" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default WelcomeText;
