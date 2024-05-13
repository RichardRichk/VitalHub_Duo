import { Button, ButtonPhoto, ButtonSecondary, ButtonSecondaryTitle, ButtonWithMargin, TextButton } from "../../components/Button/Style"
import { Container, ContainerScroll, DoubleView } from "../../components/Container/Style"
import { HeaderPhoto, HeaderPhotoContainer } from "../../components/HeaderPhoto/Style"
import { Input, InputFormNotEditable, InputFormRequire, InputLabel } from "../../components/Input/Style"
import { ModalFormRequire } from "../../components/Modal/Style"
import { SubTitle, Title } from "../../components/Title/Style"
import { AntDesign } from "@expo/vector-icons"
import { ButtonSecondaryForm, ButtonSecondaryFormTitle, HR, ImageForm } from "./Style"
import { useEffect, useState } from "react"
import { CameraComp } from "../../components/Camera/Camera"
import LoadingButton from "../../utils/LoadingButton"
import api from "../../Service/Service"

export const FormRequire = ({ navigation, route }) => {

    const { profileData, idConsulta } = route.params;

    const [showCamera, setShowCamera] = useState(false);
    const [uriCameraCapture, setUriCameraCapture] = useState(null);

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState(null);

    const [userType, setUserType] = useState(null);

    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [userPhoto, setUserPhoto] = useState('')

    const [descricao, setDescricao] = useState(null);
    const [diagnostico, setDiagnostico] = useState(null);
    const [recipe, setRecipe] = useState(null);

    const [newRecipe, setNewRecipe] = useState(null);
    const [newDescricao, setNewDescricao] = useState(null);
    const [newDiagnostic, setNewDiagnostic] = useState(null);

    useEffect(() => {

        takeFormData();
        setUserType(profileData.role);
        setName(profileData.name);
        setEmail(profileData.email)
        console.log(profileData);

    }, [profileData])

    useEffect(() => {
        if (uriCameraCapture) {
            InsertExam();
        }
    }, [uriCameraCapture])

    async function takeFormData() {
        try {
            const response = await api.get(`/Consultas/BuscarPorId?id=${idConsulta}`);
            setFormData(response.data);
            setDescricao(response.data.descricao);
            setDiagnostico(response.data.diagnostico);
            setRecipe(response.data.receita.medicamento);

            if (profileData.role == "Paciente") {
                setUserPhoto(response.data.paciente.idNavigation.foto);
            }
            else {
                setUserPhoto(response.data.medicoClinica.medico.idNavigation.foto)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const formRequire = async () => {
        setLoading(true);
        try {

            await new Promise(resolve => setTimeout(resolve, 800));
            EditForm();

        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    async function InsertExam() {
        const formData = new FormData();
        formData.append("ConsultaId", idConsulta);
        formData.append("Imagem", {
            uri: uriCameraCapture,
            name: `image.${uriCameraCapture.split(".").pop()}`,
            type: `image/${uriCameraCapture.split(".").pop()}`
        }

        )
        await api.post(`/Exame/Cadastrar`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(response => {
            setDescricao(descricao + "\n" + response.data.descricao)
        }).catch(error => {
            console.log(error);
        })
    }

    async function EditForm() {
        try {
            const response = await api.put(`/Consultas/Prontuario`, {
                consultaId: idConsulta,
                medicamento: newRecipe,
                descricao: newDescricao,
                diagnostico: newDiagnostic,
            });

            setDescricao(response.data.descricao);
            setDiagnostico(response.data.diagnostico);
            setLoading(false);
            setIsEditing(false);
            
        } catch (error) {
            console.log(error);
            console.log("Erro ao ediar Form");
        }
    }




    return (
        <Container>

            <HeaderPhotoContainer>
                <HeaderPhoto
                    source={{ uri: userPhoto }}
                />
            </HeaderPhotoContainer>

            <ModalFormRequire >
                <Title>{name}</Title>
                <SubTitle>{email}</SubTitle>
            </ModalFormRequire>

            <ContainerScroll>

                <InputLabel>Descrição da consulta</InputLabel>
                <InputFormRequire
                    placeholder={descricao ? descricao : 'Sem Descricao'}
                    editable={isEditing}
                    value={newDescricao}
                    onChangeText={setNewDescricao}
                />


                <InputLabel>Diagnóstico do paciente</InputLabel>
                <Input
                    placeholder={diagnostico ? diagnostico : 'Sem Diagnostico'}
                    editable={isEditing}
                    value={newDiagnostic}
                    onChangeText={setNewDiagnostic}
                />


                <InputLabel>Prescrição médica</InputLabel>
                <InputFormRequire
                    placeholder={recipe}
                    editable={isEditing}
                    value={newRecipe}
                    onChangeText={setNewRecipe}
                />


                {userType != "Paciente" && isEditing == false && (

                    <ButtonWithMargin onPress={() => { setIsEditing(!isEditing) }}>
                        <TextButton>Editar </TextButton>
                    </ButtonWithMargin>
                )}

                {isEditing == true && (

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
                                    <ImageForm
                                        source={{ uri: uriCameraCapture }}
                                    />
                                </>
                            )
                        }

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
                            getMediaLibrary={true}
                        />

                        <LoadingButton
                            onPress={formRequire}
                            disabled={loading}
                            loading={loading}
                            text="Salvar"
                        />
                    </>
                )}


                <ButtonSecondary onPress={() => navigation.navigate("Main")}>
                    <ButtonSecondaryTitle>Cancelar </ButtonSecondaryTitle>
                </ButtonSecondary>


                {/* Conteudo Da Consultas Doutor */}



            </ContainerScroll>

        </Container>
    );

};