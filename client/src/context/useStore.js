import { create } from 'zustand';
import axiosInstance from '../api/axiosConfig';

export const useStore = create((set) => ({
  user: localStorage.getItem('user') || null, 
  login: async ({ email, password }, navigate) => {
    try {
      const response = await axiosInstance.post('/auth/login', { email, password });
      const userId = response.data.auth_user.id;

      set({ user: userId });
      localStorage.setItem('user', userId);

      navigate('/welcome');
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false, message: error.response?.data || 'Login failed. Please try again.' };
    }
  },
  register: async ({ fullName, email, password }) => {
    try {
      const response = await axiosInstance.post('/auth/register', { fullName, email, password });
      return { success: true, message: response.data.message };
    } catch (error) {
      return { success: false, message: error.response?.data || 'Registration failed. Please try again.' };
    }
  },
  logout: (navigate) => {
    set({ user: null });
    localStorage.removeItem('user'); 
    navigate('/login');
  },
}));
