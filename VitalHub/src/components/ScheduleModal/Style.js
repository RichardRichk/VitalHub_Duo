import styled, {css} from "styled-components";
import { TextButton } from "../Button/Style";

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

export const ButtonAppointmentLevel = styled.TouchableHighlight`
    height: 62px;
    width: 30%;

    padding: 5px;

    border-radius: 5px;

    font-size: 40px;
    font-family: 'Quicksand_600SemiBold';

    margin-top: 10px;
    margin-right: 3.55%;    
    margin-bottom: 30px;

    text-align: center;

    ${props => props.clickButton ? css`background-color:#77CACF;` : css`background-color:transparent; border:2px solid #77CACF;`}

`

export const ButtonAppointmentLevelUrgency = styled(ButtonAppointmentLevel)`
  width: 33%;
`

export const TextButtonAppointment = styled(TextButton)`
  padding: 13px;

  ${props => props.clickButton ? css`color:#fbfbfb` : css`color:#77CACF`}
`

