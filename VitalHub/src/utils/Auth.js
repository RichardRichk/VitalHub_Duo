import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode"; 
import { decode, encode } from 'base-64';

if( !global.atob) {
    global.atob = decode
}

if( !global.btoa) {
    global.btoa = encode
}

//Funcao de decodificar o token
export const userDecodeToken = async () =>{

    //Capturando o token
    const token = await AsyncStorage.getItem('token');

    if( token === null){
        return null;
    }

    //Descripitografando token
    const decode = jwtDecode(token)

    return {
        role:decode.role,
        name: decode.name,
        email: decode.email,
        id: decode.jti,
    }
}

//Funcao de codificar o token
export const userEncodeToken = async (token) =>{
    try {
        // Codificar o token
        const encodedToken = encode(token);
        
        // Armazenar o token codificado no AsyncStorage
        await AsyncStorage.setItem('encodedToken', encodedToken);
        
        return encodedToken;
    } catch (error) {
        console.error("Erro ao codificar e armazenar o token:", error);
        return null;
    }
}