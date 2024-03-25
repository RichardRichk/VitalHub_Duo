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

    return(
    <Container>

            <HeaderPhotoContainer>
                <HeaderPhoto
                    source={require("../../assets/Images/ProfilePic.png")}
                />
            </HeaderPhotoContainer>

            <ModalProfile>
                <Title>Richard Kosta</Title>
                <SubTitle>richard.kosta@gmail.com</SubTitle>
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