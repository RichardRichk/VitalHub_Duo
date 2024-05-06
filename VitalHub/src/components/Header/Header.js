import { ContainerHeader } from "../Container/Style"
import { BoxUser, DataUser, ImageUser, NameUser, TextDefault } from "./Style"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

//Importado funcao da utils/Auth
import { userDecodeToken } from '../../utils/Auth'
import React, { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

export const Header = ({ navigation }) => {

    const [name, setName] = useState(['']);

    useEffect(() => {
        const profileLoad = async () => {

            const token = await userDecodeToken();

            const nameParts = token.name.split(' ');

            const names = nameParts.slice(0, 2).join(' ');

            setName(names)
        };

        profileLoad();
    }, []);

    useFocusEffect(
        React.useCallback(() =>{
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
                <ImageUser
                    source={require("../../assets/Images/DoctorPhoto.png")}
                />
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