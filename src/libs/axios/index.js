import axios from "axios";

export const api = axios.create({
  baseURL: 'https://www.hs-service.api.crealape.com/api/v1',
  withCredentials:true
});

// Debug interceptor para verificar cookies
api.interceptors.request.use(
  function (config) {
    console.log('Request to:', config.url);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);






axios.interceptors.response.use(function onFulfilled(response) {
    return response;
  }, function onRejected(error) {
    console.log('Response error:', error);
    console.log('Error status:', error.response?.status);
    console.log('Error data:', error.response?.data);
    if(error.response?.status === 401 && window.location.pathname !== "/login"){
      window.location.href = "/login";
    }
    return Promise.reject(error);
  });
