import styled from "styled-components";

// import lib linear gradient
import {LinearGradient} from 'expo-linear-gradient';

export const Container = styled.SafeAreaView`
    flex: 1;
    align-items: center;
    background-color: #fafafa;
`

export const ContainerWithMargin = styled.SafeAreaView`
    margin-top: 35px;
`

export const ContainerScroll = styled.ScrollView`
    margin-left: 10.55%;
    width: 100%;
    height: 90%;
    margin-bottom: 30px;
`

export const ContainerHeader = styled(LinearGradient).attrs({ colors: ['#60BFC5', '#496BBA'], start: {x: -0.05, y: 1.08}, end: {x: 1, y: 0} })`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 144px;
    border-radius: 0px 0px 15px 15px;
`


export const DoubleView = styled.View`
    width: 90%;
    margin-top:24px;
    flex-direction: row;
    align-self:flex-start;
    justify-content: space-between;

`

export const ScheduleModalView = styled(DoubleView)`
    width: 100%;
    max-width: 100%;
    align-self: flex-start;
    margin-top: 0px;
    text-align: center;
`

export const BoxInput = styled.View`
    flex-direction: column;
`

export const ContainerCard = styled.TouchableOpacity`

width: 90%;
height: 100px;
margin-bottom: 12px;


flex-direction: row;


padding: 10px 10px;
gap:10px;

border-radius: 5px;
background-color: #FFFFFF;

`