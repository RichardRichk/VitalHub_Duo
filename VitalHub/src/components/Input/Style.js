import styled from "styled-components";

export const Input = styled.TextInput.attrs({placeholderTextColor: '#34898f'})`
    width: 88.88%;
    height: 53px;
    padding: 16px;
    margin-top: 15px;

    border: 2px solid #49b3ba;
    border-radius: 5px;
    color: #34898f;
    font-size: 14px;
    font-family: 'MontserratAlternates_600SemiBold';    
`

export const InputProfile = styled(Input).attrs({placeholderTextColor: ['#33303E']})`
    border: 0px;
    background-color: #F5F3F3;
    font-family: 'MontserratAlternates_500Medium';
`

export const InputFormRequire = styled(Input)`
    height: 121px;
    border: 2px solid #34898F;
    background-color: #FFFFFF;
    font-family: "MontserratAlternates_600SemiBold";
`

export const InputScheduleModal = styled(Input)`
    width: 100%;
    margin-bottom: 30px;
`

export const InputVerify = styled.TextInput.attrs({placeholderTextColor: '#34898f'})`
    height: 62px;
    width: 16%;
    padding: 5px;
    border: 2px solid #77CACF;
    border-radius: 5px;
    font-size: 40px;
    font-family: 'Quicksand_600SemiBold';
    text-align: center;
    color: #34898f;
    margin-right: 5.55%; 
    margin-left: 5.83%;  
    margin-bottom: 30px;
`

export const InputLabel = styled.Text`
    font-size: 16px;
    font-family: 'Quicksand_600SemiBold';
    margin-bottom: -5px;
    margin-top: 20px;
    color: #000000;
    align-items: flex-start;
    align-self: flex-start;
    justify-content: flex-start;
`

export const InputDouble = styled(InputProfile)`
    width: 100%;
    margin-bottom: 30px;
`

export const InputNotEditable = styled(InputProfile).attrs({editable: false})`
`

export const InputFormNotEditable = styled(InputFormRequire).attrs({placeholderTextColor: '#4E4B59', editable: false})`
    border: 1px solid #F5F3F3;
    background-color: #F5F3F3;
`
