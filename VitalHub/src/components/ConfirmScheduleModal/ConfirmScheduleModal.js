import { Modal } from "react-native"
import { ModalContainerConfirm, ModalContentConfirm } from "./Style"
import { SubTitle, SubTitleDataModal, Title } from "../Title/Style"
import { InputLabel } from "../Input/Style"
import { ButtonSecondary, ButtonSecondaryTitle, ButtonWithMargin, TextButton } from "../Button/Style"
import { useEffect, useState } from "react"
import LoadingButton from "../../utils/LoadingButton"
import moment from "moment"

export const ConfirmScheduleModal = ({ navigation, dataConsulta, agendamento, visible, setShowModalConfirmAppointment, id, AppointmentDate, DoctorName, Specialty, LocalAppointment, AppointmentType, ...rest }) => {

    const [loading, setLoading] = useState(false);

    // Função para cancelar a consulta
    const confirmScheduleModal = async () => {
        setLoading(true);
        try {

            await new Promise(resolve => setTimeout(resolve, 800));
            navigation.replace("Main")
            setLoading(false);
            ConfirmarConsulta();


        } catch (error) {
            console.error("Erro ao cancelar consulta:", error);
            setLoading(false);
        }
    };

    async function profileLoad(){
        const token = await userDecodeToken();

        if(token){
            setProfile(token)
        }
    }

    async function ConfirmarConsulta(){
        await api.post("/Consultas/Cadastrar", {
            ...agendamento,
            pacienteId : profile.user,
            situacaoId : `612893C7-CBCA-4C96-9CB9-2D9C5E78EFF2`


        }).then(async response =>{
            await setShowModalConfirmAppointment

            navigation.replace("Main")
        }).catch(error => {
            console.log(error);
        })
    }

    useEffect(() =>{
        profileLoad();
    }, [])

    return (
        <Modal {...rest} visible={visible} transparent={true}>
            <ModalContainerConfirm>

                <ModalContentConfirm>

                    <Title>Agendar consulta</Title>
                    <SubTitle>Consulte os dados selecionados para a sua consulta</SubTitle>

                    <InputLabel>Data da consulta:</InputLabel>
                    <SubTitleDataModal>{moment(agendamento.dataConsulta).format('DD/MM/YYYY, hh:mm')}</SubTitleDataModal>

                    <InputLabel>Médico(a) da consulta:</InputLabel>
                    <SubTitleDataModal>{DoctorName}</SubTitleDataModal>
                    <SubTitleDataModal>{Specialty}</SubTitleDataModal>

                    <InputLabel>Local da consulta:</InputLabel>
                    <SubTitleDataModal></SubTitleDataModal>

                    <InputLabel>Tipo da consulta:</InputLabel>
                    <SubTitleDataModal>{agendamento.propriedadeLabel}</SubTitleDataModal>

                    {/* {moment(agendamento.dataConsulta).format('DD/MM/YYYY')} */}

                    <LoadingButton
                        onPress={confirmScheduleModal}
                        disabled={loading}
                        loading={loading}
                        text="Continuar"
                    />

                    <ButtonSecondary onPress={() => { setShowModalConfirmAppointment(false); navigation.replace("Main") }}>
                        <ButtonSecondaryTitle>Cancelar</ButtonSecondaryTitle>
                    </ButtonSecondary>

                </ModalContentConfirm>

            </ModalContainerConfirm>
        </Modal>
    )
}