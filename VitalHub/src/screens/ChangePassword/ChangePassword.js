import { useState } from "react"
import { Button, ButtonReturnIcon, ButtonWithMargin, TextButton } from "../../components/Button/Style"
import { Container } from "../../components/Container/Style"
import { Input } from "../../components/Input/Style"
import { Logo, ReturnIcon } from "../../components/Logo/Style"
import { SubTitle, Title } from "../../components/Title/Style"
import LoadingButton from "../../utils/LoadingButton"

export const ChangePassword = ({ navigation }) => {

    const [loading, setLoading] = useState(false);

    // Função para cancelar a consulta
    const emailVerify = async () => {
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
                placeholder="Nova Senha"
            />

            <Input
                placeholder="Confirmar nova senha"
            />

            <LoadingButton
                onPress={emailVerify}
                disabled={loading}
                loading={loading}
                text="CONFIRMAR NOVA SENHA"
            />

        </Container>
    )
}