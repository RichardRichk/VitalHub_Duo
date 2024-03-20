import styled from "styled-components";
import { ButtonAppointmentLevel, TextButton } from "../Button/Style";

export const ModalContainer = styled.View`
  width: 100%;
  height: 100%;

  position: absolute;
  justify-content: flex-end;

  background-color: rgba(0, 0, 0, 0.3);

`;

export const ModalContent = styled.View`
  width: 100%;
  height: 85%; 

  position: relative;
  justify-content: flex-start;
  align-items: center;

  background-color: #FFFFFF;
  padding: 30px;
  border-radius: 10px 10px 0px 0px;
`

export const ButtonAppointmentLevelUrgency = styled(ButtonAppointmentLevel)`
  width: 33%;
`

export const TextButtonAppointment = styled(TextButton)`
  color: #77CACF;
  padding: 13px;
`

