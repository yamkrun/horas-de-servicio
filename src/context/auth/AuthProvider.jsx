import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { api } from '../../libs/axios';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
      
      if (!token) {
        setLoading(false);
        navigate('/login');
        return;
      }
      
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await api.get('/auth/profile');
      setUser(response.data);
      
      // Redirigir según el rol del usuario
      if (response.data.role === 'student') {
        navigate('/student');
      } else if (response.data.role === 'admin') {
        navigate('/admin');
      }
    } catch (error) {
      console.error('Error checking auth:', error);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;
      
  document.cookie = `token=${token}; path=/;`;
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setUser(user);
      
      // Redirigir según el rol del usuario
      if (user.role === 'student') {
        navigate('/student');
      } else if (user.role === 'admin') {
        navigate('/admin');
      }
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Error al iniciar sesión' 
      };
    }
  };

  const logout = () => {
  document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
    navigate('/login');
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
    setUser  // Exponer setUser para poder actualizar el usuario desde otros componentes
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
