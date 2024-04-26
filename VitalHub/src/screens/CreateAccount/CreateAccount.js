import { useState } from "react";
import { Container } from "../../components/Container/Style";
import { Input } from "../../components/Input/Style";
import LoadingButton from "../../utils/LoadingButton"
import { ContentAccount, ContentResend } from "../../components/ContentAccount/Style";
import { Logo } from "../../components/Logo/Style";
import { SubTitle, Title } from "../../components/Title/Style";
import api from "../../Service/Service";
import { Alert } from "react-native";

// Seus outros imports...

export const CreateAccountFunc = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [nome, setNome] = useState("Joao Alves");
    const [email, setEmail] = useState("paciente6@gmail.com");
    const [senha, setSenha] = useState("paciente123");
    const [confirmPassword, setConfirmPassword] = useState("paciente123");

    async function Create(){

        const formData = new FormData();
        formData.append('Rg', null);
        formData.append('Cpf', null);
        formData.append('DataNascimento', "");
        formData.append('Cep', null);
        formData.append('Logadouro', null);
        formData.append('Numero', "");
        formData.append('Nome', nome);
        formData.append('Email', email);
        formData.append('Senha', senha);
        formData.append('Cidade', null);
        formData.append('IdTipoUsuario', '676F07F1-73CC-4B59-83E6-F07064DB4C4F');
        formData.append('Foto', null);
        formData.append('File', null);

        try {
            if (senha === confirmPassword) {
                setLoading(true); 
                const response = await api.post('/Pacientes', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log(response.data);
                if (response.status === 200) {
                    Notification("Usuario Cadastrado", "Sucesso")
                    await Login(); // Chama o login após o cadastro
                    Notification("Usuario Cadastrado")
                }
            }
        } catch (error) {
            console.log(error.response.status);
            console.log(error.response.data);
        } finally {
            setLoading(false); 
            navigation.replace('Login'); // Navega para a tela de login
            Alert.alert("Conta cadastrada")
        }
    }

    async function Login() {
        setLoading(true); // Inicia o carregamento

        try {
            const response = await api.post('/Login', {
                email: email,
                senha: senha
            });

            await AsyncStorage.setItem("token", JSON.stringify(response.data));
            navigation.replace("Profile");
        } catch (error) {
            console.log(error.response.status);
            console.log(error.response.data);
        } finally {
            setLoading(false); // Finaliza o carregamento
        }
    }

    return (
        <Container>

            <Logo
                source={require('../../assets/Images/VitalHub_Logo4.png')}
            />

            <Title>Criar Conta</Title>

            <SubTitle>Insira um nome de usuario, seu endereço de e-mail e senha para realizar seu cadastro.</SubTitle>
          
            <Input placeholder="Usuário" value={nome} onChangeText={setNome} />
            <Input placeholder="E-mail" value={email} onChangeText={setEmail} />
            <Input placeholder="Senha" value={senha} onChangeText={setSenha} />
            <Input placeholder="Confirmar Senha" value={confirmPassword} onChangeText={setConfirmPassword} />

            <LoadingButton
                onPress={Create}
                disabled={loading}
                loading={loading}
                text="Continuar"
            />

            <ContentAccount>
                <ContentResend onPress={() => navigation.replace('Login')}>
                    Cancelar
                </ContentResend>
            </ContentAccount>
        </Container>
    );
};
