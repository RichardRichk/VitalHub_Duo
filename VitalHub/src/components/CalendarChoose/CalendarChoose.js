import React, { useState } from 'react';
import { Text } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import moment from 'moment';
import 'moment/locale/pt-br';

// Configuração do idioma
LocaleConfig.locales['pt-br'] = {
    monthNames: [
        'Janeiro', 
        'Fevereiro', 
        'Março', 
        'Abril', 
        'Maio', 
        'Junho', 
        'Julho', 
        'Agosto', 
        'Setembro', 
        'Outubro', 
        'Novembro', 
        'Dezembro'
    ],
    monthNamesShort: [
        'jan.', 
        'fev.', 
        'mar.', 
        'abr.', 
        'maio', 
        'jun.', 
        'jul.', 
        'ago.', 
        'set.', 
        'out.', 
        'nov.', 
        'dez.'
    ],
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['dom.', 'seg.', 'ter.', 'qua.', 'qui.', 'sex.', 'sáb.'],
    today: "Hoje"
};

// Idioma padrão
LocaleConfig.defaultLocale = 'pt-br';
moment.locale('pt-br');

export const CalendarChoose = ({ setDataSelecionada, dataSelecionada }) => {

    // Data Selecionada
    const [selected, setSelected] = useState('');

    const isFutureDate = (dateString) => {
        const selectedDate = moment(dateString);
        const currentDate = moment().startOf('day');
        return selectedDate.isSameOrAfter(currentDate, 'day');
    };

    return (
        <Calendar
            style={{
                width: '100%', // Define a largura do calendário como 100% do contêiner pai
                aspectRatio: 2, // Mantém a proporção do calendário como 2:1 (largura:altura)
                backgroundColor: '#fafafa',
                marginBottom: 170,
                marginTop: 35,
            }}
            markedDates={{
                [dataSelecionada]: {
                    selected: true,
                    disableTouchEvent: true
                },
            }}
            useNativeAndroidPickerStyle={false}
            hideExtraDays
            enableSwipeMonths
            onDayPress={date => {
                if (isFutureDate(date.dateString)) {
                    setDataSelecionada(date.dateString);
                } else {
                    alert('Por favor, selecione uma data futura.');
                }
            }}
            hideArrows={false}
            theme={{
                calendarBackground: '#fafafa',
                dayContainerStyle: {
                    backgroundColor: '#fafafa',
                },
                selectedDayBackgroundColor: '#49B3BA',
                selectedDayTextColor: '#FFFFFF',
                dayBackgroundColor: 'transparent'
            }}
            customStyles={{
                monthText: { fontFamily: "MontserratAlternates_600SemiBold", fontSize: 20 },
                dayText: { fontFamily: "Quicksand_600SemiBold" },
            }}
            renderHeader={(date) => <Text style={{ fontFamily: 'MontserratAlternates_600SemiBold', fontSize: 20 }}>{moment(date).format('MMMM YYYY')}</Text>}
        />
    );
};
