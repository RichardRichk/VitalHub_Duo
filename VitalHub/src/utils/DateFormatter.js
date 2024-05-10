import { parse, format } from 'date-fns';

export function convertDateToISO(dateString) {
    // Analisa a data no formato DD/MM/YYYY
    const parsedDate = parse(dateString, 'dd/MM/yyyy', new Date());

    // Formata a data no formato YYYY/MM/DD
    const formattedDate = format(parsedDate, 'yyyy/MM/dd');

    return formattedDate;
}