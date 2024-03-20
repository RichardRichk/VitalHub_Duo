import { ModalContent, ModalText, PatientModal } from "./Style";
import { Modal } from "react-native"
import { Title } from "../Title/Style";
import { ButtonModal, ButtonSecondary, ButtonSecondaryTitle, TextButton } from "../Button/Style";

const CancellationModal = ({visible, setShowModalCancel, ...rest}) => {

    return(
        <Modal {...rest} visible={visible} transparent={true} animationType="fade">
            <PatientModal>
                {/* Content */}
                <ModalContent>
                    <Title>Cancelar consulta</Title>

                    <ModalText>
                    Ao cancelar essa consulta, abrirá uma possível disponibilidade no seu horário, deseja mesmo cancelar essa consulta?
                    </ModalText>

                    <ButtonModal onPress={() => {setShowModalCancel(false); alert("Consulta Cancelada")}}>
                        <TextButton>Confirmar</TextButton>
                    </ButtonModal>

                    <ButtonSecondary onPress={() => setShowModalCancel(false)}>
                        <ButtonSecondaryTitle>Cancelar</ButtonSecondaryTitle>
                    </ButtonSecondary>
                </ModalContent>
            </PatientModal>
        </Modal>
    );

};

export default CancellationModal;