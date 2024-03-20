import { Modal } from "react-native"
import { ModalContainerConfirm, ModalContentConfirm } from "./Style"
import { SubTitle, SubTitleDataModal, Title } from "../Title/Style"
import { InputLabel } from "../Input/Style"
import { ButtonSecondary, ButtonSecondaryTitle, ButtonWithMargin, TextButton } from "../Button/Style"

export const ConfirmScheduleModal = ({navigation, visible, setShowModalConfirmAppointment, id, AppointmentDate, DoctorName, Specialty, LocalAppointment, AppointmentType,...rest}) => {
    return(
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

                <ButtonWithMargin onPress={() => navigation.replace("Main")}>
                    <TextButton>Confirmar</TextButton>
                </ButtonWithMargin>

                <ButtonSecondary onPress={() => {setShowModalConfirmAppointment(false); navigation.replace("Main")}}>
                    <ButtonSecondaryTitle>Cancelar</ButtonSecondaryTitle>
                </ButtonSecondary>

                </ModalContentConfirm>

            </ModalContainerConfirm>
        </Modal>
    )
}