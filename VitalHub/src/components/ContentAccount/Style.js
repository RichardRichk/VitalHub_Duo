import styled from "styled-components";

export const ContentAccount = styled.View`
    margin-top: 30px;
    width: 78.8%;
    flex-direction: row;
    justify-content: center;
`

export const ContentInput = styled(ContentAccount)`
    width: 90%;
    justify-content: space-between;
`

export const ContentVerify = styled(ContentAccount)`
    width: 88.88%;
    margin-top: 20px;
`

export const ContentText = styled.Text`
    font-size: 14px;
    font-family: 'MontserratAlternates_600SemiBold';
    color: #4E4B59;
`

export const ContentForgot = styled.Text`
    font-size: 14px;
    font-family: 'MontserratAlternates_600SemiBold';
    color: #4d659d;
    text-decoration: underline;
`

export const ContentResend = styled(ContentForgot)`
    color: #344F8F;
`