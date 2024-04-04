import { Container } from "../../components/Container/Style"
import { GoogleIcon, Logo } from "../../components/Logo/Style"
import { Title } from "../../components/Title/Style"
import { Input } from "../../components/Input/Style"
import { LinkMedium } from "../../components/Links/Style"
import { Button, GoogleButton, TextButton, TextGoogleButton } from "../../components/Button/Style"
import { ContentAccount, ContentForgot, ContentText } from "../../components/ContentAccount/Style"
import AsyncStorage from "@react-native-async-storage/async-storage"

import api from "../../Service/Service"
import { useState } from "react"
import { ActivityIndicator, Alert } from "react-native"
import LoadingButton from "../../utils/LoadingButton"


export const LoginFunc = ({navigation}) => {

    const [email, setEmail] = useState('paciente3@email.com');
    const [senha, setSenha] = useState('paciente123');
    const [loading, setLoading] = useState(false);


//Chama funcao de login
    async function Login(){

        setLoading(true); // Ativa a animação de loading
        try {
            //chamar a api de login 
            const response = await api.post('/Login', {
                email: email,
                senha: senha
            });


            if (response.status === 200) {

                await AsyncStorage.setItem('token', JSON.stringify(response.data))

                setLoading(true);

                navigation.replace("Main")

            }

        } catch (error) {
            Alert.alert('Falha no login!', 'Verifique seus dados ou aguarde um momento.')
            setLoading(false);
        }

    }

    return(
        <Container>

            <Logo
                source={require('../../assets/Images/VitalHub_Logo4.png')}
            />

 
            <Input
                placeholder="Usuario ou Email"
                onChangeText = {(txt) => setEmail(txt)}
                value={email}
            />
            <Input
                placeholder="Senha"
                secureTextEntry={true}
                onChangeText = {(txt) => setSenha(txt)}
                value={senha}
            />

            

            <LinkMedium 
            onPress={() => navigation.navigate('Forgot_Password')}
            >
                Esqueceu sua senha?
            </LinkMedium>

            
            <LoadingButton onPress={Login} disabled={loading} loading={loading} text="ENTRAR" />
                
            

            <GoogleButton>
                <GoogleIcon 
                    source={require('../../assets/Images/GoogleIcon.png')}
                />
                <TextGoogleButton>ENTRAR COM GOOGLE</TextGoogleButton>
            </GoogleButton>
            
            <ContentAccount>
                <ContentText>não tem conta? </ContentText> 
                <ContentForgot
                    onPress = {() => navigation.navigate('Create_Account')}
                >crie uma conta agora</ContentForgot>
            </ContentAccount>

        </Container>
    )
} 