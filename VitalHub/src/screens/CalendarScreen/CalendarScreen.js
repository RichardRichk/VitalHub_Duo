import { useEffect, useState } from "react";
import { Button, ButtonSecondary, ButtonSecondaryTitle, TextButton } from "../../components/Button/Style";
import { CalendarChoose } from "../../components/CalendarChoose/CalendarChoose";
import { InputSelect } from "../../components/Input/InputSelect";
import { InputLabel } from "../../components/Input/Style";
import { Title } from "../../components/Title/Style";
import { ContainerCalendar, ContainerSelect } from "./Style";
import { ConfirmScheduleModal } from "../../components/ConfirmScheduleModal/ConfirmScheduleModal";
import { ListComponent } from "../../components/List/List";
import LoadingButton from "../../utils/LoadingButton";

export const CalendarScreen = ({ navigation, route, onValueChange }) => {


    const [agendamento, setAgendamento] = useState(null);
    const [dataSelecionada, setDataSelecionada] = useState("");
    const [horaSelecionada, setHoraSelecionada] = useState("");

    const [showModalConfirmAppointment, setShowModalConfirmAppointment] = useState(false);

    function handleContinue(){
        console.log(route);
        setAgendamento({
            ...route.params.agendamento,
            dataConsulta : `${dataSelecionada} ${horaSelecionada}`
        });
    }

    const ConfirmScheduleData = [
        { id: 1, AppointmentDate: "1 de Novembro de 2024", DoctorName: "Dra Alessandra", Specialty: "Demartologa, Esteticist", LocalAppointment:"São Paulo, SP", AppointmentType: "Rotina" },
    ]

    const [loading, setLoading] = useState(false);

    // Função para cancelar a consulta
    const calendarScreen = async () => {
        setLoading(true);
        try {

            await new Promise(resolve => setTimeout(resolve, 800));
            setLoading(false);
            
            await handleContinue();
            setShowModalConfirmAppointment(true);

        } catch (error) {
            console.error("Erro ao cancelar consulta:", error);
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


            <ListComponent
                renderItem={({item})  =>
                {agendamento && (
                <ConfirmScheduleModal
                    agendamento={agendamento}
                    visible={showModalConfirmAppointment}
                    setShowModalConfirmAppointment={setShowModalConfirmAppointment}
                    navigation={navigation}
                    id={item.id}
                    AppointmentDate={item.AppointmentDate}
                    DoctorName={item.DoctorName}
                    Specialty={item.Specialty}
                    LocalAppointment={item.LocalAppointment}
                    AppointmentType={item.AppointmentType}
                />)}}
            />
            </ContainerCalendar>
    )
}