import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import duration from 'dayjs/plugin/duration'
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);


/**
 * Creates a new date-time by combining a given date and a specific time (hours and minutes).
 * 
 * @param {string | object} date - The base date, which is set to the start of the day in the 'Europe/Belgrade' time zone.
 * @param {object} hours - An object containing the hour and minute values to be added to the base date.
 * @returns {string} The new date-time in ISO format.
 */
export function createDate(date, hours) {

    //const sdate = dayjs(date).tz('Europe/Belgrade').startOf('day');
    const sdate = dayjs(date).startOf('day');
    // console.log("Originalni datum:", sdate.format());

    const newDate = sdate
        .add(hours.hour(), 'hour')
        .add(hours.minute(), 'minute');

    // console.log("Novi datum:", newDate.format());
    // console.log("Novi datum (ISO):", newDate.toISOString());

    return newDate.toISOString();
}

export function hoursInPeriod(startDate, endDate) {
    console.log(endDate.diff(startDate, "hour"));

    return endDate.diff(startDate, "hour");
}


export function calculatePriceBasedOnHours(hours, pricePerDay) {
    let totalDays = Math.ceil(hours / 24); // Zaokružuje naviše ako je prekoračen bilo koji sat preko 24h
    return totalDays * pricePerDay; // Ukupna cena
}

export function calculateTotalDaysBasedOnHours(hours) {
    return Math.ceil(hours / 24);
}

export function getHoursOfDate(date) {
    return dayjs(date).tz("Europe/Belgrade");
}





