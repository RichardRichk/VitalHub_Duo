import styled from "styled-components";
import { Title } from "../Title/Style";

export const ImageCard = styled.Image`
width: 77px;
height: 80px;
border-radius: 5px;
`

export const ContentCard = styled.View`
    width: 70%;
    gap: 10px;
`

export const DataProfileCard = styled.View`
    gap: 6px;
`

export const ProfileName = styled(Title)`
    font-size: 16px;
`

export const ProfileDataCard = styled.View`
    flex-direction: row;
    gap: 15px;
`

export const TextAge = styled.Text`
    font-size: 14px;
    color: #8C8A97;
    font-family: "Quicksand_400Regular";
`

export const TextType = styled(TextAge)`
    font-family: "Quicksand_600SemiBold";
`


export const ViewRow = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

export const ClockCard = styled.View`
    flex-direction: row;
    padding: 3px 23px;
    gap: 6px;
    border-radius: 5px;

    align-items: center;

    color: ${(props) => props.situacao == "Pendentes" ? "#E8FCFD" : "#F1F0F5"};
    background-color: ${(props) => props.situacao == "Pendentes" ? "#E8FCFD" : "#F1F0F5"};
`

export const TextBold = styled.Text`
`
