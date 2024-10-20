import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:5000/api";

console.log("Base URL:", baseURL);

const axiosInstance = axios.create({
  baseURL, 
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
