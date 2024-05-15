import React, { useState } from "react";
import { Container } from "../../components/Container/Style";
import { Input } from "../../components/Input/Style";
import LoadingButton from "../../utils/LoadingButton"
import { ContentAccount, ContentResend } from "../../components/ContentAccount/Style";
import { Logo } from "../../components/Logo/Style";
import { SubTitle, Title } from "../../components/Title/Style";
import api from "../../Service/Service";
import { Alert } from "react-native";
import { Notification } from "../../components/Notification/Notification";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Seus outros imports...

export const CreateAccountFunc = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [cpf, setCpf] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    async function Create(){

        const formData = new FormData();
        
        formData.append('')
        formData.append('Rg', "");
        formData.append('Cpf', cpf);
        formData.append('DataNascimento', "");
        formData.append('Cep', "");
        formData.append('logradouro', "");
        formData.append('Numero', "");
        formData.append('Nome', nome);
        formData.append('Email', email);
        formData.append('Senha', senha);
        formData.append('Cidade', "");
        formData.append('IdTipoUsuario', 'B41E22FC-E900-422C-A159-7F0D5E8C55CE');
        //676F07F1-73CC-4B59-83E6-F07064DB4C4F
        formData.append('Foto', null);
        formData.append('File', null);

        try {
            if (cpf == "" || nome == "" || email == "" || senha == "" || confirmPassword == "") {
                Alert.alert("Confira os dados e tente novamente")
            }
            else if (cpf.length <=11){
                Alert.alert("CPF Inválido")
            }
            else if (senha.length <=6) {
                Alert.alert("A senha deve conter pelo menos 7 caracteres")
            }
            else if (senha == confirmPassword) {
                setLoading(true); 
                const response = await api.post('/Pacientes', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log(response.data);
                if (response.status == 200) {

                    Notification("Usuário Cadastrado");
                    Alert.alert("Conta cadastrada")
                    navigation.replace("Login", {email});
                }
            }
            else{
                alert(`Os dados nao conferem, tente novamente!`)
            }

        } catch (error) {
            console.log(error.response.status);
            console.log(error.response.data);}
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
            <Input placeholder="CPF" value={cpf} onChangeText={setCpf} />
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
