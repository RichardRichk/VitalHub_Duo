import { BoxInput, Container, ContainerScroll, DoubleView } from "../../components/Container/Style"
import { HeaderPhotoContainer, HeaderPhoto } from "../../components/HeaderPhoto/Style"
import { InputDouble, InputLabel, InputProfile } from "../../components/Input/Style"
import { ModalProfile } from "../../components/Modal/Style"
import { SubTitle, Title } from "../../components/Title/Style"
import { Button, ButtonSecondary, ButtonSecondaryTitle, TextButton } from "../../components/Button/Style"
import { ContentInput } from "../../components/ContentAccount/Style"
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { userEncodeToken } from "../../utils/Auth"
import AsyncStorage from "@react-native-async-storage/async-storage"

//Importado funcao da utils/Auth
import { userDecodeToken } from '../../utils/Auth'
import { useEffect, useState } from "react";
import moment from "moment";
import api from "../../Service/Service"
import { ButtonCamera } from "./Style"
import { CameraComp } from "../../components/Camera/Camera"


export const ProfileFunc = ({navigation}) => {

    const[userData, setUserData] = useState([]);
    const [userId, setUserId] = useState('');
    const [userType, setUserType] = useState('');
    const [userIdLoaded, setUserIdLoaded] = useState(false);

    const [showCam, setShowCam] = useState(false)
    const [uriCameraCapture, setUriCameraCapture] = useState(null)

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');


    const [isEditing, setIsEditing] = useState(false);
    const [buttonText, setButtonText] = useState('Editar');

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
        setButtonText(isEditing ? 'Editar' : 'Salvar');
    };


    const handleLogout = async () => {
        // Obtenha o token do AsyncStorage (supondo que você o tenha armazenado com o nome 'token')
        const token = await AsyncStorage.getItem('token');

        // Verifique se há um token antes de codificá-lo novamente
        if (token) {
            // Chame a função userEncodeToken para codificar o token novamente
            await userEncodeToken(token);
        }

        navigation.replace('Login')
    };

    
    async function ListProfile(){
        try {
            const response = await api.get(`/Pacientes/BuscarPorID?id=${userId}`);
            setUserData(response.data);

            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    } 

    

    useEffect(() => {
        const profileLoad = async () => {

            const token = await userDecodeToken();

            const nameParts = token.name.split(' ');

            const names = nameParts.slice(0, 2).join(' ');

            setName(names)

            setEmail(token.email)

            setUserType(token.role)

            setUserId(token.id)

            setUserIdLoaded(true);
            
        };

        profileLoad();  
    }, []);


    useEffect(() => {
        if (userIdLoaded) {
            ListProfile();
        }
    }, [userIdLoaded]);

    useEffect(() => {
        
        console.log(uriCameraCapture);
        if(uriCameraCapture){
            AlterarFotoPerfil();
            
        }
    }, [uriCameraCapture])


    async function AlterarFotoPerfil() {
        const formData = new FormData();
        formData.append("Arquivo", {
            uri : uriCameraCapture,
            name: `image.${uriCameraCapture.split(".")[1]}`,
            type: `image/${uriCameraCapture.split(".")[1]}`
        })
        console.log(idUser);
        await api.put(`/Usuario/AlterarFotoPerfil?id=${userId}`, formData, {
            headers:{
                "Content-Type": "multipart/form-data"
            }
        }).then(response => {
            console.log("RESPONSE DO PUT");
            console.log(response);
        }).catch(erro => {
            console.log("Alterar foto");
            console.log(erro);
        })
    }

    
    return (

        <Container>

            <HeaderPhotoContainer>
                    <HeaderPhoto
                        source={{ uri: uriCameraCapture }}
                    />

                <ButtonCamera onPress={() => { setShowCam(true) }} >
                    <MaterialCommunityIcons name="camera-plus" size={20} color={"#fbfbfb"} />
                </ButtonCamera>
            </HeaderPhotoContainer>

            <CameraComp visible={showCam} getMediaLibrary={true} setShowCamera={setShowCam} setUriCameraCapture={setUriCameraCapture}/>

            <ModalProfile>
                <Title>{name}</Title>
                <SubTitle>{email}</SubTitle>
            </ModalProfile>

            <ContainerScroll>

            <InputLabel>Data de nascimento:</InputLabel>
            <InputProfile
                placeholder= {moment(userData.dataNascimento).format('DD-MM-YYYY')}
                editable={false}
            />

            <InputLabel>CPF:</InputLabel>
            <InputProfile
                placeholder= {userData.cpf}
                editable={false}
            />

            <InputLabel>Endereço</InputLabel>
            <InputProfile
                placeholder= {userData.endereco ? `${userData.endereco.logradouro}, ${userData.endereco.numero}` : ''}
                editable={false}
            />

            <ContentInput>
                <BoxInput>
                    <InputLabel>Cep</InputLabel>
                    <InputDouble
                        placeholder= {userData.endereco ? userData.endereco.cep : ''}
                        editable={false}
                    />
                </BoxInput>

                <BoxInput>
                    <InputLabel>Cidade</InputLabel>
                    <InputDouble
                        placeholder="Diadema-SP"
                        editable={false}
                    />
                </BoxInput>
            </ContentInput>

            <Button onPress={handleEditToggle}>
                    <TextButton>{buttonText}</TextButton>
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