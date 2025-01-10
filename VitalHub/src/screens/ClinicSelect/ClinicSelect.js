import { Title } from "../../components/Title/Style"
import { CardClinicSelect } from "../../components/CardClinicSelect/CardClinicSelect"
import { Container, ContainerWithMargin } from "../../components/Container/Style"
import { ContainerScrollWithMargin } from "./Style"
import { ListComponent } from "../../components/List/List"
import { Button, ButtonSecondary, ButtonSecondaryTitle, TextButton } from "../../components/Button/Style"
import { useEffect, useState } from "react"
import api from "../../Service/Service"

import LoadingButton from "../../utils/LoadingButton"

export const ClinicSelect = ({ navigation, route }) => {

    const [loading, setLoading] = useState(false);
    const [clinica, setClinica] = useState(null);

    const [selected, setSelected] = useState('');


    const [clinicData, setClinicData] = useState([]);


    function handleContinue() {
        navigation.replace("DoctorSelect", {
            agendamento:{

                ...route.params.agendamento, //Passando todas as informacoes contidas no route.params.agendamento
                ...clinica
                
            }
        })
    }


    // Função para cancelar a consulta
    const clinicSelect = async () => {

        setLoading(true);

        if (selected != '') {
            try {

                await new Promise(resolve => setTimeout(resolve, 800));
                handleContinue();
                setLoading(false);
    
            } catch (error) {
                console.error("Erro ao cancelar consulta:", error);
                setLoading(false);
                setSelected('')
            }
        }
        else{
            alert("Favor selecionar uma clinica para consulta!")
            setLoading(false);
        }
    };
    


    // async function ListClinic() {
    //     await api.get('/Clinica/ListarTodas')
    //         .then(response => {
    //             setClinicData(response.data)
    //         }).catch(error => {
    //             console.log(error);
    //         })
    // }

    async function ListClinic() {
        await api.get(`/Clinica/BuscarPorCidade?cidade=${route.params.agendamento.localizacao}`)
        .then((response) => {
            setClinicData(response.data)
        })
        .catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        ListClinic();
    }, [])


    return (
        <Container>

            <ContainerWithMargin>

                <Title>Selecionar clínica</Title>

            </ContainerWithMargin>


            <ContainerScrollWithMargin>

                <ListComponent
                    data={clinicData}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) =>
                        <CardClinicSelect
                            onPress={() => {setSelected(item.id)}}

                            select={selected}

                            clinica={item}
                            setClinica={setClinica}

                            id={item.id}
                            name={item.nomeFantasia}
                            adress={item.endereco.logradouro}
                            adressNumber={item.endereco.numero}
                        />}
                />



            </ContainerScrollWithMargin>

            <LoadingButton
                onPress={clinicSelect}
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