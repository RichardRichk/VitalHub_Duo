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

    // Estados para armazenar os dados do usuário
    const [userData, setUserData] = useState({});
    const [userId, setUserId] = useState('');
    const [userType, setUserType] = useState('');
    const [userIdLoaded, setUserIdLoaded] = useState(false);

    const [showCam, setShowCam] = useState(false);
    const [uriCameraCapture, setUriCameraCapture] = useState(null);

    // Estados para os campos editáveis
    const [editedName, setEditedName] = useState('');
    const [editedEmail, setEditedEmail] = useState('');
    const [editedDateOfBirth, setEditedDateOfBirth] = useState('');
    const [editedCPF, setEditedCPF] = useState('');
    const [editedAddress, setEditedAddress] = useState('');
    const [editedCEP, setEditedCEP] = useState('');
    const [editedCity, setEditedCity] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [cpf, setCPF] = useState('');
    const [address, setAddress] = useState('');
    const [cep, setCEP] = useState('');
    const [city, setCity] = useState('');

    const [isEditing, setIsEditing] = useState(false);
    const [buttonText, setButtonText] = useState('Editar');

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
        try {
            const response = await api.get(`/Pacientes/BuscarPorId?id=${userId}`);
            setUserData(response.data);
        } catch (error) {
            console.log(error);
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
            // Preencher os campos editáveis com os dados do usuário
            setDateOfBirth(moment(userData.dataNascimento).format('DD-MM-YYYY'));
            setCPF(userData.cpf);
            setAddress(userData.endereco ? `${userData.endereco.logradouro}, ${userData.endereco.numero}` : '');
            setCEP(userData.endereco ? userData.endereco.cep : '');
            setCity(userData.endereco ? userData.endereco.cidade : '');
        }
    }, [userData]);

    // Função para salvar as alterações no banco de dados
    const handleSave = async () => {
        try {
            const response = await api.put(`/Pacientes/${userId}`, {
                nome: editedName || name,
                email: editedEmail || email,
                dataNascimento: editedDateOfBirth || dateOfBirth,
                cpf: editedCPF || cpf,
                endereco: {
                    logradouro: editedAddress || address,
                    cep: editedCEP || cep,
                    cidade: editedCity || city
                }
            });
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

                <InputLabel>Data de nascimento:</InputLabel>
                <InputProfile
                    placeholder={isEditing ? editedDateOfBirth : moment(userData.dataNascimento).format('DD-MM-YYYY')}
                    onChangeText={text => setEditedDateOfBirth(text)}
                    editable={isEditing}
                />

                <InputLabel>CPF:</InputLabel>
                <InputProfile
                    placeholder={isEditing ? editedCPF : userData.cpf}
                    onChangeText={text => setEditedCPF(text)}
                    editable={isEditing}
                />

                <InputLabel>Endereço</InputLabel>
                <InputProfile
                    placeholder={isEditing ? editedAddress : (userData.endereco ? `${userData.endereco.logradouro}, ${userData.endereco.numero}` : '')}
                    onChangeText={text => setEditedAddress(text)}
                    editable={isEditing}
                />

                <ContentInput>
                    <BoxInput>
                        <InputLabel>Cep</InputLabel>
                        <InputDouble
                            placeholder={isEditing ? editedCEP : (userData.endereco ? userData.endereco.cep : '')}
                            onChangeText={text => setEditedCEP(text)}
                            editable={isEditing}
                        />

                    </BoxInput>

                    <BoxInput>
                        <InputLabel>Cidade</InputLabel>
                        <InputDouble
                            placeholder={isEditing ? editedCity : (userData.endereco ? userData.endereco.cidade : '')}
                            onChangeText={text => setEditedCity(text)}
                            editable={isEditing}
                        />
                    </BoxInput>
                </ContentInput>

                <Button onPress={isEditing ? handleSave : handleEditToggle}>
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