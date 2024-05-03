import { useState } from "react"
import { Button, ButtonReturnIcon, ButtonWithMargin, TextButton } from "../../components/Button/Style"
import { Container } from "../../components/Container/Style"
import { Input } from "../../components/Input/Style"
import { Logo, ReturnIcon } from "../../components/Logo/Style"
import { SubTitle, Title } from "../../components/Title/Style"
import LoadingButton from "../../utils/LoadingButton"
import api from "../../Service/Service"

export const ChangePassword = ({ navigation, route }) => {

    const [loading, setLoading] = useState(false);
    const [senha, setSenha] = useState(null);
    const [confirmarSenha, Setconfirmarsenha]= useState(null);


    // Função para cancelar a consulta
    const emailVerify = async () => {
        setLoading(true);
        try {

            await new Promise(resolve => setTimeout(resolve, 800));
            AtualizarSenha();

        } catch (error) {
            console.error("Erro ao cancelar consulta:", error);
            setLoading(false);
        }
    };

    async function AtualizarSenha(){
        if( senha === confirmarSenha){
            await api.put(`/Usuario/AlterarSenha?email=${route.params.emailRecuperacao}`, {
                senhaNova : senha
            }).then(( ) =>{
                setLoading(false);
                navigation.replace("Login")
            }).catch(error =>{
                console.log(error);
            })
        }
    }


    return (
        <Container>
            {console.log(route)}
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
                onChangeText={(txt) => setSenha(txt)}
            />

            <Input
                placeholder="Confirmar nova senha"
                onChangeText={(txt) => Setconfirmarsenha(txt)}
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