import axiosInstance from '../axios.config';
import { NavigateFunction } from 'react-router-dom';
export const AuthService = {
    login: async (username: string, password: string,  navigate: NavigateFunction) => {
      try {
        const response = await axiosInstance.post('/api/user/login', { username, password });
        navigate('/wb-front/');
        return response.data;
      } catch (error) {
        console.error('Error logging in:', error);
        throw error;
      }
    },
    
    register: async (username: string, password: string, email: string, profilePicture?: File | null) => {
      try {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        formData.append('email', email);
        if (profilePicture) {
          formData.append('profilePicture', profilePicture);
        }
  
        const response = await axiosInstance.post('/api/user/register', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        return response.data;
      } catch (error) {
        console.error('Error registering:', error);
        throw error;
      }
    },
  };