import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useStore } from '../context/useStore';
import { Link, useNavigate } from 'react-router-dom';
import './styles/LoginForm.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const login = useStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await login({ email, password }, navigate);

    if (result && result.success === false) {
      setError(result.message);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", marginBottom: "20px" }}>
        <Typography variant="h5">Welcome Back!</Typography>
        <Typography variant="subtitle2" gutterBottom sx={{ color: "gray" }}>
          Please login to your account to continue.
        </Typography>
        {error && (
        <Typography variant="body2" color="error" sx={{ textAlign: "center", marginBottom: "20px" , background:"#ffdbc9" , padding:"10px" }}>
          {error}
        </Typography>
      )}
      </Box>

      <TextField
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        size="small"
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        size="small"
      />
      <Button type="submit" variant="contained" color="primary">
        Login
      </Button>
      
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="body2" color="grey">
          Don't have an account? <Link to="/">Register here</Link>
        </Typography>
      </Box>
    </form>
  );
};

export default LoginForm;
