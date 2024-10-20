import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useStore } from '../context/useStore';
import { Link } from 'react-router-dom';
import './styles/RegisterForm.css';

const RegisterForm = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const register = useStore((state) => state.register);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName || !email || !password || !confirmPassword) {
      setErrorMessage('All fields are required.');
      setSuccessMessage('');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      setSuccessMessage('');
      return;
    }

    setErrorMessage('');
    setSuccessMessage('');

    const result = await register({ fullName, email, password });

    if (result.success) {
      setSuccessMessage("Registration Successfully"); 
      setFullName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } else {
      setErrorMessage(result.message);
    }
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", marginBottom: "20px" }}>
        <Typography variant="h5">Create Your Account</Typography>
        <Typography variant="subtitle2" gutterBottom sx={{ color: "gray" }}>
          Join us today and explore the Galaxy!
        </Typography>
        {successMessage && <Box sx={{background:"#daffcd" , width:"80%" , padding:"10px" , display:"flex" , alignItems:"center" , justifyContent:"center"}}><Typography color="success">{successMessage}</Typography></Box>}
        {errorMessage && <Box sx={{background:"#ffdbc9" , width:"80%" , padding:"10px" , display:"flex" , alignItems:"center" , justifyContent:"center"}}><Typography color="error">{errorMessage}</Typography></Box>}
      </Box>
      

      <TextField
        label="Full Name"
        variant="outlined"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
        size='small'
      />
      <TextField
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        size='small'
        required
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        size='small'
        required
      />
      <TextField
        label="Confirm Password"
        type="password"
        variant="outlined"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        size='small'
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Register
      </Button>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", marginBottom: "20px" }}>
        <Typography variant="body2" color='grey'>
          Already have an account? <Link to="/login">Login here</Link>
        </Typography>
      </Box>
    </form>
  );
};

export default RegisterForm;
