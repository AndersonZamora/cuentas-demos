import { capitalize } from './capitalize';
import { es } from 'date-fns/locale';
import { format } from 'date-fns-tz';
import { add } from 'date-fns/add';
import { isValid, parseISO } from 'date-fns';

type ErrorVal = {
    status: boolean,
    message: string,
    fecha: string
}

export const getDateServer = (): Date => {
    try {
        const minDate = new Date();
        const options: Intl.DateTimeFormatOptions = { timeZone: 'America/Lima', year: 'numeric', month: '2-digit', day: '2-digit' };
        const formatter = new Intl.DateTimeFormat('es-PE', options);
        const parts = formatter.formatToParts(minDate);
        const year = parts.find(part => part.type === 'year')?.value ?? '2024';
        const month = parts.find(part => part.type === 'month')?.value ?? '07';
        const day = parts.find(part => part.type === 'day')?.value ?? '01';
        const formattedDate = `${year}-${month}-${day}T00:00:00`;
        return new Date(formattedDate);
    } catch (error) {
        return new Date();
    }
}

export const getDated = () => {
    try {

        const options: Intl.DateTimeFormatOptions = {
            timeZone: 'America/Lima',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        };


        const formatter = new Intl.DateTimeFormat('es-PE', options);
        const parts = formatter.formatToParts(new Date());

        const year = parts.find(part => part.type === 'year')?.value;
        const month = parts.find(part => part.type === 'month')?.value;
        const day = parts.find(part => part.type === 'day')?.value;
        const hour = parts.find(part => part.type === 'hour')?.value;
        const minute = parts.find(part => part.type === 'minute')?.value;
        const second = parts.find(part => part.type === 'second')?.value;

        return {
            fecha: `${year}-${month}-${day}`,
            hora: `${hour}:${minute}:${second}`,
        };
    } catch (error) {
        return {
            fecha: '',
            hora: ''
        }
    }
}

export const addOneDay = (date: Date, day: number): Date => {
    return add(date, { days: day });
}

export const addOneMonth = (dateString: string, numberMonth: number): ErrorVal => {

    try {
        //! Validar que 'monthsToAdd' sea un número válido
        if (typeof numberMonth !== 'number' || isNaN(numberMonth)) {
            throw new Error('Número no valido');
        }

        //! Parsear la cadena de fecha y verificar si es válida
        const date = parseISO(dateString);
        if (!isValid(date)) {
            throw new Error('Fecha no válida');
        }

        //! Sumar los meses utilizando date-fns
        const newDate = add(date, { months: numberMonth });

        //! Formatear la nueva fecha en 'yyyy-MM-dd'
        const year = newDate.getFullYear();
        const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
        const day = newDate.getDate().toString().padStart(2, '0');

        return {
            status: true,
            message: '-',
            fecha: `${year}-${month}-${day}`
        }
    } catch (error) {
        if (error instanceof Error) {
            return {
                status: false,
                message: error.message,
                fecha: ''
            }
        }
        return {
            status: false,
            message: 'Error no controlado - contacte al administrador',
            fecha: '',
        }
    }
}

export const separateDateSear = (dateEntry: string) => {

    const [fecha, hora] = dateEntry.split("T");

    const [year, month, day] = fecha.split('-').map(Number);
    const [hours, minutes] = hora.split(':').map(Number);

    const localDate = new Date(year, month - 1, day, 0, 0, 0);

    const adjustedDate = new Date(localDate.getTime() - (localDate.getTimezoneOffset() * 60000));

    return adjustedDate.toISOString()
}

export const getDateCurrentRenew = (dayss: number) => {

    const today = getDateServer();
    const daysFromNow = addOneDay(getDateServer(), +dayss);

    const newToday = separateDateSear(today.toISOString());
    const newDaysFromNow = separateDateSear(daysFromNow.toISOString());

    return {
        newToday,
        newDaysFromNow
    }
}

export const separateDateRegister = (dateEntry: string) => {

    const [year, month, day] = dateEntry.split('-').map(Number);

    const localDate = new Date(year, month - 1, day, 0, 0, 0);

    const adjustedDate = new Date(localDate.getTime() - (localDate.getTimezoneOffset() * 60000));

    return adjustedDate.toISOString()
}

export const convertDate = (fecha: Date) => {

    const options: Intl.DateTimeFormatOptions = {
        timeZone: 'UTC',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    };

    const formateador = new Intl.DateTimeFormat('es-ES', options);
    const fechaFormateada = formateador.format(fecha);
    return fechaFormateada;
}

export const normalizeDateAacc = (value: Date) => {

    const valueU = convertDate(value);

    const [fecha, hora] = valueU.split(",");
    const [dayv, monthv, yearv,] = fecha.split('/').map(Number);
    const localDate = new Date(yearv, monthv - 1, dayv);

    const dayName = format(localDate, 'EEEE', { locale: es });
    const month = format(localDate, 'MMMM', { locale: es });
    const day = format(localDate, 'd', { locale: es });
    const year = format(localDate, 'yyyy', { locale: es });

    return `${capitalize(dayName)} ${day} de ${month} del ${year}`;
}

export const normalizeReport = (value: Date) => {

    const valueU = convertDate(value);

    const [fecha, hora] = valueU.split(",");
    const [dayv, monthv, yearv,] = fecha.split('/').map(Number);
    const localDate = new Date(yearv, monthv - 1, dayv);

    const dayName = format(localDate, 'EEEE', { locale: es });
    const month = format(localDate, 'MMMM', { locale: es });
    const day = format(localDate, 'd', { locale: es });
    const year = format(localDate, 'yyyy', { locale: es });

    return `${capitalize(dayName)} ${day} de ${month} del ${year}`;
}
