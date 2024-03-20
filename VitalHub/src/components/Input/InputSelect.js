import { StyleSheet, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { AntDesign } from '@expo/vector-icons'

export const InputSelect = ({ onValueChange }) => {
    return (
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
                items={[
                    // { label: '16h30m', value: 'hour1' },
                    // { label: '12h', value: 'hour2' },
                    // { label: '08h30m', value: 'hour3' }
                ]}
            />
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