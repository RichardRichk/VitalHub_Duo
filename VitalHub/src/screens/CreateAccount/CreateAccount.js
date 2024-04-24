import { useState } from "react"
import { ButtonWithMargin, TextButton } from "../../components/Button/Style"
import { Container } from "../../components/Container/Style"
import { ContentAccount, ContentResend } from "../../components/ContentAccount/Style"
import { Input } from "../../components/Input/Style"
import { Logo } from "../../components/Logo/Style"
import { SubTitle, Title } from "../../components/Title/Style"
import LoadingButton from "../../utils/LoadingButton"

export const CreateAccountFunc = ({ navigation }) => {

    const [loading, setLoading] = useState(false);

    // Função para cancelar a consulta
    const createAccout = async () => {
        setLoading(true);
        try {

            await new Promise(resolve => setTimeout(resolve, 800));
            navigation.replace("Login")
            setLoading(false);

        } catch (error) {
            console.error("Erro ao cancelar consulta:", error);
            setLoading(false);
        }
    };

    return (
        <Container>

            <Logo
                source={require('../../assets/Images/VitalHub_Logo4.png')}
            />

            <Title>Criar Conta</Title>

            <SubTitle>Insira um nome de usuario, seu endereço de e-mail e senha para realizar seu cadastro.</SubTitle>

            <Input
                placeholder="Usuário"
            />
            <Input
                placeholder="E-mail"
            />
            <Input
                placeholder="Senha"
            />
            <Input
                placeholder="Confirmar Senha"
            />

            <LoadingButton
                onPress={createAccout}
                disabled={loading}
                loading={loading}
                text="Continuar"
            />

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