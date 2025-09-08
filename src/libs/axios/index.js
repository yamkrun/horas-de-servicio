import axios from "axios";


export const api = axios.create({
  baseURL: "https://www.hs-service.api.crealape.com/api/v1/",
  withCredentials: true,
});

// Configurar el header Authorization si el token existe
const token = localStorage.getItem('token');
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}



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










