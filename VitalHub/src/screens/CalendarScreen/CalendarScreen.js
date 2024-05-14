import { useEffect, useState } from "react";
import { Button, ButtonSecondary, ButtonSecondaryTitle, TextButton } from "../../components/Button/Style";
import { CalendarChoose } from "../../components/CalendarChoose/CalendarChoose";
import { InputSelect } from "../../components/Input/InputSelect";
import { InputLabel } from "../../components/Input/Style";
import { Title } from "../../components/Title/Style";
import { ContainerCalendar, ContainerSelect } from "./Style";
import { ConfirmScheduleModal } from "../../components/ConfirmScheduleModal/ConfirmScheduleModal";
import LoadingButton from "../../utils/LoadingButton";

export const CalendarScreen = ({ navigation, route}) => {


    const [agendamento, setAgendamento] = useState("");
    const [dataSelecionada, setDataSelecionada] = useState("");
    const [horaSelecionada, setHoraSelecionada] = useState("");

    const [showModalConfirmAppointment, setShowModalConfirmAppointment] = useState(false);
    

    function handleContinue() {
        setAgendamento({
            ...route.params.agendamento,
            dataConsulta: `${dataSelecionada} ${horaSelecionada}`
        });
    }

    const [loading, setLoading] = useState(false);


    const calendarScreen = async () => {
        setLoading(true);

        if (dataSelecionada != "" && horaSelecionada != "") {
            
            try {
    
                await new Promise(resolve => setTimeout(resolve, 800));
                setLoading(false);
    
                await handleContinue();
                setShowModalConfirmAppointment(true);
    
            } catch (error) {
                console.error("Erro ao cancelar consulta:", error);
                setLoading(false);
            }
        } else {

            alert("Favor selecionar uma data para a consulta!")
            setDataSelecionada("")
            setHoraSelecionada(horaSelecionada)
            setLoading(false); 
        }
    };


    return (
        <ContainerCalendar>

            <Title>Selecionar Data</Title>

            <CalendarChoose
                setDataSelecionada={setDataSelecionada}
                dataSelecionada={dataSelecionada}
            />

            <ContainerSelect>
                <InputLabel>Selecione um horário disponível:</InputLabel>

                <InputSelect
                    setHoraSelecionada={setHoraSelecionada}
                />
                
            </ContainerSelect>

            <LoadingButton
                onPress={calendarScreen}
                disabled={loading}
                loading={loading}
                text="Confirmar"
            />

            <ButtonSecondary onPress={() => navigation.replace("Main")}>
                <ButtonSecondaryTitle>Cancelar</ButtonSecondaryTitle>
            </ButtonSecondary>


            {/* {agendamento && ()} */}
                <ConfirmScheduleModal
                    visible={showModalConfirmAppointment}
                    setShowModalConfirmAppointment={setShowModalConfirmAppointment}
                    navigation={navigation}
                    agendamento={agendamento}
                />

        </ContainerCalendar>
    )
}