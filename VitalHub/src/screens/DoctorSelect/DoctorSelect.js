import { Title } from "../../components/Title/Style"
import { Container, ContainerWithMargin } from "../../components/Container/Style"
import { ContainerScrollWithMargin } from "./Style"
import { ListComponent } from "../../components/List/List"
import { Button, ButtonSecondary, ButtonSecondaryTitle, TextButton } from "../../components/Button/Style"
import { useEffect, useState } from "react"
import { CardDoctorSelect } from "../../components/CardDoctorSelect/CardDoctorSelect"
import api from "../../Service/Service"
import LoadingButton from "../../utils/LoadingButton"

export const DoctorSelect = ({ navigation, route }) => {

    const [loading, setLoading] = useState(false);

    const [selected, setSelected] = useState('');


    const [medicosLista, setMedicosLista] = useState([]);
    const [medico, setMedico] = useState(null);

    function handleContinue() {
        navigation.replace("CalendarScreen", {
            agendamento : {
                ...route.params.agendamento,
                ...medico
            }
        })
    }

    // Função para cancelar a consulta
    const doctorSelect = async () => {
        setLoading(true);

        if (selected != '') {
            
            try {
    
                await new Promise(resolve => setTimeout(resolve, 800));
                handleContinue();
                setLoading(false);
    
            } catch (error) {
                console.error("Erro ao cancelar consulta:", error);
                setLoading(false);
            }
        } else {
            alert("Favor selecionar a Medica(o) para a consulta")
            setSelected('')
            setLoading(false);
        }
    };



    // async function ListarMedicos() {
    //     await api.get('/Medicos')
    //         .then(response => {
    //             setMedicosLista(response.data)
    //             console.log(response.data);
    //         }).catch(error => {
    //             console.log(error);
    //         })
    // }

    async function ListarMedicos() {
        await api.get(`/Medicos/BuscarPorIdClinica?id=${route.params.agendamento.clinicaId}`)
            .then(response => {
                setMedicosLista(response.data)
                console.log(response.data);
            }).catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        ListarMedicos();
    }, [])


    return (
        <Container>

            <ContainerWithMargin>

                <Title>Selecionar médico</Title>

            </ContainerWithMargin>



            <ContainerScrollWithMargin>

                <ListComponent
                    data={medicosLista}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) =>
                        <CardDoctorSelect
                            onPress={() => setSelected(item.idNavigation.id)}
                            select={selected}

                            setMedico={setMedico}
                            medico={item}

                            id={item.idNavigation.id}
                            name={item.idNavigation.nome}
                            specialty={item.especialidade.especialidade1}
                        />
                    }
                    showsVerticalScrollIndicator={false}

                />



            </ContainerScrollWithMargin>

            <LoadingButton
                onPress={doctorSelect}
                disabled={loading}
                loading={loading}
                text="Continuar"
            />

            <ButtonSecondary onPress={() => {navigation.replace("Main"), setSelected('')}}>
                <ButtonSecondaryTitle>Cancelar</ButtonSecondaryTitle>
            </ButtonSecondary>

        </Container>

    )

}