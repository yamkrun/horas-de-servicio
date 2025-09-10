import { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { api } from '../../libs/axios';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Función para obtener el token actual
  const getStoredToken = () => {
    return document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
  };

  // Efecto para verificar la autenticación inicial
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        console.log("Checking authentication status...");
        const token = getStoredToken();

        if (!token) {
          console.log("No token found in cookies");
          setUser(null);
          setLoading(false);
          return;
        }

        console.log("Token found, setting Authorization header");
        // Configurar el token en el header
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // Verificar el token con el servidor
        console.log("Fetching user profile...");
        const response = await api.get('/auth/profile');
        console.log("Profile response:", response.data);
        setUser(response.data);
        setLoading(false);

      } catch (error) {
        console.error('Auth check error:', error);
        setUser(null);
        // Limpiar cookie en caso de error
        document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        delete api.defaults.headers.common['Authorization'];
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email, password) => {
    try {
      const loginResponse = await api.post('/auth/login', { email, password });
      const { token } = loginResponse.data;

      // Establecer el token en la cookie
      document.cookie = `token=${token}; path=/;`;
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Obtener el perfil después de establecer el token
      const profileResponse = await api.get('/auth/profile');
      const userData = profileResponse.data;

      if (!userData || !userData.role) {
        throw new Error('Perfil de usuario inválido');
      }

      console.log('User data from login:', userData);
      setUser(userData);

      return { success: true, user: userData };
    } catch (error) {
      console.error('Login error:', error);
      // Limpiar cookie en caso de error
      document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      delete api.defaults.headers.common['Authorization'];
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Error al iniciar sesión'
      };
    }
  };

  const logout = () => {
    // Limpiar la cookie y la autorización
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    delete api.defaults.headers.common['Authorization'];

    // Actualizar el estado
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
    setUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
