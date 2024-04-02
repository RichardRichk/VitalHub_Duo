import { Modal } from "react-native"
import { Title } from "../Title/Style"
import { ModalContent, ModalText, PatientModal } from "../CancellationModal/Style"
import { ButtonModal, ButtonSecondary, ButtonSecondaryTitle, TextButton } from "../Button/Style"
import { ContainerModalText, ImageModalAppointment, ModalTextAppointment } from "./Style";
import { useState } from "react";
import LoadingButton from "../../utils/LoadingButton";

const AppointmentModal = ({ navigation, situacao ,visible, setShowModalAppointment, id, name, ModalText1, ModalText2, ButtonProntuary ,...rest }) => {

    const image = require("../../assets/Images/Picture_Modal.png")

    const [loading, setLoading] = useState(false);

    // Função para cancelar a consulta
    const appointmentModal = async () => {
        setLoading(true); 
        try {

            await new Promise(resolve => setTimeout(resolve, 800));
            navigation.replace("ClinicAdress")
            setLoading(false); 
            setShowModalAppointment(false); 
        } catch (error) {
            setLoading(false); 
        }
    };

    return (
        <Modal {...rest} visible={visible} transparent={true} animationType="fade">

            <PatientModal>

                {/* Imagem */}


                <ModalContent>

                    <ImageModalAppointment
                        source={image}
                    />
                    
                    <Title>{name}</Title>

                    <ContainerModalText>
                        <ModalTextAppointment>{ModalText1}</ModalTextAppointment>

                        <ModalTextAppointment>{ModalText2} </ModalTextAppointment>
                    </ContainerModalText>

                    {
                        situacao == "cancelado" ? (
                            <>
                            </>
                        ) : situacao == "pendente" ? (

                            <LoadingButton 
                            onPress={appointmentModal}
                            disabled={loading} 
                            loading={loading} 
                            text="Ver Local da Consulta"
                        />

                        ) : (
                            <ButtonModal onPress={() => {setShowModalAppointment(false); navigation.navigate("FormRequire")}}>
                                <TextButton>Inserir Prontuario</TextButton>
                            </ButtonModal>
                        )
                    }
                    

                    <ButtonSecondary onPress={() => setShowModalAppointment(false)}>
                        <ButtonSecondaryTitle>Cancelar</ButtonSecondaryTitle>
                    </ButtonSecondary>

                </ModalContent>
            </PatientModal>


        </Modal>
    );

};

export default AppointmentModal;


export const AppointmentDoctorModal = ({ navigation ,visible, setShowModalAppointment, id, name, specialty, crm,...rest }) => {

    return (
        <Modal {...rest} visible={visible} transparent={true} animationType="fade">

            <PatientModal>

                {/* Imagem */}


                <ModalContent>

                    <ImageModalAppointment
                        source={image}
                    />
                    
                    <Title>{name}</Title>

                    <ContainerModalText>
                        <ModalText>{specialty}</ModalText>

                        <ModalText>{crm}</ModalText>
                    </ContainerModalText>


                    <ButtonModal onPress={() => {setShowModalDoctorAppointment(false); navigation.replace("ClinicAdress")}}>
                        <TextButton>Ver Local da consulta</TextButton>
                    </ButtonModal>

                    <ButtonSecondary onPress={() => setShowModalDoctorAppointment(false)}>
                        <ButtonSecondaryTitle>Cancelar</ButtonSecondaryTitle>
                    </ButtonSecondary>

                </ModalContent>
            </PatientModal>


        </Modal>
    );

};