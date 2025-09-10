import { api } from ".";

export const logIn = async(body) =>{
    try {
        const response = await api.post('/auth/login', body);
        // La cookie se establece automáticamente por el servidor
        return response;
    } catch (error) {
        throw error;
    }
}
 export const logOut = async(body) =>{
    try{
        const {data,status} = await api.get('/auth/logout', body)
        return{status,data}
    }
    catch(error){
        throw error;

    }
}

