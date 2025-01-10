import styled from "styled-components";
import { ModalText } from "../CancellationModal/Style";

export const ContainerModalText = styled.View`
    width: 80%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    align-self: center;
    justify-self: start;
`

export const ModalTextAppointment = styled(ModalText)`
    width: auto;
`

export const ImageModalAppointment = styled.Image`
    width: 79.16%;
    height: 181px;
    border-radius: 10px;
    margin-bottom: 20px;
`