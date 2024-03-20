import { Title } from "../../components/Title/Style"
import { Container, ContainerWithMargin } from "../../components/Container/Style"
import { ContainerScrollWithMargin } from "./Style"
import { ListComponent } from "../../components/List/List"
import { Button, ButtonSecondary, ButtonSecondaryTitle, TextButton } from "../../components/Button/Style"
import { useState } from "react"
import { CardDoctorSelect } from "../../components/CardDoctorSelect/CardDoctorSelect"

export const DoctorSelect = ({navigation}) => {

    const [selected, setSelected] = useState('');

    const doctorData = [
        {id: 1, name: "Dra Alessandra", specialty: "Demartologa, Esteticista"},
        {id: 2, name: "Dra Alessandra", specialty: "Demartologa, Esteticista"},
        {id: 3, name: "Dra Alessandra", specialty: "Demartologa, Esteticista"},
        {id: 4, name: "Dra Alessandra", specialty: "Demartologa, Esteticista"},
        {id: 5, name: "Dra Alessandra", specialty: "Demartologa, Esteticista"},
        {id: 6, name: "Dra Alessandra", specialty: "Demartologa, Esteticista"},
        {id: 7, name: "Dra Alessandra", specialty: "Demartologa, Esteticista"},
        {id: 8, name: "Dra Alessandra", specialty: "Demartologa, Esteticista"},
        {id: 9, name: "Dra Alessandra", specialty: "Demartologa, Esteticista"},
    ]

    return(
        <Container>

            <ContainerWithMargin>

                <Title>Selecionar médico</Title>

            </ContainerWithMargin>
            

        <ContainerScrollWithMargin>

            <ListComponent
                data={doctorData}
                renderItem={({item})  =>
                <CardDoctorSelect
                    onPress={() => setSelected(item.id)}
                    select={selected}
                    id={item.id}
                    image={item.image}
                    name={item.name}
                    specialty={item.specialty}
                />}
            />



        </ContainerScrollWithMargin>

            <Button onPress={() => navigation.navigate("CalendarScreen")}>
                <TextButton>Continuar </TextButton>
            </Button>

            <ButtonSecondary onPress={() => navigation.replace("Main")}>
                <ButtonSecondaryTitle>Cancelar</ButtonSecondaryTitle>
            </ButtonSecondary>

        </Container>

    )

}