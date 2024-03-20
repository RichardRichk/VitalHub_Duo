import { Title } from "../../components/Title/Style"
import { CardClinicSelect } from "../../components/CardClinicSelect/CardClinicSelect"
import { Container, ContainerWithMargin } from "../../components/Container/Style"
import { ContainerScrollWithMargin } from "./Style"
import { ListComponent } from "../../components/List/List"
import { Button, ButtonSecondary, ButtonSecondaryTitle, TextButton } from "../../components/Button/Style"
import { useState } from "react"

export const ClinicSelect = ({navigation}) => {

    const [selected, setSelected] = useState('');

    const clinicData = [
        { id: 1, name: "Clínica Natureh", adress: "São Paulo, SP", rating: "4.6", days: "Seg-Sex" },
        { id: 2, name: "Diamond Pró-Mulhe", adress: "Vila Mariana, SP", rating: "4.8", days: "Seg-Sex" },
        { id: 3, name: "Clinica Villa Lobos", adress: "São Paulo, SP", rating: "3.6", days: "Seg-Sex" },
        { id: 4, name: "SP Oncologia Clínica", adress: "Rio de Janeiro, RJ", rating: "4.6", days: "Seg-Sex" },
        { id: 5, name: "Clínica Poseidon", adress: "Olimpia, SP", rating: "4.9", days: "Seg-Sex" },
        { id: 6, name: "Clínica Atlas", adress: "São Paulo, SP", rating: "5.0", days: "Seg-Sex" },
        { id: 7, name: "Clínica Athena", adress: "Olimpo, GK", rating: "2.6", days: "Seg-Sex" },
        { id: 8, name: "Clínica Hades", adress: "Olimpo, GK", rating: "5.0", days: "Seg-Sex" },
        { id: 9, name: "Clínica Zeus", adress: "Olimpo, GK", rating: "4.2", days: "Seg-Sex" },
    ]

    return(
        <Container>

            <ContainerWithMargin>

                <Title>Selecionar clínica</Title>

            </ContainerWithMargin>
            

        <ContainerScrollWithMargin>

            <ListComponent
                data={clinicData}
                renderItem={({item})  =>
                <CardClinicSelect
                    onPress={() => setSelected(item.id)}
                    select={selected}
                    id={item.id}
                    name = {item.name}
                    adress={item.adress}
                    rating={item.rating}
                    days={item.days}
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