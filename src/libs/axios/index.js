import axios from "axios";

export const api = axios.create({
  baseURL: "https://www.hs-service.api.crealape.com/api/v1/",
  withCredentials: true,  // Importante: permite el envío de cookies
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

// Interceptor para agregar el token a todas las solicitudes
api.interceptors.request.use(
  (config) => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptar respuestas para manejar errores de autenticación
api.interceptors.response.use(
  function onFulfilled(response) {
    return response;
  },
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Si es error de autenticación o autorización, limpiar cookie y redirigir a login
      document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      if (window.location.pathname !== "/login") {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);










