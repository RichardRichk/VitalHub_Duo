import { ButtonWithMargin, TextButton } from "../../components/Button/Style"
import { Container } from "../../components/Container/Style"
import { ContentAccount, ContentResend } from "../../components/ContentAccount/Style"
import { Input } from "../../components/Input/Style"
import { Logo } from "../../components/Logo/Style"
import { SubTitle, Title } from "../../components/Title/Style"

export const CreateAccountFunc = ({navigation}) => {
    return (
        <Container>

            <Logo
                source={require('../../assets/Images/VitalHub_Logo4.png')}
            />

            <Title>Criar Conta</Title>

            <SubTitle>Insira seu endereço de e-mail e senha para realizar seu cadastro.</SubTitle>

            <Input
                placeholder= "Usuário ou E-mail"
            />
            <Input
                placeholder= "Senha"
            />
            <Input
                placeholder= "Confirmar Senha"
            />

            <ButtonWithMargin onPress={() => navigation.replace('Login')}>
                <TextButton>CADASTRAR</TextButton>
            </ButtonWithMargin>

            <ContentAccount>
                <ContentResend
                    onPress={() => navigation.replace('Login')}
                >
                    Cancelar
                    
                </ContentResend>
            </ContentAccount>

        </Container>
    )
}