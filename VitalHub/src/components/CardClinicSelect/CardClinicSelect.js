import { ContentCard, ClinicName, StarContent, StarText, ContentNamePlace, ContentStarStatus, ClinicAdress, CalendarCard, TextCalendarDays, ContainerCardClinicSelect, ContainerCardClinic, DoctorImage, DoctorContentCard, DoctorDataCard, DoctorName, DoctorSpecialty, ContainerCardDoctorSelect } from "./Style"
import { AntDesign } from "@expo/vector-icons"
import { FontAwesome6 } from '@expo/vector-icons'


//////////////////////////////// INICIO CLINIC SELECT

export const CardClinicSelect = ({
    id,
    name,
    adress,
    adressNumber,
    rating,
    days,
    select,
    onPress
}) => {

    if (select === id) {

        return (

            <ContainerCardClinicSelect >

                <ContentCard>

                    <ContentNamePlace>

                        <ClinicName>{name}</ClinicName>

                        <ClinicAdress>{adress}, {adressNumber}</ClinicAdress>

                    </ContentNamePlace>

                    <ContentStarStatus>
                        <StarContent>
                            <AntDesign
                                name="star"
                                size={20}
                                color={"#F9A620"}
                            />
                            <StarText>{rating}</StarText>
                        </StarContent>

                        <CalendarCard>
                            <FontAwesome6
                                name="calendar-day"
                                size={14}
                                color={"#49B3BA"}
                            />
                            <TextCalendarDays>{days}</TextCalendarDays>
                        </CalendarCard>
                    </ContentStarStatus>


                </ContentCard>


            </ContainerCardClinicSelect>

        )

    } else {
        return (
            <ContainerCardClinic onPress={onPress}>

                <ContentCard>

                    <ContentNamePlace>

                        <ClinicName>{name}</ClinicName>

                        <ClinicAdress>{adress}, {adressNumber}</ClinicAdress>

                    </ContentNamePlace>

                    <ContentStarStatus>
                        <StarContent>
                            <AntDesign
                                name="star"
                                size={20}
                                color={"#F9A620"}
                            />
                            <StarText>{rating}</StarText>
                        </StarContent>

                        <CalendarCard>
                            <FontAwesome6
                                name="calendar-day"
                                size={14}
                                color={"#49B3BA"}
                            />
                            <TextCalendarDays>{days}</TextCalendarDays>
                        </CalendarCard>
                    </ContentStarStatus>


                </ContentCard>

            </ContainerCardClinic>

        )
    }


}
//////////////////////////////// FIM CLINIC SELECT
