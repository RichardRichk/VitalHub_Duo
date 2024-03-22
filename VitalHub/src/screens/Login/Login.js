import { Container } from "../../components/Container/Style"
import { GoogleIcon, Logo } from "../../components/Logo/Style"
import { Title } from "../../components/Title/Style"
import { Input } from "../../components/Input/Style"
import { LinkMedium } from "../../components/Links/Style"
import { Button, GoogleButton, TextButton, TextGoogleButton } from "../../components/Button/Style"
import { ContentAccount, ContentForgot, ContentText } from "../../components/ContentAccount/Style"

import api from "../../Service/Service"
import { useState } from "react"

export const LoginFunc = ({navigation}) => {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');


//Chama funcao de login
    async function Login(){

        //chamar a api de login 
        const response = await api.post('/login', {
            email: email,
            senha: senha
        })

        console.log(response)
        // navigation.replace("Main")
    }

    return(
        <Container>

            <Logo
                source={require('../../assets/Images/VitalHub_Logo4.png')}
            />

            <Title>ENTRAR OU CRIAR CONTA</Title>
 
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

            
            <Button
            onPress={() => Login()}
            >
                <TextButton>ENTRAR</TextButton>
            </Button>
                
            

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