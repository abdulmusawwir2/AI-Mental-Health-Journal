import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for logged in user
    const checkUserLoggedIn = async () => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    };
    checkUserLoggedIn();
  }, []);

  const register = async (userData) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/users`, userData);
        if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data));
            setUser(response.data);
            return response.data;
        }
    } catch (error) {
        throw error.response?.data?.message || 'Registration failed';
    }
  };

  const login = async (userData) => {
    try {
        const response = await axios.post('http://localhost:5000/api/users/login', userData);
        if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data));
            setUser(response.data);
            return response.data;
        }
    } catch (error) {
        throw error.response?.data?.message || 'Login failed';
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
