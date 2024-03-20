import styled from "styled-components";
import { Title } from "../Title/Style";
import { ContainerCard } from "../Container/Style";

/////////////////////////////// INICIO DO CLINIC
export const ContainerCardClinic = styled.TouchableOpacity`
    width: 90%;
    height: 82px;
    box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.25);
    margin-bottom: 12px;
    elevation: 10;

    flex-direction: row;

    padding: 10px 10px;
    gap:10px;

    border-radius: 5px;
    background-color: #FFFFFF;

`

export const ContainerCardClinicSelect = styled(ContainerCardClinic)`
border: 2px solid #49B3BA;
`

export const ContentCard = styled.View`
    width: 95%;
    flex-direction: row;
    justify-content: space-between;
    gap: 10px;
`

export const ContentNamePlace = styled.View`
    flex-direction: column;
    gap: 10px;
    padding: 5px 5px;
`

export const ContentStarStatus = styled(ContentNamePlace)`
`

export const AllContentCard = styled.View`
    flex-direction: row;
    justify-content: space-between;
`

export const StarContent = styled.View`
    flex-direction: row;
    justify-content: flex-end;
`

export const ClinicName = styled(Title)`
    font-size: 16px;
`

export const ClinicAdress = styled(Title)`
    font-size: 14px;
`

export const StarText = styled.Text`
    font-family: "Quicksand_600SemiBold";
    font-size: 14px;
    color: #F9A620;
`

export const CalendarCard = styled.View`
    flex-direction: row;
    padding: 5px 14px;
    gap: 6px;
    border-radius: 5px;

    align-items: center;

    background-color: #E8FCFD;
`

export const TextCalendarDays = styled(StarText)`

    color: #49B3BA;

`

///////////////////////////////// FIM DO CLINIC
