
import { ContainerCard } from "../Container/Style"
import { ClockCard, ContentCard, DataProfileCard, ImageCard, ProfileDataCard, ProfileName, TextAge, TextBold, TextType, ViewRow } from "./Style"
import { ButtonCard, ButtonTextCard } from "../Button/Style"
import { AntDesign } from "@expo/vector-icons"
import { useEffect, useState } from "react"
import { userDecodeToken } from "../../utils/Auth"
import api from "../../Service/Service"
import { logProfileData } from "react-native-calendars/src/Profiler"



export const CardAppointment = ({
    navigation,
    consulta,
    dataConsulta,
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
    const [prioridade, setPrioridade] = useState('');
    const [idadePaciente, setIdadePaciente] = useState([]);


    async function AnalyseType(tipo) {
        if (tipo == 0) {
            setPrioridade("Rotina")
        }
        else if (tipo == 1) {
            setPrioridade("Exame")
        }
        else {
            setPrioridade("Urgência")
        }
    }

    async function LoadUserData() {
        if (profileData.role == "Paciente") {
            await api.get(`/Pacientes/BuscarPorID?id=${profileData.id}`)
                .then(response => {
                    setUserData(response.data);
                })
        } else {
            await api.get(`/Medicos/BuscarPorID?id=${profileData.id}`)
                .then(response => {
                    setUserData(response.data);
                })
        }
    }

    async function LoadAge(dataS) {
        if (profileData.role != "Paciente") {

            // Obter a data de nascimento do objeto userData
            const dataNascimento = new Date(dataS);

            // Obter a data atual
            const dataAtual = new Date();

            // Calcular a diferença entre as datas
            const Anos = dataAtual.getFullYear() - dataNascimento.getFullYear();
            const Meses = dataAtual.getMonth() - dataNascimento.getMonth();
            const Dias = dataAtual.getDate() - dataNascimento.getDate();

            // Ajustar a diferença para considerar os meses e dias
            if (Meses < 0 || (Meses === 0 && Dias < 0)) {
                Anos--;
            }

            // A idade é o número de anos de diferença
            setIdadePaciente(Anos);
        }
    }

    async function LoadFotoData() {
        if (profileData.role === "Paciente") {
            try {
                const response = await api.get(`/Medicos/BuscarPorId?id=${consulta.medicoClinica.medico.id}`)
                setFotoCard(response.data.idNavigation.foto);
            } catch (error) {
                console.error(error);
            }
        } else {
            try {
                const response = await api.get(`/Pacientes/BuscarPorId?id=${usuarioConsulta.consulta[0].pacienteId}`)
                setFotoCard(response.data.idNavigation.foto);
                LoadAge(response.data.dataNascimento);
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

        profileLoad();
    }, []);

    useEffect(() => {
        LoadUserData();
        LoadFotoData();
    }, [profileData])

    useEffect(() => {
        AnalyseType(type);
    }, [type])

    useEffect(() => {
        LoadFotoData();
    }, [dataConsulta])

    return (
        <ContainerCard onPress={() => {

            if (situacao === "Realizados" && userType === "Paciente") {
                navigation.replace("FormRequire");
            } else if (situacao == "Pendentes" || situacao === "Realizados") {
                onPressCard();
            }
        }
        }>

            {fotoCard !== null && (
                <ImageCard
                    source={{ uri: fotoCard }}
                />
            )}

            <ContentCard>

                <DataProfileCard>

                    <ProfileName>{(userType === 'Medico' ? (usuarioConsulta && usuarioConsulta.idNavigation.nome) : (usuarioConsulta && usuarioConsulta.medico.idNavigation.nome))}</ProfileName>


                    <ProfileDataCard>

                        <TextAge>{profileData.role != "Paciente" ? `Idade: ${idadePaciente}` : ''}</TextAge>
                        <TextType>{prioridade}</TextType>

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