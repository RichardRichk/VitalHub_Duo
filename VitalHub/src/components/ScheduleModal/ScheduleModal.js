import { Modal } from "react-native";
import { Title } from "../Title/Style"
import { ButtonAppointmentLevel, ButtonScheduleModal, ButtonSecondary, ButtonSecondaryTitle, TextButton } from "../Button/Style";
import { InputLabel, InputScheduleModal } from "../Input/Style";
import { ButtonAppointmentLevelUrgency, ModalContainer, ModalContent, TextButtonAppointment } from "./Style";
import { ScheduleModalView } from "../Container/Style";
import { useState } from "react";
import LoadingButton from "../../utils/LoadingButton";

const ScheduleModal = ({ navigation, visible, setShowScheduleModal, ...rest }) => {

    const [loading, setLoading] = useState(false);

    
    const scheduleModal = async () => {
        setLoading(true);
        try {

            await new Promise(resolve => setTimeout(resolve, 800));
            navigation.replace("ClinicSelect")
            setLoading(false);
            setShowScheduleModal(false);
        } catch (error) {
            console.error("Erro ao cancelar consulta:", error);
            setLoading(false);
        }
    };

    return (
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

                    <LoadingButton
                        onPress={scheduleModal}
                        disabled={loading}
                        loading={loading}
                        text="Continuar"
                    />

                    <ButtonSecondary onPress={() => { setShowScheduleModal(false) }}>
                        <ButtonSecondaryTitle>Cancelar</ButtonSecondaryTitle>
                    </ButtonSecondary>

                </ModalContent>
            </ModalContainer>
        </Modal>
    );
};

export default ScheduleModal;