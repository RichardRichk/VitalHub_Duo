import { ModalContent, ModalText, PatientModal } from "./Style";
import { Modal } from "react-native"
import { Title } from "../Title/Style";
import { ButtonModal, ButtonSecondary, ButtonSecondaryTitle, TextButton } from "../Button/Style";
import LoadingButton from "../../utils/LoadingButton";
import { useState } from "react";

const CancellationModal = ({visible, setShowModalCancel, ...rest}) => {

    const [loading, setLoading] = useState(false);

    // Função para cancelar a consulta
    const cancelAppointment = async () => {
        setLoading(true); 
        try {

            await new Promise(resolve => setTimeout(resolve, 800));

            setLoading(false); 
            setShowModalCancel(false); 
            alert("Consulta Cancelada");
        } catch (error) {
            console.error("Erro ao cancelar consulta:", error);
            setLoading(false); 
        }
    };

    return(
        <Modal {...rest} visible={visible} transparent={true} animationType="fade">
            <PatientModal>
                {/* Content */}
                <ModalContent>
                    <Title>Cancelar consulta</Title>

                    <ModalText>
                        Ao cancelar essa consulta, abrirá uma possível disponibilidade no seu horário, deseja mesmo cancelar essa consulta?
                    </ModalText>

                    
                    <LoadingButton 
                        onPress={cancelAppointment}
                        disabled={loading} 
                        loading={loading} 
                        text="Confirmar"
                    />
    
                    {/* Botão secundário para fechar o modal */}
                    <ButtonSecondary onPress={() => setShowModalCancel(false)}>
                        <ButtonSecondaryTitle>Cancelar</ButtonSecondaryTitle>
                    </ButtonSecondary>
                </ModalContent>
            </PatientModal>
        </Modal>
    );
};

export default CancellationModal;
