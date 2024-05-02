import { Modal } from "react-native"
import { ModalContainerConfirm, ModalContentConfirm } from "./Style"
import { SubTitle, SubTitleDataModal, Title } from "../Title/Style"
import { InputLabel } from "../Input/Style"
import { ButtonSecondary, ButtonSecondaryTitle, ButtonWithMargin, TextButton } from "../Button/Style"
import { useEffect, useState } from "react"
import LoadingButton from "../../utils/LoadingButton"
import moment from "moment"
import api from "../../Service/Service"

export const ConfirmScheduleModal = ({ navigation, dataConsulta, agendamento, visible, setShowModalConfirmAppointment, id, AppointmentDate, DoctorName, Specialty, LocalAppointment, AppointmentType, ...rest }) => {

    const [loading, setLoading] = useState(false);

    // Função para cancelar a consulta
    const confirmScheduleModal = async () => {
        setLoading(true);
        try {

            await new Promise(resolve => setTimeout(resolve, 800));
            
            


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

    console.log("Confirmar Consulta", agendamento);

    async function ConfirmarConsulta(){
        console.log("Confirmar Consulta");
        await api.post("/Consultas/Cadastrar", {
            ...agendamento,
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
        profileLoad();
        console.log(agendamento.userId);
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
                    <SubTitleDataModal>{agendamento.medicoLabel}</SubTitleDataModal>

                    <InputLabel>Local da consulta:</InputLabel>
                    <SubTitleDataModal>{agendamento.localizacao}</SubTitleDataModal>

                    <InputLabel>Tipo da consulta:</InputLabel>
                    <SubTitleDataModal>{agendamento.prioridadeLabel}</SubTitleDataModal>


                    <LoadingButton
                        onPress={()=> ConfirmarConsulta()}
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