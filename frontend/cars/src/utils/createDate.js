import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import duration from 'dayjs/plugin/duration'
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);

export function createDate(date, hours) {

    const sdate = dayjs(date).tz('Europe/Belgrade').startOf('day');
    // console.log("Originalni datum:", sdate.format());

    const newDate = sdate
        .add(hours.hour(), 'hour')
        .add(hours.minute(), 'minute');

    // console.log("Novi datum:", newDate.format());
    // console.log("Novi datum (ISO):", newDate.toISOString());

    return newDate.toISOString();
}



export function hoursInPeriod(startDate, endDate) {
    const diffInMinutes = endDate.diff(startDate, "minute"); // Razlika u minutima
    const hours = Math.floor(diffInMinutes / 60); // Celi sati
    const minutes = diffInMinutes % 60; // Preostale minute
    return { hours, minutes }; // Vraća objekat sa satima i minutama
}


export function calculatePriceBasedOnHours({ hours, minutes }, pricePerDay) {
    let totalDays = Math.floor(hours / 24); // Potpuni dani
    let additionalCharge = 0;

    // Ako su preostali sati, dodaj dodatnu cenu
    if (hours % 24 > 0 || minutes > 0) {
        additionalCharge = pricePerDay; // Naplati još jedan dan
    }

    return (totalDays + (additionalCharge > 0 ? 1 : 0)) * pricePerDay; // Ukupna cena
}



