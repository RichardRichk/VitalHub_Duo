import { useState } from "react"
import { Button, ButtonReturnIcon, ButtonWithMargin, ForgotButton, TextButton } from "../../components/Button/Style"
import { Container } from "../../components/Container/Style"
import { Input } from "../../components/Input/Style"
import { Logo, ReturnIcon } from "../../components/Logo/Style"
import { SubTitle, Title } from "../../components/Title/Style"
import LoadingButton from "../../utils/LoadingButton"
import api from "../../Service/Service"

export const ForgotPassword = ({ navigation }) => {

    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState('alvesbautistajoaovictor@gmail.com');

    async function EnviarEmail(){
        await api.post(`/RecuperarSenha?email=${email}`)
        .then(()=> {
            setLoading(false);
            navigation.replace("Email_Verify", {emailRecuperacao : email})
        }).catch( error => {
            console.log(error);
        })

    }

    const forgotPassword = async () => {
        setLoading(true);
        try {

            await new Promise(resolve => setTimeout(resolve, 800));
            EnviarEmail();

        } catch (error) {
            console.error("Erro ao cancelar consulta:", error);
            setLoading(false);
        }
    };

    return (
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
                placeholder="Usuário ou E-mail"
                value={email}
                onChangeText={(txt => setEmail(txt))}
            />

            <LoadingButton
                onPress={forgotPassword}
                disabled={loading}
                loading={loading}
                text="Continuar"
            />


        </Container>
    )
}