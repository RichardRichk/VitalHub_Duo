
import { ContainerCard } from "../Container/Style"
import { ClockCard, ContentCard, DataProfileCard, ImageCard, ProfileDataCard, ProfileName, TextAge, TextBold, TextType, ViewRow } from "./Style"
import { ButtonCard, ButtonTextCard } from "../Button/Style"
import { AntDesign } from "@expo/vector-icons"
import { useState } from "react"



export const CardAppointment = ({
    navigation,
    userType,
    situacao = "pendente",
    onPressCancel,
    onPressAppointment,
    onPressCard,
    id,
    image,
    name,
    age,
    type,
    time
}) => {

    image = require("../../assets/Images/ProfilePic.png")

    return (
        <ContainerCard onPress={() => {
        
            if (situacao === "realizado" && userType === "Paciente") {
                navigation.replace("FormRequire");
            } else if(situacao == "pendente" || situacao === "realizado"){
                onPressCard();
            }
        }
        }>

            <ImageCard
                source={image}
            />

            <ContentCard>

                <DataProfileCard>

                    <ProfileName>{name}</ProfileName>

                    <ProfileDataCard>

                        <TextAge>{age}</TextAge>
                        <TextType>{type}</TextType>

                    </ProfileDataCard>

                </DataProfileCard>

                <ViewRow>

                    <ClockCard situacao={situacao}>
                        <AntDesign name="clockcircle" size={14} color={situacao == "pendente" ? "#49B3BA" : "8C8A97"} />
                        <TextBold situacao={situacao} color={"#49B3BA"}>{time} </TextBold>
                    </ClockCard>


                    {/* valida e mostra o tipo de botao conforme a situacao */}

                    {
                        situacao == "cancelado" ? (
                            <>
                            </>
                        ) : situacao == "pendente" ? (

                            <ButtonCard onPress={onPressCancel}>
                                <ButtonTextCard situacao={situacao}>Cancelar </ButtonTextCard>
                            </ButtonCard>

                        ) : (
                            <ButtonCard onPress={onPressAppointment}>
                                <ButtonTextCard situacao={situacao}>Ver Prontuario </ButtonTextCard>
                            </ButtonCard>
                        )
                    }



                </ViewRow>

            </ContentCard>

        </ContainerCard>
    )
}