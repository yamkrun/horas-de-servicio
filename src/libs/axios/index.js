import axios from "axios";


export const api = axios.create({
  baseURL: "https://www.hs-service.api.crealape.com/api/v1/",
  withCredentials: true,
});

// Interceptar todas las peticiones para agregar el token de la cookie si existe
api.interceptors.request.use(
  function (config) {
    const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function onFulfilled(response) {
    
    console.log('Cookies después de response:', document.cookie);
    return response;
  },
  function onRejected(error) {
    console.log('Response error:', error);
    console.log('Error status:', error.response?.status);
    console.log('Error data:', error.response?.data);
   
    if (
      error.response &&
      error.response.status === 401 &&
      window.location.pathname !== "/login"
    ) {
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);










