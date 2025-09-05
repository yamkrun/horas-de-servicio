import axios from "axios";

export const api = axios.create({
  baseURL: 'https://www.hs-service.api.crealape.com/api/v1/',
  withCredentials:true
});


axios.interceptors.response.use(function onFulfilled(response) {
    
    return response;
  }, function onRejected(error) {
    if(error.status===401 &&window.location.pathname !=="/login"){
      window.location.href= "/login"
    }
    
    return Promise.reject(error);
  });
