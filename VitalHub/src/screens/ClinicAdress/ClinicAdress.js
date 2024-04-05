import { useEffect, useState } from "react"
import { ButtonSecondary, ButtonSecondaryTitle } from "../../components/Button/Style"
import { BoxInput, Container, ContainerScroll, ContainerWithMargin, DoubleView } from "../../components/Container/Style"
import { InputDouble, InputLabel, InputNotEditable } from "../../components/Input/Style"
import { Map } from "../../components/Map/Map"
import { SubTitle, Title } from "../../components/Title/Style"
import { MapImage } from "./Style"
import api from "../../Service/Service"
import { ActivityIndicator } from "react-native"

export const ClinicAdress = ({ navigation, route }) => {

    const [clinica, setClinica] = useState(null)

    useEffect(() => {
        if (clinica == null) {

            console.log(route);
            SearchClinic();
        }
    }, [clinica])

    async function SearchClinic() {

        await api.get(`/Clinica/BuscarPorId?id=${route.params.clinicaid}`) //Olhar a rota de route.params
            .then(response => {
                setClinica(response.data)

                console.log(response.data);
            }).catch(error => {

            })
    }

    return (
        <>
            {clinica !== null ? (
                <>
                    <Map />

                    <Container>

                        <Title>Clínica Natureh</Title>
                        <SubTitle>São Paulo, SP</SubTitle>

                        <ContainerScroll>

                            <InputLabel>Endereço</InputLabel>
                            <InputNotEditable
                                placeholder="Rua Vicenso Silva, 987"
                            />

                            <DoubleView>


                                <BoxInput>
                                    <InputLabel>Número</InputLabel>
                                    <InputDouble
                                        placeholder="578"
                                    />
                                </BoxInput>

                                <BoxInput>
                                    <InputLabel>Bairro</InputLabel>
                                    <InputDouble
                                        placeholder="Moema-SP"
                                    />
                                </BoxInput>
                            </DoubleView>



                        </ContainerScroll>

                        <ButtonSecondary onPress={() => navigation.navigate('Home')}>
                            <ButtonSecondaryTitle>Voltar</ButtonSecondaryTitle>
                        </ButtonSecondary>
                    </Container>
                </>
            ) : (
                <>
                    <ActivityIndicator />
                </>
            )}

        </>
    )
}
