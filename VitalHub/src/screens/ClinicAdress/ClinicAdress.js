import { useEffect, useState } from "react"
import { ButtonSecondary, ButtonSecondaryTitle } from "../../components/Button/Style"
import { BoxInput, Container, ContainerScroll, DoubleView } from "../../components/Container/Style"
import { InputDouble, InputLabel, InputProfile} from "../../components/Input/Style"
import { Map } from "../../components/Map/Map"
import { SubTitle } from "../../components/Title/Style"
import api from "../../Service/Service"
import { ActivityIndicator } from "react-native"
import { TitleAdress } from "./Style"

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

                        <TitleAdress>{clinica.nomeFantasia}</TitleAdress>
                        <SubTitle>Mocado</SubTitle>

                        <ContainerScroll>

                            <InputLabel>Endereço</InputLabel>
                            <InputProfile
                                placeholder={clinica.endereco.logradouro}
                                editable={false}
                            />

                            <DoubleView>
                                <BoxInput>
                                    <InputLabel>Número</InputLabel>
                                    <InputDouble
                                        placeholder={`${clinica.endereco.numero}`}
                                    />
                                </BoxInput>

                                <BoxInput>
                                    <InputLabel>Bairro</InputLabel>
                                    <InputDouble
                                        placeholder="Mocado"
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
