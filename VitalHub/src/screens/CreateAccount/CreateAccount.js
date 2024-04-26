import { useState } from "react";
import { Container } from "../../components/Container/Style";
import { Input } from "../../components/Input/Style";
import LoadingButton from "../../utils/LoadingButton"
import { ContentAccount, ContentResend } from "../../components/ContentAccount/Style";
import { Logo } from "../../components/Logo/Style";
import { SubTitle, Title } from "../../components/Title/Style";
import api from "../../Service/Service";

// Seus outros imports...

export const CreateAccountFunc = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [nome, setNome] = useState("Joao Alves");
    const [email, setEmail] = useState("paciente6@gmail.com");
    const [senha, setSenha] = useState("paciente123");
    const [confirmPassword, setConfirmPassword] = useState("paciente123");

    const createAccount = async () => {
        setLoading(true);
        try {
            const response = await api.post("/Pacientes", {
                Nome: nome, // Usuário em vez de Nome
                Email: email, // Usar a variável email
                Senha: senha // Usar a variável password
            });
    
            if (response.status === 200) {
                navigation.replace("Login");
            } else {
                console.error("Erro ao criar usuário:", response.data.error);
            }
        } catch (error) {
            console.error("Erro ao criar usuário:", error);
        } finally {
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
          
            <Input placeholder="Usuário" value={nome} onChangeText={setNome} />
            <Input placeholder="E-mail" value={email} onChangeText={setEmail} />
            <Input placeholder="Senha" value={senha} onChangeText={setSenha} />
            <Input placeholder="Confirmar Senha" value={confirmPassword} onChangeText={setConfirmPassword} />

            <LoadingButton
                onPress={createAccount}
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
