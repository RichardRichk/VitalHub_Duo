import { Button, ButtonReturnIcon, TextButton } from "../../components/Button/Style"
import { Container } from "../../components/Container/Style"
import { ContentAccount, ContentResend, ContentVerify } from "../../components/ContentAccount/Style"
import { InputVerify } from "../../components/Input/Style"
import { Logo, ReturnIcon } from "../../components/Logo/Style"
import { SubTitle, Title } from "../../components/Title/Style"

export const EmailVerify = ({navigation}) => {
    return(
        <Container>
            
            {/* Criar componente para agilizar */}
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

            <Title>VERIFIQUE SEU E-MAIL</Title>

            <SubTitle>Digite o código de 4 dígitos enviado para username@email.com</SubTitle>

            <ContentVerify>
                <InputVerify
                    maxLength={1}
                    placeholder= "0"
                />
                <InputVerify
                    maxLength={1}
                    placeholder= "0"
                />
                <InputVerify
                    placeholder= "0"
                />
                <InputVerify
                    placeholder= "0"
                />
            </ContentVerify>

            <Button
                onPress={() => navigation.replace('Change_Password')}
            >
                <TextButton>ENTRAR</TextButton>
            </Button>

            <ContentAccount>
                <ContentResend>Reenviar Código</ContentResend>
            </ContentAccount>

            

        </Container>
    )
}