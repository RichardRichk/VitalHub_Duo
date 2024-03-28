import { Title } from "../../components/Title/Style"
import { CardClinicSelect } from "../../components/CardClinicSelect/CardClinicSelect"
import { Container, ContainerWithMargin } from "../../components/Container/Style"
import { ContainerScrollWithMargin } from "./Style"
import { ListComponent } from "../../components/List/List"
import { Button, ButtonSecondary, ButtonSecondaryTitle, TextButton } from "../../components/Button/Style"
import { useEffect, useState } from "react"
import api from "../../Service/Service"

export const ClinicSelect = ({navigation}) => {

    const [selected, setSelected] = useState('');

    const[clinicData, setClinicData] = useState([]);
    
    async function ListClinic(){
        await api.get('/Clinica/ListarTodas')
        .then( response =>{
            setClinicData( response.data )
            console.log(response.data);
        } ). catch (error => {
            console.log(error);
        })
    }

    useEffect(() => {
        ListClinic();
    }, [])


    return(
        <Container>

            <ContainerWithMargin>

                <Title>Selecionar clínica</Title>

            </ContainerWithMargin>
            

        <ContainerScrollWithMargin>

            <ListComponent
                data={clinicData}
                keyExtractor={(item) => item.id}
                renderItem={({item})  =>
                <CardClinicSelect
                    onPress={() => setSelected(item.id)}
                    select={selected}
                    id={item.id}
                    name={item.nomeFantasia}
                    adress={item.endereco.logradouro}
                    adressNumber={item.endereco.numero}
                />}
            />



        </ContainerScrollWithMargin>

            <Button onPress={() => navigation.navigate("DoctorSelect")}>
                <TextButton>Continuar </TextButton>
            </Button>

            <ButtonSecondary onPress={() => navigation.replace("Main")}>
                <ButtonSecondaryTitle>Cancelar</ButtonSecondaryTitle>
            </ButtonSecondary>

        </Container>

    )

}