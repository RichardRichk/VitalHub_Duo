import { ContainerCard } from "../Container/Style"
import { ContainerCardDoctorSelect, DoctorContentCard, DoctorDataCard, DoctorImage, DoctorName, DoctorSpecialty } from "./Style"

//////////////////////////////// INICIO DOCTOR SELECT
export const CardDoctorSelect = ({
    id,
    image,
    name,
    specialty,
    select,
    onPress
}) => {

    image = require("../../assets/Images/SelectDoctor1.png");

    if (select === id) {
        return(
        <ContainerCardDoctorSelect>

            <DoctorImage
                source= {image}
            />

            <DoctorContentCard>

                <DoctorDataCard>

                    <DoctorName>{name}</DoctorName>

                    <DoctorSpecialty>{specialty}</DoctorSpecialty>

                </DoctorDataCard>

            </DoctorContentCard>

        </ContainerCardDoctorSelect>
        )

    } else {

        return(
        <ContainerCard onPress={onPress}>

            <DoctorImage
                source={image}
            />

            <DoctorContentCard>

                <DoctorDataCard>

                    <DoctorName>{name}</DoctorName>

                    <DoctorSpecialty>{specialty}</DoctorSpecialty>

                </DoctorDataCard>

            </DoctorContentCard>
        </ContainerCard>
        )

    }

}
//////////////////////////////// FIM DOCTOR SELECT