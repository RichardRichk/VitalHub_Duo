import { Modal } from "react-native";
import { Title } from "../Title/Style"
import { ButtonAppointmentLevel, ButtonScheduleModal, ButtonSecondary, ButtonSecondaryTitle, TextButton } from "../Button/Style";
import { InputLabel, InputScheduleModal } from "../Input/Style";
import { ButtonAppointmentLevelUrgency, ModalContainer, ModalContent, TextButtonAppointment } from "./Style";
import { ScheduleModalView } from "../Container/Style";
import { useState } from "react";
import LoadingButton from "../../utils/LoadingButton";

const ScheduleModal = ({ navigation, visible, setShowScheduleModal,userId, ...rest }) => {

    const [loading, setLoading] = useState(false);

    const nivelConsulta = [
        {id:'1FB33A47-431D-405E-852B-A885FC02CFF4', tipo:"Rotina"},
        {id:'8F411990-C076-423E-8418-764F73D117ED', tipo:"Exame"},
        {id:'EFFE6247-D610-4701-83BB-6AA9A6DACD25', tipo:"Urgencia"}
    ]

    const [agendamento, setAgendamento] = useState(null);

    async function handleContinue() {
        setShowScheduleModal(false);

        navigation.replace("ClinicSelect", {agendamento : agendamento})    
    }
    
    const scheduleModal = async () => {
        setLoading(true);
        try {

            await new Promise(resolve => setTimeout(resolve, 800));
            setLoading(false);
            handleContinue();

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
                        {nivelConsulta.map( (item, index) => {
                            return(

                        <ButtonAppointmentLevel
                                key={item.id}
                                onPress={() => setAgendamento({
                                    ...agendamento,

                                    prioridadeId: item.id,
                                    prioridadeLabel: item.tipo,
                                    userId
                                })}

                                optionSelected={
                                    agendamento
                                    ? agendamento.prioridadeId = item.id
                                    : false
                                }
                        >
                            <TextButtonAppointment
                            
                            optionSelected={
                                agendamento
                                ? agendamento.prioridadeId = item.id
                                : false
                            }

                            >{item.tipo}</TextButtonAppointment>

                        </ButtonAppointmentLevel>
                            )
                        })}

                    </ScheduleModalView>

                    <InputLabel>Informe a localização desejada</InputLabel>
                    <InputScheduleModal
                        placeholder="Informe a localização"

                        value={agendamento ? agendamento.localizacao : null}
                        onChangeText={(txt) => setAgendamento({
                            ...agendamento, //Mantendo as informacoes dentro de agendamento
                            localizacao: txt
                        })}
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