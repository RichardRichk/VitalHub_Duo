import { ActivityIndicator, StyleSheet, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { AntDesign } from '@expo/vector-icons'
import { useEffect, useState } from 'react';
import moment from "moment"


export const InputSelect = ({setHoraSelecionada }) => {

    const dataAtual = moment().format('YYYY-MM-DD');
    const [arrayOptions, setarrayOptions] = useState(null)

    function LoadOptions(){
        //conferir quantas horas faltam ate as 24h
        const horasRestantes = moment(dataAtual).add(24, 'hours').diff( moment(), 'hours')

        // Criar um laco que rode a quantidade de horas que faltam
        const options = Array.from({ length : horasRestantes }, (_, index) => {
            let valor = new Date().getHours() + (index + 1)

            return {
                label : `${valor}:00`, value : `${valor}:00`
            }
        })

        //Devolver para cada hora, uma nova opcao no select
        setarrayOptions(options)
    }
    
    useEffect(() => {
        LoadOptions();
    }, [])
    
    return (
        <View>
            {
            
                arrayOptions != null
                 ?(
                    <RNPickerSelect

                    placeholder={{
                        label: "Selecionar horário",
                        value: null,
                        color: '#34898F',
                    }}
                    useNativeAndroidPickerStyle={false}
                    style={pickerSelectStyles}
    
                    Icon={() => {
                        return <AntDesign name="caretdown" size={24} color="#60BFC5" style={pickerSelectStyles.icon} />;
                    }}
                    onValueChange={(value) => setHoraSelecionada(value)}
                    items={ arrayOptions }
                />
                 ) : (
                    <ActivityIndicator/>
                 )
            }
           
        </View>
    )
}

const pickerSelectStyles = StyleSheet.create({
    inputAndroid: {
        width: '100%',
        height: 53,
        borderColor: '#60BFC5',
        borderWidth: 2,
        borderRadius: 5,
        fontFamily: 'MontserratAlternates_600SemiBold',
        fontSize: 14,
        padding: 16,
        display: "flex",

        marginBottom: 42,
        marginTop: 10,

    },
    icon: {
        position: 'absolute',
        right: 16,
        top: 22,
    },
    placeholder: {
        marginTop:10,
        color: "#34898F"
    }
});