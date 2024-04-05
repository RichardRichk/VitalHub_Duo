import { Button, ButtonPhoto, ButtonSecondary, ButtonSecondaryTitle, ButtonWithMargin, TextButton } from "../../components/Button/Style"
import { Container, ContainerScroll, DoubleView } from "../../components/Container/Style"
import { HeaderPhoto, HeaderPhotoContainer } from "../../components/HeaderPhoto/Style"
import { Input, InputFormNotEditable, InputFormRequire, InputLabel } from "../../components/Input/Style"
import { ModalFormRequire } from "../../components/Modal/Style"
import { SubTitle, Title } from "../../components/Title/Style"
import { AntDesign } from "@expo/vector-icons"
import { ButtonSecondaryForm, ButtonSecondaryFormTitle, HR } from "./Style"
import { useState } from "react"
import { CameraComp } from "../../components/Camera/Camera"
import LoadingButton from "../../utils/LoadingButton"

export const FormRequire = ({ navigation }) => {

    const [userType, setuserType] = useState("Doctor");
    const image = require("../../assets/Images/ProfilePic.png");
    const [showCamera, setShowCamera] = useState(false);
    const [uriCameraCapture, setUriCameraCapture] = useState(null);

    const [loading, setLoading] = useState(false);

    // Função para cancelar a consulta
    const formRequire = async () => {
        setLoading(true);
        try {

            await new Promise(resolve => setTimeout(resolve, 800));
            navigation.replace("")
            setLoading(false);

        } catch (error) {
            console.error("Erro ao cancelar consulta:", error);
            setLoading(false);
        }
    };

    return (
        <Container>

            <HeaderPhotoContainer>
                <HeaderPhoto
                    source={image}
                />
            </HeaderPhotoContainer>

            <ModalFormRequire >
                <Title>Richard Kosta</Title>
                <SubTitle>richard.kosta@gmail.com</SubTitle>
            </ModalFormRequire>

            <ContainerScroll>

                <InputLabel>Descrição da consulta</InputLabel>
                <InputFormRequire
                    placeholder="Descrição"
                />


                <InputLabel>Diagnóstico do paciente</InputLabel>
                <Input
                    placeholder="Diagnóstico"
                />


                <InputLabel>Prescrição médica</InputLabel>
                <InputFormRequire
                    placeholder="Prescrição medica"
                />

                <LoadingButton
                    onPress={formRequire}
                    disabled={loading}
                    loading={loading}
                    text="Salvar"
                />

                <ButtonWithMargin>
                    <TextButton>Editar </TextButton>
                </ButtonWithMargin>

                <ButtonSecondary onPress={() => navigation.navigate("Home")}>
                    <ButtonSecondaryTitle>Cancelar </ButtonSecondaryTitle>
                </ButtonSecondary>


                {/* Conteudo Da Consultas Doutor */}

                {
                    userType == "Paciente" ? (
                        <>
                        </>
                    ) : (
                        <>
                            <InputLabel>Exames médicos</InputLabel>
                            {
                                uriCameraCapture == null ? (
                                    <>
                                        <InputFormNotEditable
                                            placeholder="               Nenhuma foto informada"
                                        />
                                    </>
                                ) : (
                                    <>
                                        <InputFormNotEditable
                                            placeholder="               Nenhuma foto informada"
                                        />
                                    </>
                                )
                            }

                            <DoubleView>

                                <ButtonPhoto onPress={() => {
                                    setShowCamera(true);
                                }}>
                                    <TextButton>
                                        <AntDesign
                                            name="camera"
                                            size={24}
                                        />
                                    </TextButton>

                                    <TextButton>Enviar</TextButton>

                                </ButtonPhoto>

                                <CameraComp
                                    visible={showCamera}
                                    setUriCameraCapture={setUriCameraCapture}
                                    setShowCamera={setShowCamera}
                                />


                                <ButtonSecondaryForm onPress={() => navigation.replace("Home")}>
                                    <ButtonSecondaryFormTitle>Cancelar</ButtonSecondaryFormTitle>
                                </ButtonSecondaryForm>

                            </DoubleView>

                            <HR />

                            <InputFormNotEditable
                                placeholder="Resultado do exame de sangue: tudo normal "
                            />

                            <ButtonSecondary onPress={() => navigation.replace("Main")}>
                                <ButtonSecondaryTitle>Voltar</ButtonSecondaryTitle>
                            </ButtonSecondary>
                        </>

                    )
                }

            </ContainerScroll>

        </Container>
    );

};