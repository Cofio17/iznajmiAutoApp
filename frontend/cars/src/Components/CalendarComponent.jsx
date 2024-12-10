import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';

export default function CalendarComponent({ calendarId, carId, fetchDates }) {
    const [date, setDate] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [busyDays, setBusyDays] = useState([]);



    useEffect(() => {

        //function that returns busy dates for specific car/calendar depending on calendar ID 
        const getBusyDates = async () => {
            try {
                console.log(calendarId);

                setLoading(true);
                const response = await axios.post(`http://localhost:5000/api/calendar/get-busy-dates`, { calendarId: calendarId });
                console.log(response.data.dates.calendars[calendarId].busy);
                const busyDates = response.data.dates.calendars[calendarId].busy
                setBusyDays(busyDates);


            } catch (err) {
                setError(err)
            }
            finally {
                setLoading(false);
            }
        }
        getBusyDates();

    }, []);

    // Functions for disabling specific days in a calendar
    const disableDays = ({ date }) => {
        return busyDays.some((busyEvent) => {
            let { start, end } = busyEvent;

            start = new Date(start);
            end = new Date(end);

            // iterating through start to end date
            while (start <= end) {
                if (start.toDateString() === date.toDateString()) {
                    return true; // date is busy
                }
                start.setDate(start.getDate() + 1); // //increasing days for 1
            }
            return false; // date !busy
        });
    };

    //iteration through busy days
    const iteratediabledDays = (date) => {
        let isBusy = false;
        busyDays.forEach((busyEvent) => {
            let { start, end } = busyEvent;
            while (new Date(start).toDateString() !== new Date(end).toDateString()) {
                const day = new Date(start);
                if (date.toDateString() === day.toDateString()) {
                    isBusy = true;
                    break;
                }

                day.setDate(day.getDate() + 1); //increase day for 1
                start = day;
            }
        })
        return isBusy;
    }

    // Funkcija za odabir datuma, proverava da li je opseg validan
    const handleDateChange = (selectedDate) => {
        // Ako se odabere opseg, proveri sve datume u tom opsegu
        if (Array.isArray(selectedDate) && selectedDate.length === 2) {
            const [startDate, endDate] = selectedDate;
            let invalidRange = false;
            let datum = new Date(startDate);

            while (datum <= endDate) {
                if (iteratediabledDays(datum)) {
                    invalidRange = true;
                    break;
                }
                datum.setDate(datum.getDate() + 1);
            }

            if (invalidRange) {
                setError('Opseg sadrži zauzeti datum. Molimo odaberite drugi opseg.');
                setDate([]); // Reseting selected dates
                fetchDates([]);//sending selected dates to a parent component
            } else {
                setError('');
                setDate(selectedDate); // if range is valid, set it
                fetchDates(selectedDate);//sending selected dates to a parent component
            }
        } else {
            setDate(selectedDate); // if only 1 date is selected
            fetchDates(selectedDate);
        }
    };

    if (error) {
        console.log(error);

    }

    return (
        <div className="calendar-wrapper">
            <Calendar
                view="month"
                selectRange={true}
                tileDisabled={disableDays} // Disabling days
                value={date}
                onChange={handleDateChange} // Check when the date is changed if the range is valid
                allowPartialRange={false}
                minDate={new Date(new Date().setDate(new Date().getDate() + 1))}
                prev2Label={null}
                next2Label={null}
                maxDate={new Date(new Date().setMonth(new Date().getMonth() + 3))}
            />
            {date.length > 1 && (
                <p>Selected date: <b>{`${date[0].toDateString()} - ${date[1].toDateString()}`}</b> </p>
            )}
            {error && <p>{error}</p>}
        </div>
    );
}
