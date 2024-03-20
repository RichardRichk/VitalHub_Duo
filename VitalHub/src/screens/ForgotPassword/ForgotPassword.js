import { Button, ButtonReturnIcon, ButtonWithMargin, ForgotButton, TextButton } from "../../components/Button/Style"
import { Container } from "../../components/Container/Style"
import { Input } from "../../components/Input/Style"
import { Logo, ReturnIcon } from "../../components/Logo/Style"
import { SubTitle, Title } from "../../components/Title/Style"

export const ForgotPassword = ({navigation}) => {
    return(
        <Container>

            {/* Criar componente para agilizar */}
            <ButtonReturnIcon
                onPress={() => navigation.replace('Login')}
            >

                <ReturnIcon
                    source={require('../../assets/Images/Icon_Return.png')}
                />

            </ButtonReturnIcon>


            <Logo
                source={require('../../assets/Images/VitalHub_Logo4.png')}
            />

            <Title>RECUPERAR SENHA</Title>

            <SubTitle>Digite abaixo seu email cadastrado que enviaremos um link para recuperação de senha</SubTitle>

            <Input
                placeholder = "Usuário ou E-mail"
            />

            <ButtonWithMargin
            onPress={() => navigation.navigate('Email_Verify')}
            >
                <TextButton>Continuar</TextButton>
            </ButtonWithMargin>
        </Container>
    )
}