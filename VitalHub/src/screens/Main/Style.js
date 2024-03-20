import styled from "styled-components";

export const ContentIcon = styled.View`

    flex-direction: row;
    justify-content: center;
    align-items: center;

    border-radius: 18px;
    padding: 9px 12px;
    background-color: ${props => `${props.tabBarActiveBackgroundColor}`};

    gap: 5px;
`

export const TextIcon = styled.Text`
    font-size: 14px;
    font-family: "Quicksand_500Medium";
    color: "#607EC5"
`