import { Modal } from "react-native"
import { ModalContainerConfirm, ModalContentConfirm } from "./Style"
import { SubTitle, SubTitleDataModal, Title } from "../Title/Style"
import { InputLabel } from "../Input/Style"
import { ButtonSecondary, ButtonSecondaryTitle, ButtonWithMargin, TextButton } from "../Button/Style"
import { useEffect, useState } from "react"
import LoadingButton from "../../utils/LoadingButton"
import moment from "moment"
import api from "../../Service/Service"
import { userDecodeToken } from "../../utils/Auth"

export const ConfirmScheduleModal = ({ navigation, route, dataConsulta, agendamento, visible, setShowModalConfirmAppointment, id, AppointmentDate, DoctorName, Specialty, LocalAppointment, AppointmentType, ...rest }) => {

    const [loading, setLoading] = useState(false);
    const [profile, setProfile] = useState()

    // Função para cancelar a consulta
    const confirmScheduleModal = async () => {
        setLoading(true);
        try {

            await new Promise(resolve => setTimeout(resolve, 800));
            ConfirmarConsulta()

        } catch (error) {
            console.error("Erro ao cancelar consulta:", error);
            setLoading(false);
        }
    };

    async function profileLoad(){
        const token = await userDecodeToken();

        if(token){
            setProfile(token.jti)
        }
    }


    async function ConfirmarConsulta(){
        console.log("Confirmar Consulta", route);
        await api.post("/Consultas/Cadastrar", {
            ...route,
            pacienteId : profile,
            situacaoId : `612893C7-CBCA-4C96-9CB9-2D9C5E78EFF2`


        }).then(async response =>{
            await setShowModalConfirmAppointment(false)

            setLoading(false);
            navigation.replace("Main")
        }).catch(error => {
            console.log(error);
        })
    }

    useEffect(() =>{
        profileLoad()
    }, [])

    return (
        <Modal {...rest} visible={visible} transparent={true}>
            <ModalContainerConfirm>

                <ModalContentConfirm>

                    <Title>Agendar consulta</Title>
                    <SubTitle>Consulte os dados selecionados para a sua consulta</SubTitle>

                    <InputLabel>Data da consulta:</InputLabel>
                    <SubTitleDataModal>{moment(route.dataConsulta).format('DD/MM/YYYY, hh:mm')}</SubTitleDataModal>

                    <InputLabel>Médico(a) da consulta:</InputLabel>
                    <SubTitleDataModal>{route.medicoLabel}</SubTitleDataModal>

                    <InputLabel>Local da consulta:</InputLabel>
                    <SubTitleDataModal>{route.localizacao}</SubTitleDataModal>

                    <InputLabel>Tipo da consulta:</InputLabel>
                    <SubTitleDataModal>{route.prioridadeLabel}</SubTitleDataModal>


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