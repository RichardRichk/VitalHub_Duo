import { Modal } from "react-native"
import { Title } from "../Title/Style"
import { ModalContent, ModalText, PatientModal } from "../CancellationModal/Style"
import { ButtonModal, ButtonSecondary, ButtonSecondaryTitle, TextButton } from "../Button/Style"
import { ContainerModalText, ImageModalAppointment, ModalTextAppointment } from "./Style";
import { useState } from "react";
import LoadingButton from "../../utils/LoadingButton";
import { useEffect } from "react";
import api from "../../Service/Service";

const AppointmentModal = ({ navigation, profileData, consulta, situacao ,visible, setShowModalAppointment,...rest }) => {

    const image = require("../../assets/Images/Picture_Modal.png")
    const [medicoData, setMedicoData] = useState('');
    const [nome, setNome] = useState('')
    const [crm, setCrm] = useState('')
    const [especialidade, setEspecialidade] = useState('')
    const [userIdLoaded, setUserIdLoaded] = useState(false);

    const [loading, setLoading] = useState(false);


    useEffect(() => {
            getMedicoData();
    }, [userIdLoaded])


    async function getMedicoData() {
            const response = await api.get(`/Medicos/BuscarPorID?id=${consulta.medicoClinica.medicoId}`)
            await setMedicoData(response.data)

            await console.log(medicoData);

            setCrm(medicoData.crm)
            setNome(medicoData.idNavigation.nome)
            setEspecialidade(medicoData.especialidade.especialidade1)

            setUserIdLoaded(true)
    }

    async function handleClose(screen){
        
        if (screen === "ClinicAdress"){
            console.log(' entrou ')
            await setShowModalAppointment(false); 
            
            navigation.replace(screen, {clinicaid : consulta.medicoClinica.clinicaId})
        }
        else{
            console.log('nao entrou');
            await setShowModalAppointment(false)
            navigation.replace( screen )
        }
    }

    // Função para loading do botao
    const appointmentModal = async () => {
        setLoading(true); 

        try {

            await new Promise(resolve => setTimeout(resolve, 800));
            setLoading(false); 
            
            await handleClose("ClinicAdress")
            
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
                    
                    <Title>{nome}</Title>

                    <ContainerModalText>

                        <ModalTextAppointment>{especialidade}</ModalTextAppointment>

                        <ModalTextAppointment>CRM-{crm}</ModalTextAppointment>

                    </ContainerModalText>

                    {
                        situacao == "Cancelados" ? (
                            <>
                            </>
                        ) : situacao == "Pendentes" ? (

                            <LoadingButton 
                            onPress={appointmentModal}
                            disabled={loading} 
                            loading={loading} 
                            text="Ver Local da Consulta"
                        />

                        ) : (
                            <ButtonModal onPress={() => handleClose("ClinicAdress")}>
                                {/* {setShowModalAppointment(false); navigation.navigate("FormRequire")} */}
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