import { ContainerHeader } from "../Container/Style"
import { BoxUser, DataUser, ImageUser, NameUser, TextDefault } from "./Style"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

//Importado funcao da utils/Auth
import { userDecodeToken } from '../../utils/Auth'
import React, { useEffect, useState } from "react";
import api from "../../Service/Service";
import { StatusBar } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

export const Header = ({ navigation }) => {

    const [name, setName] = useState(['']);
    const [foto, setFoto] = useState() //puxar foto de perfil no header
    const [userId, setUserId] = useState(''); //puxar foto de perfil no header



    const profileLoad = async () => {

        const token = await userDecodeToken();

        const nameParts = token.name.split(' ');

        const names = nameParts.slice(0, 2).join(' ');

        setName(names)

        setUserId(token.id);

        setName(token.name) //puxar foto de perfil no header

        if (foto == null) { //puxar foto de perfil no header
            await GetUser(token.id)
        }

    };

    useEffect(()=>{
            GetUser()
    }, [foto])

    
    useEffect(() => {
        profileLoad();
    }, []);


    async function GetUser(id) { //puxar foto de perfil no header
        try {
            
            const response = await api.get(`/Usuario/BuscarPorId?id=${id}`)
            setFoto(response.data.foto);
            
        } catch (error) {
            console.log(error + 'erro buscar usuario');
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            StatusBar.setBarStyle('light-content')

            profileLoad();

            return () => {
                StatusBar.setBarStyle('default');
            };

        }, [])
    );


    return (


        <ContainerHeader>
            <BoxUser onPress={() => navigation.navigate("Profile")}>
                
                {foto !== null && (
                <ImageUser
                    source={{ uri: foto }}
                />
            )}
                <DataUser>
                    <TextDefault>Bem Vindo</TextDefault>
                    <NameUser>{name}</NameUser>
                </DataUser>
            </BoxUser>

            <MaterialIcons
                name="notifications"
                size={30}
                color="#FBFBFB"
                style={{ marginTop: 20, marginRight: 20 }}
            />
        </ContainerHeader>
    );
};
