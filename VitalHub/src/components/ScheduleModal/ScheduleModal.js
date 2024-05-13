import { Modal } from "react-native";
import { Title } from "../Title/Style"
import { ButtonScheduleModal, ButtonSecondary, ButtonSecondaryTitle, TextButton } from "../Button/Style";
import { InputLabel, InputScheduleModal } from "../Input/Style";
import { ButtonAppointmentLevel, ModalContainer, ModalContent, TextButtonAppointment } from "./Style";
import { ScheduleModalView } from "../Container/Style";
import { useState } from "react";
import LoadingButton from "../../utils/LoadingButton";

const ScheduleModal = ({ navigation, visible, setShowScheduleModal,userId, ...rest }) => {

    const [loading, setLoading] = useState(false);

    const [click, setClick] = useState("");

    const [agendamento, setAgendamento] = useState(null);

    const [localizacao, setLocalizacao] = useState(null);

    const [prioridade, setPrioridade] = useState(null);


    // Nivel 0
    const Rotina = { id: "1FB33A47-431D-405E-852B-A885FC02CFF4", tipo: "Rotina" }
    // Nivel 1
    const Exame = { id: "8F411990-C076-423E-8418-764F73D117ED", tipo: "Exame" }
    // Nivel 2
    const Urgencia = { id: "EFFE6247-D610-4701-83BB-6AA9A6DACD25", tipo: "Urgencia" }

    async function handleContinue() {
        setShowScheduleModal(false);

        navigation.replace("ClinicSelect", {agendamento : agendamento})    
    }
    
    const scheduleModal = async () => {
        setLoading(true);

        //VALIDACAO PARA PRIORIDADE CONSULTA
        if (prioridade !== null && localizacao !== null) {
            
            try {

                await new Promise(resolve => setTimeout(resolve, 800));
                setLoading(false);
                handleContinue();
    
            } catch (error) {
                console.error("Erro ao marcar prioridade", error);
                setLoading(false);
            }

        } else {
            alert("Selecione a prioridade e a localizacao para avancar");

            setPrioridade(null);
            setLocalizacao(localizacao);
            setClick(null);
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
                        
                        <ButtonAppointmentLevel
                            onPress={() => {setAgendamento({
                                ...agendamento,

                                prioridadeId: Rotina.id,
                                prioridadeLabel: Rotina.tipo,
                                userId
                            }), setClick("Rotina"), setPrioridade(Rotina.id), console.log(prioridade)}}

                            clickButton={click == "Rotina"}

                        >

                            <TextButtonAppointment clickButton={click == "Rotina"}>{Rotina.tipo}</TextButtonAppointment>

                        </ButtonAppointmentLevel>


                        <ButtonAppointmentLevel
                        onPress={() => {setAgendamento({
                            ...agendamento,

                            prioridadeId: Exame.id,
                            prioridadeLabel: Exame.tipo,
                            userId
                        }), setClick("Exame"), setPrioridade(Exame.id), console.log(prioridade)}}

                            clickButton={click == "Exame"}
                        >

                            <TextButtonAppointment clickButton={click == "Exame"}>{Exame.tipo}</TextButtonAppointment>

                        </ButtonAppointmentLevel>


                        <ButtonAppointmentLevel
                        
                        onPress={() => {setAgendamento({
                            ...agendamento,

                            prioridadeId: Urgencia.id,
                            prioridadeLabel: Urgencia.tipo,
                            userId
                        }), setClick("Urgencia"),setPrioridade(Urgencia.id), console.log(prioridade)}}

                        clickButton={click == "Urgencia"}
                        >

                            <TextButtonAppointment clickButton={click == "Urgencia"}>{Urgencia.tipo}</TextButtonAppointment>
                            
                        </ButtonAppointmentLevel>

                    </ScheduleModalView>

                    <InputLabel>Informe a localização desejada</InputLabel>
                    <InputScheduleModal
                        placeholder="Informe a localização"

                        value={agendamento ? agendamento.localizacao : null}
                        onChangeText={(txt) => {setAgendamento({
                            ...agendamento, //Mantendo as informacoes dentro de agendamento
                            localizacao: txt
                        }), setLocalizacao(txt), console.log(localizacao);}}
                    />

                    <LoadingButton
                        onPress={scheduleModal}
                        disabled={loading}
                        loading={loading}
                        text="Continuar"
                    />

                    <ButtonSecondary onPress={() => { setShowScheduleModal(false), setPrioridade(null), setLocalizacao(null), setClick(null) }}>
                        <ButtonSecondaryTitle>Cancelar</ButtonSecondaryTitle>
                    </ButtonSecondary>

                </ModalContent>
            </ModalContainer>
        </Modal>
    );
};

export default ScheduleModal;