
import { ContainerCard } from "../Container/Style"
import { ClockCard, ContentCard, DataProfileCard, ImageCard, ProfileDataCard, ProfileName, TextAge, TextBold, TextType, ViewRow } from "./Style"
import { ButtonCard, ButtonTextCard } from "../Button/Style"
import { AntDesign } from "@expo/vector-icons"
import { useEffect, useState } from "react"
import { userDecodeToken } from "../../utils/Auth"
import api from "../../Service/Service"



export const CardAppointment = ({
    navigation,
    consulta,
    userType,
    situacao,
    onPressCancel,
    onPressAppointment,
    onPressCard,
    usuarioConsulta,
    type,
    time,
}) => {

    const [profileData, setProfileData] = useState('')
    const [userData, setUserData] = useState('')
    const [fotoCard, setFotoCard] = useState('')

    async function LoadUserData() {
        if (profileData.role == "Paciente") {
            await api.get(`/Pacientes/BuscarPorID?id=${profileData.id}`)
            .then( response => {
                setUserData(response.data);
            })
        } else {
            await api.get(`/Medicos/BuscarPorID?id=${profileData.id}`)
            .then( response => {
                setUserData(response.data);
            })
        }
    }

    async function LoadFotoData() {
        if(profileData.role != "Paciente"){
            try {
                const response = await api.get(`/Medicos/BuscarPorID?id=${consulta.medicoClinica.medico.id}`)
                setFotoCard(response.data.idNavigation.foto);
            } catch (error) {
                console.error(error);
            }
        }else {
            try {
                const response = await api.get(`/Pacientes/BuscarPorID?id=${usuarioConsulta.consulta.pacienteId}`)
                setFotoCard(response.data.idNavigation.foto);
            } catch (error) {
                console.error(error);
            }
        }
        
    }

    useEffect(() => {
        const profileLoad = async () => {

            const token = await userDecodeToken();

            setProfileData(token)

            setUserType(token.role)

        };

        LoadFotoData();
        profileLoad();  
    }, []);

    useEffect(() => {
        LoadUserData();
    }, [profileData])

    return (
        <ContainerCard onPress={() => {
        
            if (situacao === "Realizados" && userType === "Paciente") {
                navigation.replace("FormRequire");
            } else if(situacao == "Pendentes" || situacao === "Realizados"){
                onPressCard();
            }
        }
        }>

            <ImageCard
                source={{ uri: fotoCard }}
            />

            <ContentCard>

                <DataProfileCard>

                    <ProfileName>{(userType === 'Medico' ? (usuarioConsulta && usuarioConsulta.idNavigation.nome) : (usuarioConsulta && usuarioConsulta.medico.idNavigation.nome))}</ProfileName>


                    <ProfileDataCard>

                        {/* <TextAge>{profileData.role == "Paciente" ? {userData.dataNascimento} : {}}</TextAge> */}
                        <TextType>{type}</TextType>

                    </ProfileDataCard>

                </DataProfileCard>

                <ViewRow>

                    <ClockCard situacao={situacao}>
                        <AntDesign name="clockcircle" size={14} color={situacao == "Pendentes" ? "#49B3BA" : "8C8A97"} />
                        <TextBold situacao={situacao} color={"#49B3BA"}> {time} </TextBold>
                    </ClockCard>


                    {/* valida e mostra o tipo de botao conforme a situacao */}

                    {
                        situacao == "Cancelados" ? (
                            <>
                            </>
                        ) : situacao == "Pendentes" ? (

                            <ButtonCard onPress={onPressCancel}>
                                <ButtonTextCard situacao={situacao}>Cancelar </ButtonTextCard>
                            </ButtonCard>

                        ) : (
                            <ButtonCard onPress={onPressAppointment}>
                                <ButtonTextCard situacao={situacao}>Ver Prontuario </ButtonTextCard>
                            </ButtonCard>
                        )
                    }



                </ViewRow>

            </ContentCard>

        </ContainerCard>
    )
}