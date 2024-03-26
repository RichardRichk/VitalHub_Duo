import { StatusBar } from "expo-status-bar"
import { BoxInput, Container, ContainerScroll, DoubleView } from "../../components/Container/Style"
import { HeaderPhotoContainer, HeaderPhoto } from "../../components/HeaderPhoto/Style"
import { InputDouble, InputLabel, InputProfile } from "../../components/Input/Style"
import { ModalProfile } from "../../components/Modal/Style"
import { SubTitle, Title } from "../../components/Title/Style"
import { Button, ButtonSecondary, ButtonSecondaryTitle, TextButton } from "../../components/Button/Style"
import { ContentInput } from "../../components/ContentAccount/Style"

import { userEncodeToken } from "../../utils/Auth"
import AsyncStorage from "@react-native-async-storage/async-storage"

//Importado funcao da utils/Auth
import { userDecodeToken } from '../../utils/Auth'
import { useEffect, useState } from "react";


export const ProfileFunc = ({navigation}) => {

    const handleLogout = async () => {
        // Obtenha o token do AsyncStorage (supondo que você o tenha armazenado com o nome 'token')
        const token = await AsyncStorage.getItem('token');

        // Verifique se há um token antes de codificá-lo novamente
        if (token) {
            // Chame a função userEncodeToken para codificar o token novamente
            await userEncodeToken(token);
        }

        navigation.replace('Login')

        console.log(token);
    };

    const [name, setName] = useState(['']);
    const [email, setEmail] = useState('');

    useEffect(() => {
        const profileLoad = async () => {

            const token = await userDecodeToken();

            const nameParts = token.name.split(' ');

            const names = nameParts.slice(0, 2).join(' ');

            setName(names)

            setEmail(token.email)
        };

        profileLoad();
    }, []);
    

    return(
    <Container>

            <HeaderPhotoContainer>
                <HeaderPhoto
                    source={require("../../assets/Images/ProfilePic.png")}
                />
            </HeaderPhotoContainer>

            <ModalProfile>
                <Title>{name}</Title>
                <SubTitle>{email}</SubTitle>
            </ModalProfile>

            <ContainerScroll>

            <InputLabel>Data de nascimento:</InputLabel>
            <InputProfile
                placeholder= "04/05/1990"
            />

            <InputLabel>CPF:</InputLabel>
            <InputProfile
                placeholder= "859********"
            />

            <InputLabel>Endereço</InputLabel>
            <InputProfile
                placeholder= "Rua Vicenso Silva, 987"
            />

            <ContentInput>
                <BoxInput>
                    <InputLabel>Cep</InputLabel>
                    <InputDouble
                        placeholder="00000-000"
                    />
                </BoxInput>

                <BoxInput>
                    <InputLabel>Cidade</InputLabel>
                    <InputDouble
                        placeholder="Diadema-SP"
                    />
                </BoxInput>
            </ContentInput>

            <Button>

                <TextButton>SALVAR</TextButton>

            </Button>

            <ButtonSecondary onPress={handleLogout}>
                <ButtonSecondaryTitle>
                    Sair do app
                </ButtonSecondaryTitle>
            </ButtonSecondary>

            </ContainerScroll>
    
    </Container> 
    )
}