import { Button, ButtonReturnIcon, ButtonWithMargin, TextButton } from "../../components/Button/Style"
import { Container } from "../../components/Container/Style"
import { Input } from "../../components/Input/Style"
import { Logo, ReturnIcon } from "../../components/Logo/Style"
import { SubTitle, Title } from "../../components/Title/Style"

export const ChangePassword = ({navigation}) =>{
    return(
        <Container>
            <ButtonReturnIcon
                onPress={() => navigation.replace('Login')}
            >
                <ReturnIcon
                    source={require('../../assets/Images/Icon_Back.png')}
                />
            </ButtonReturnIcon>

            <Logo
                source={require('../../assets/Images/VitalHub_Logo4.png')}
            />

            <Title>Redefinir senha</Title>

            <SubTitle>Insira e confirme a sua nova senha</SubTitle>

            <Input
                placeholder= "Nova Senha"
            />

            <Input
                placeholder= "Confirmar nova senha"
            />

            <ButtonWithMargin onPress={() => navigation.replace('Login')}>
                <TextButton>CONFIRMAR NOVA SENHA</TextButton>
            </ButtonWithMargin>

        </Container>
    )
}