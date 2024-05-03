import { useEffect, useRef, useState } from "react"
import { Button, ButtonReturnIcon, TextButton } from "../../components/Button/Style"
import { Container } from "../../components/Container/Style"
import { ContentAccount, ContentResend, ContentVerify } from "../../components/ContentAccount/Style"
import { InputVerify } from "../../components/Input/Style"
import { Logo, ReturnIcon } from "../../components/Logo/Style"
import { SubTitle, Title } from "../../components/Title/Style"
import LoadingButton from "../../utils/LoadingButton"
import api from "../../Service/Service"

export const EmailVerify = ({navigation, route}) => {

    const [codigo, setCodigo] = useState('')
    const [loading, setLoading] = useState(false);

    const inputs = [useRef(null), useRef(null), useRef(null), useRef(null)]

    const emailVerify = async () => {
        setLoading(true);
        try {

            await new Promise(resolve => setTimeout(resolve, 800));
            ValidarCodigo();

        } catch (error) {
            console.error("Erro ao cancelar consulta:", error);
            setLoading(false);
        }
    };

    function focusNextInput(index){
        // se o index e menor que a quantidade de campos 
        if (index < inputs.length - 1){
            inputs[index + 1].current.focus()
        }
    }

    function focusPrevInput(index){
        if(index > 0){
            inputs [ index - 1].current.focus()
        }
    }

    async function ValidarCodigo(){
        console.log( codigo );
        
        await api.post(`/RecuperarSenha/ValidarCodigoRecuperacaoSenha?email=${route.params.emailRecuperacao}&codigo=${codigo}`)
        .then( () =>{
            navigation.replace("Change_Password", {emailRecuperacao : route.params.emailRecuperacao});
        }).catch(error =>{
            console.log(error);
        })
    }

    useEffect(() =>{
        inputs[0].current.focus()
    }, [])


    return(
        <Container>
            {console.log("route EmailVerify", route)}
            
            {/* Criar componente para agilizar */}
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

            <Title>VERIFIQUE SEU E-MAIL</Title>

            <SubTitle>Digite o código de 4 dígitos enviado para username@email.com
                {/* {route.parms.emailRecuperacao} */}
            </SubTitle>

            <ContentVerify>
            {
                    [0, 1, 2, 3].map( (index) => (
                        <InputVerify 
                            key={index} //Chave de acordo com o index do map
                            ref={inputs[index]} // Referencia de acordo
                            maxLength={1}
                            placeholder= "0"
                            keyboardType="numeric"
                            caretHidden={true}

                            onChangeText={ (text) =>{
                                //verificar se o texto nao e vazio(para voltar para o campo anterior)
                                if( text == ""){
                                    focusPrevInput(index)

                                }else{

                                    const novoCodigo = [ ...codigo] //separa os valores 
                                    novoCodigo[index] = text
                                    setCodigo( novoCodigo.join(''))

                                    // setCodigo(`${codigo}${text}`)

                                    //verificar se o campo tem 1 caracter
                                    focusNextInput(index)
                                }


                            }}
                        />
                    ))
                }
            </ContentVerify>

            <LoadingButton
                onPress={emailVerify}
                disabled={loading}
                loading={loading}
                text="Enviar"
            />

            <ContentAccount>
                <ContentResend>Reenviar Código</ContentResend>
            </ContentAccount>

            

        </Container>
    )
}