import { Modal } from "react-native"
import { ModalContainerConfirm, ModalContentConfirm } from "./Style"
import { SubTitle, SubTitleDataModal, Title } from "../Title/Style"
import { InputLabel } from "../Input/Style"
import { ButtonSecondary, ButtonSecondaryTitle, ButtonWithMargin, TextButton } from "../Button/Style"
import { useState } from "react"
import LoadingButton from "../../utils/LoadingButton"

export const ConfirmScheduleModal = ({ navigation, visible, setShowModalConfirmAppointment, id, AppointmentDate, DoctorName, Specialty, LocalAppointment, AppointmentType, ...rest }) => {

    const [loading, setLoading] = useState(false);

    // Função para cancelar a consulta
    const confirmScheduleModal = async () => {
        setLoading(true);
        try {

            await new Promise(resolve => setTimeout(resolve, 800));
            navigation.replace("Main")
            setLoading(false);


        } catch (error) {
            console.error("Erro ao cancelar consulta:", error);
            setLoading(false);
        }
    };

    return (
        <Modal {...rest} visible={visible} transparent={true}>
            <ModalContainerConfirm>

                <ModalContentConfirm>

                    <Title>Agendar consulta</Title>
                    <SubTitle>Consulte os dados selecionados para a sua consulta</SubTitle>

                    <InputLabel>Data da consulta:</InputLabel>
                    <SubTitleDataModal>{AppointmentDate}</SubTitleDataModal>

                    <InputLabel>Médico(a) da consulta:</InputLabel>
                    <SubTitleDataModal>{DoctorName}</SubTitleDataModal>
                    <SubTitleDataModal>{Specialty}</SubTitleDataModal>

                    <InputLabel>Local da consulta:</InputLabel>
                    <SubTitleDataModal>{LocalAppointment}</SubTitleDataModal>

                    <InputLabel>Tipo da consulta:</InputLabel>
                    <SubTitleDataModal>{AppointmentType}</SubTitleDataModal>

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