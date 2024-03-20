import { useState } from "react";
import { Button, ButtonSecondary, ButtonSecondaryTitle, TextButton } from "../../components/Button/Style";
import { CalendarChoose } from "../../components/CalendarChoose/CalendarChoose";
import { InputSelect } from "../../components/Input/InputSelect";
import { InputLabel } from "../../components/Input/Style";
import { Title } from "../../components/Title/Style";
import { ContainerCalendar, ContainerSelect } from "./Style";
import { ConfirmScheduleModal } from "../../components/ConfirmScheduleModal/ConfirmScheduleModal";
import { ListComponent } from "../../components/List/List";

export const CalendarScreen = ({ navigation, onValueChange }) => {

    const [showModalConfirmAppointment, setShowModalConfirmAppointment] = useState(false);

    const ConfirmScheduleData = [
        { id: 1, AppointmentDate: "1 de Novembro de 2024", DoctorName: "Dra Alessandra", Specialty: "Demartologa, Esteticist", LocalAppointment:"São Paulo, SP", AppointmentType: "Rotina" },
    ]

    return (
            <ContainerCalendar>

                <Title>Selecionar Data</Title>

            <CalendarChoose/>

            <ContainerSelect>
            <InputLabel>Selecione um horário disponível:</InputLabel>

            <InputSelect />
            </ContainerSelect>

            <Button onPress={() => setShowModalConfirmAppointment(true)}>
                <TextButton>Confirmar</TextButton>
            </Button>

            <ButtonSecondary onPress={() => navigation.replace("Main")}>
                <ButtonSecondaryTitle>Cancelar</ButtonSecondaryTitle>
            </ButtonSecondary>


            <ListComponent
                data={ConfirmScheduleData}
                renderItem={({item})  =>
                <ConfirmScheduleModal
                    visible={showModalConfirmAppointment}
                    setShowModalConfirmAppointment={setShowModalConfirmAppointment}
                    navigation={navigation}
                    id={item.id}
                    AppointmentDate={item.AppointmentDate}
                    DoctorName={item.DoctorName}
                    Specialty={item.Specialty}
                    LocalAppointment={item.LocalAppointment}
                    AppointmentType={item.AppointmentType}
                />}
            />
            </ContainerCalendar>
    )
}