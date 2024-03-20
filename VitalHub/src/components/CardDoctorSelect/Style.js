import styled from "styled-components"
import { ContainerCard } from "../Container/Style"
import { Title } from "../Title/Style"

///////////////////////////////// INICIO DO DOCTOR

export const ContainerCardDoctorSelect = styled(ContainerCard)`
border: 2px solid #49B3BA;
`

export const DoctorImage = styled.Image`
width: 77px;
height: 80px;
border-radius: 5px;
`

export const DoctorContentCard = styled.View`
width: 70%;
gap: 10px;
`

export const DoctorDataCard = styled.View`
    gap: 6px;
    text-align: center;
`

export const DoctorName = styled(Title)`
    font-size: 16px;
    margin-top: 10px;
`

export const DoctorSpecialty = styled.Text`
    font-size: 14px;
    color: #8C8A97;
    font-family: "Quicksand_400Regular";
`