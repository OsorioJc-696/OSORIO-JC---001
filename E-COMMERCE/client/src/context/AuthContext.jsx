import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (token) {
      setIsLoading(true);
      axios
        .get(`${import.meta.env.VITE_API_URL}/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(res => {
          setUser(res.data);
          localStorage.setItem('token', token);
        })
        .catch(error => {
          console.error('Profile fetch error:', error);
          setToken(null);
          setUser(null);
          localStorage.removeItem('token');
          toast.error('Session expired. Please login again.');
        })
        .finally(() => setIsLoading(false));
    } else {
      localStorage.removeItem('token');
      setUser(null);
      setIsLoading(false);
    }
  }, [token]);

  const login = (newToken, userData) => {
    setToken(newToken);
    setUser(userData);
    localStorage.setItem('token', newToken);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;