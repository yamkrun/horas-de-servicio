import { api } from ".";

export const logIn = async(body) =>{
    try {
        return await api.post('/auth/login', body);
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

