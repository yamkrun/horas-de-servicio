import { api } from ".";

export const logIn = async(body) =>{
    const response = await api.post('/auth/login', body);
    // La cookie se establece automáticamente por el servidor
    return response;
}
 export const logOut = async(body) =>{
    const {data,status} = await api.get('/auth/logout', body)
    return{status,data}
}

