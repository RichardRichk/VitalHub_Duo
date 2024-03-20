import { Modal } from "react-native";
import { Title } from "../Title/Style"
import { ButtonAppointmentLevel, ButtonScheduleModal, ButtonSecondary, ButtonSecondaryTitle, TextButton } from "../Button/Style";
import { InputLabel, InputScheduleModal } from "../Input/Style";
import { ButtonAppointmentLevelUrgency, ModalContainer, ModalContent, TextButtonAppointment } from "./Style";
import { ScheduleModalView } from "../Container/Style";

const ScheduleModal = ({navigation, visible, setShowScheduleModal, ...rest}) => {

    return(
        <Modal {...rest} visible={visible} transparent={true}>
            <ModalContainer>
                <ModalContent>
                    
                    <Title>Agendar Consulta</Title>

                    <InputLabel>Qual o nível da consulta:</InputLabel>
                    <ScheduleModalView>
                    <ButtonAppointmentLevel>
                        <TextButtonAppointment>Rotina</TextButtonAppointment>
                    </ButtonAppointmentLevel>
                    
                    <ButtonAppointmentLevel>
                        <TextButtonAppointment>Exame</TextButtonAppointment>
                    </ButtonAppointmentLevel>
                        
                    <ButtonAppointmentLevelUrgency>
                        <TextButtonAppointment>Urgência </TextButtonAppointment>
                    </ButtonAppointmentLevelUrgency>
                    
                    </ScheduleModalView>

                    <InputLabel>Informe a localização desejada</InputLabel>
                    <InputScheduleModal
                        placeholder="Informe a localização"
                    />

                    <ButtonScheduleModal onPress={() => {setShowScheduleModal(false); navigation.navigate("ClinicSelect")}}>
                        <TextButton>Continuar </TextButton>
                    </ButtonScheduleModal>

                    <ButtonSecondary onPress={() => {setShowScheduleModal(false)}}>
                        <ButtonSecondaryTitle>Cancelar</ButtonSecondaryTitle>
                    </ButtonSecondary>

                </ModalContent>
            </ModalContainer>
        </Modal>
    );
};

export default ScheduleModal;