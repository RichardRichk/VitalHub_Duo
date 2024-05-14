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


export const ProfileFunc = ({ navigation }) => {
    const [userData, setUserData] = useState({});
    const [userId, setUserId] = useState('');
    const [userType, setUserType] = useState('');
    const [userIdLoaded, setUserIdLoaded] = useState(false);
    const [showCam, setShowCam] = useState(false);
    const [uriCameraCapture, setUriCameraCapture] = useState(null);
    const [name, setName]= useState('')
    const [email, setEmail]= useState('')

    const [editedName, setEditedName] = useState('');
    const [editedEmail, setEditedEmail] = useState('');
    const [editedDateOfBirth, setEditedDateOfBirth] = useState('');
    const [editedCPF, setEditedCPF] = useState('');
    const [editedAddress, setEditedAddress] = useState('');
    const [editedCEP, setEditedCEP] = useState('');
    const [editedCity, setEditedCity] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [buttonText, setButtonText] = useState('Editar');

    const [dateOfBirth, setDateOfBirth] = useState('');
    const [cpf, setCPF] = useState('');
    const [address, setAddress] = useState('');
    const [cep, setCEP] = useState('');
    const [city, setCity] = useState('');

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
        setButtonText(isEditing ? 'Editar' : 'Salvar');
    };

    const handleLogout = async () => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            await userEncodeToken(token);
        }
        navigation.replace('Login');
    };

    async function ListProfile() {
        if (userType == "Paciente") {
            
            try {
                const response = await api.get(`/Pacientes/BuscarPorId?id=${userId}`);
                setUserData(response.data);
                setUriCameraCapture(response.data.idNavigation.foto);
            } catch (error) {
                console.log(error);
            }

        } else {
            try {
                const response = await api.get(`/Medicos/BuscarPorId?id=${userId}`);
                setUserData(response.data);
                setUriCameraCapture(response.data.idNavigation.foto);
                console.log("UserData",response.data);
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        const profileLoad = async () => {
            const token = await userDecodeToken();
            const nameParts = token.name.split(' ');
            const names = nameParts.slice(0, 2).join(' ');

            setName(names);
            setEmail(token.email);
            setUserType(token.role);
            setUserId(token.id);
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
        if (userData) {
            setDateOfBirth(moment(userData.dataNascimento).format('DD-MM-YYYY'));
            setCPF(userData.cpf);
            setAddress(userData.endereco ? `${userData.endereco.logradouro}, ${userData.endereco.numero}` : '');
            setCEP(userData.endereco ? userData.endereco.cep : '');
            setCity(userData.endereco ? userData.endereco.cidade : '');
        }
    }, [userData]);

    useEffect(() => {
        if (uriCameraCapture) {
            AlterarFotoPerfil();
        }
    },[uriCameraCapture])

    async function AlterarFotoPerfil() {	
        const formData = new FormData();	
        formData.append("Arquivo", {	
            uri : uriCameraCapture,	
            name: `image.${uriCameraCapture.split(".")[1]}`,	
            type: `image/${uriCameraCapture.split(".")[1]}`	
        })	

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

    const handleSavePaciente = async () => {
        try {
            const requestBody = {
                rg: userData.rg,
                cpf: editedCPF || userData.cpf,
                dataNascimento: editedDateOfBirth || userData.dataNascimento,
                cep: editedCEP || userData.endereco?.cep,
                logradouro: editedAddress || userData.endereco?.logradouro,
                numero: userData.endereco?.numero,
                cidade: editedCity || userData.endereco?.cidade,
                nome: name,
                email: email,
                senha: userData.senha,
                idTipoUsuario: userData.idTipoUsuario,
                arquivo: "string", 
                foto: uriCameraCapture || userData.foto
            };
    
            const response = await api.put(`/Pacientes?idUsuario=${userId}`, requestBody);
            setUserData(response.data);
            setIsEditing(false);
            setButtonText('Editar');
        } catch (error) {
            console.log(error);
        }
    };

    const handleSaveMedico = async () => {
        try {
            const requestBody = {
                nome: name,
                email: email,
                senha: userData.senha,
                arquivo: "string", 
                foto: uriCameraCapture || userData.foto,
                cep: editedCEP || userData.endereco?.cep,
                logradouro: editedAddress || userData.endereco?.logradouro,
                numero: userData.endereco?.numero,
                cidade: editedCity || userData.endereco?.cidade,
                especialidadeId: userData.especialidadeId,
                crm: userData.crm,
                idTipoUsuario: userData.tipoUsuarioId
            };
    
            const response = await api.put(`/Medicos?idUsuario=${userId}`, requestBody);
            setUserData(response.data);
            setIsEditing(false);
            setButtonText('Editar');
        } catch (error) {
            console.log(error);
        }
    };


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

            <CameraComp visible={showCam} getMediaLibrary={true} setShowCamera={setShowCam} setUriCameraCapture={setUriCameraCapture} />

            <ModalProfile>
                <Title>{name}</Title>
                <SubTitle>{email}</SubTitle>
            </ModalProfile>

            <ContainerScroll>

                {userType == "Paciente" ? <>

                    <InputLabel>{userType == "Paciente" ? 'Data de nascimento:' : ''}</InputLabel>
                    <InputProfile
                        placeholder={userData.dataNascimento ? `${moment(userData.dataNascimento).format('DD-MM-YYYY')}` : ''}
                        onChangeText={text => setEditedDateOfBirth(text)}
                        editable={isEditing}
                    />
                </> : <></>}

                <InputLabel>{userType == "Paciente" ? 'CPF:' : 'CRM:'}</InputLabel>
                <InputProfile
                    placeholder={userData.cpf ? `${userData.cpf}` : `${userData.crm}`}
                    onChangeText={text => setEditedCPF(text)}
                    editable={false}
                />

                <InputLabel>Endereço</InputLabel>
                <InputProfile
                    placeholder={(userData.endereco ? `${userData.endereco.logradouro}` : '')}
                    onChangeText={text => setEditedAddress(text)}
                    editable={isEditing}
                />

                <ContentInput>
                    <BoxInput>
                        <InputLabel>Cep</InputLabel>
                        <InputDouble
                            placeholder={(userData.endereco ? userData.endereco.cep : '')}
                            onChangeText={text => setEditedCEP(text)}
                            editable={isEditing}
                        />

                    </BoxInput>

                    <BoxInput>
                        <InputLabel>Cidade</InputLabel>
                        <InputDouble
                            placeholder={(userData.endereco ? userData.endereco.cidade : '')}
                            onChangeText={text => setEditedCity(text)}
                            editable={isEditing}
                        />
                    </BoxInput>
                </ContentInput>

                <Button onPress={isEditing ? (userType == "Paciente" ? handleSavePaciente : handleSaveMedico) : handleEditToggle}>
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