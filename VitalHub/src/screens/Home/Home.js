import { useEffect, useState } from "react"
import { AbsListAppointment } from "../../components/AbsListAppointment/AbsListAppointment"
import Calendar from "../../components/Calendar/Calendar"
import { Container, ContainerScroll } from "../../components/Container/Style"
import { Header } from "../../components/Header/Header"
import { CreateAppointment, FilterAppointment, StethoscopeImage } from "./Style"
import { ListComponent } from "../../components/List/List"
import { CardAppointment } from "../../components/CardAppointment/CardAppointment"
import CancellationModal from "../../components/CancellationModal/CancellationModal"
import AppointmentModal from "../../components/AppointmentModal/AppointmentModal"
import ScheduleModal from "../../components/ScheduleModal/ScheduleModal"
import { userDecodeToken } from "../../utils/Auth"
import api from "../../Service/Service"
import moment from "moment";


export const HomeFunc = ({ navigation }) => {
    const [dataConsulta, setDataConsulta] = useState('')

    const [profileData, setProfileData] = useState('')
    const [userType, setUserType] = useState('');
    const [statusLista, setStatusLista] = useState('Pendentes');
    // Satate para os modais
    const [showModalCancel, setShowModalCancel] = useState(false);
    const [showModalAppointment, setShowModalAppointment] = useState(false);
    const [showScheduleModal, setShowScheduleModal] = useState(false);
    const [consultas, setConsultas] = useState([]);

    const [consultaSelecionada, setConsultaSelecionada] = useState(null);

    async function MostrarModal(modal, consulta) {
        setConsultaSelecionada(consulta)


        if (modal == 'cancelar') {
            setShowModalCancel(true)
        } else {
                setShowModalAppointment(true)
        }
    }

    async function ListarConsultas() {
        const url = (userType === 'Medico' ? "Medicos" : "Pacientes");
    
        try {
            const response = await api.get(`/${url}/BuscarPorData?data=${dataConsulta}&id=${profileData.id}`);
            setConsultas(response.data); // Assume que a resposta da API contém os dados das consultas
        } catch (error) {
            console.error('Erro ao buscar consultas:', error);
            // Trate o erro, se necessário
        }
    }
    

    useEffect(() => {
        const profileLoad = async () => {
            const token = await userDecodeToken();
    
            setProfileData(token)
    
            setUserType(token.role)
    
            setDataConsulta(moment().format('YYYY-MM-DD'))
        };

        profileLoad();  
    }, []);



    useEffect(() => {
        if (dataConsulta != '') {
            ListarConsultas();
        }
    }, [dataConsulta])

    return (
        <Container>
            {/* Header */}
            <Header
                navigation={navigation}
            />

            <Calendar
                setDataConsulta={setDataConsulta}

            />

            <FilterAppointment>

                <AbsListAppointment
                    textButton={"Agendadas"}
                    clickButton={statusLista === "Pendentes"}
                    onPress={() => setStatusLista("Pendentes")}
                />
                <AbsListAppointment
                    textButton={"Realizadas"}
                    clickButton={statusLista === "Realizados"}
                    onPress={() => setStatusLista("Realizados")}
                />
                <AbsListAppointment
                    textButton={"Canceladas"}
                    clickButton={statusLista === "Cancelados"}
                    onPress={() => setStatusLista("Cancelados")}
                />

            </FilterAppointment>

            <ContainerScroll>
                <ListComponent
                    data={consultas}
                    keyExtractor={(item) => item.id}

                    renderItem={({ item }) =>
                        statusLista == item.situacao.situacao && (

                            <CardAppointment
                                consulta={item}
                                navigation={navigation}
                                idConsulta={item.id}
                                dataConsulta={dataConsulta}
                                situacao={item.situacao.situacao}
                                type={item.prioridade.prioridade}
                                onPressAppointment={() => navigation.navigate('FormRequire', { profileData: profileData, idConsulta: item.id})}
                                time={item.dataConsulta.split('T')[1].split(':')[0] + ':' + item.dataConsulta.split('T')[1].split(':')[1]}

                                usuarioConsulta={ item && 
                                    ( profileData.role == "Medico" ? item.paciente : item.medicoClinica )
                                }

                                userType={userType}
                                
                                onPressCancel={() => MostrarModal('cancelar', item)}
                                onPressCard={() => MostrarModal('prontuario', item)}
                            />

                        )
                    }
                />



                <CancellationModal
                    visible={showModalCancel}
                    setShowModalCancel={setShowModalCancel}
                    idConsulta={consultaSelecionada ? consultaSelecionada.id : ''}
                    navigation={navigation}
                />


                <AppointmentModal
                    usuarioConsulta={ consultaSelecionada && 
                        ( profileData.role == "Medico" ? consultaSelecionada.paciente : consultaSelecionada.medicoClinica.medico )
                    }
                    consulta={consultaSelecionada}
                    profileData={profileData}

                    visible={showModalAppointment}
                    setShowModalAppointment={setShowModalAppointment}
                    navigation={navigation}
                    situacao={statusLista}
                />

                <ScheduleModal
                    visible={showScheduleModal}
                    setShowScheduleModal={setShowScheduleModal}
                    navigation={navigation}
                    userId={profileData.id}
                />

            </ContainerScroll>

            {
                userType == "Medico" ? (
                    <>
                    </>
                ) : (


                    <CreateAppointment onPress={() => { setShowScheduleModal(true) }}>

                        <StethoscopeImage

                            source={require("../../assets/Images/stethoscope_medical.png")}
                        />
                    </CreateAppointment>

                )
            }

        </Container>
    )
}