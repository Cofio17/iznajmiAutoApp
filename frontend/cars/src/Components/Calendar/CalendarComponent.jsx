import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Alert } from '@mui/material';
import axios from 'axios';
import './calendar.scss'
import LoadingCircle from '../../utils/LoadingCircle/LoadingCircle';



export default function CalendarComponent({ calendarId, fetchDates }) {
    const [date, setDate] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [busyDays, setBusyDays] = useState([]);

    const localhost = import.meta.env.VITE_LOCAL_HOST;

    useEffect(() => {

        /**
         *returns busy dates for specific car/calendar depending on calendar ID 
         */
        const getBusyDates = async () => {
            try {
                console.log(calendarId);
                setLoading(true);
                const response = await axios.post(`${localhost}api/calendar/get-busy-dates`, { calendarId: calendarId });
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

    //stored dates
    useEffect(() => {
        if (busyDays.length > 0) {
            const storedDateRange = localStorage.getItem('dateRange');
            if (storedDateRange) {
                const { start, end } = JSON.parse(storedDateRange);
                const parsedDates = [new Date(start), new Date(end)];

                let invalidRange = parsedDates.some(date => iteratediabledDays(date));

                if (!invalidRange) {
                    handleDateChange(parsedDates);
                } else {
                    localStorage.removeItem('dateRange'); // Ako su zauzeti, obriši ih iz localStorage
                }
            }
        }
    }, [busyDays]);


    /** 
     * DisableDays - iterating through busy events in the calendar and return true if date param is in busy days and false if not
     * @param {Date} param0 - date range which users selects
     * @returns 
     */
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

    /**
     * Iteration through disabled days
     * @param {Date} date - 
     * @returns -true if date range is busy and returns false if range is not busy
     */
    const iteratediabledDays = (date) => {
        return busyDays.some(({ start, end }) => {
            let current = new Date(start);
            let lastDate = new Date(end);

            while (current <= lastDate) {
                if (date.toDateString() === current.toDateString()) {
                    return true; // Ako je datum zauzet, vrati true
                }
                current.setDate(current.getDate() + 1);
            }
            return false;
        });
    };


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
                setError('Please select diffrent date');
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

    if (loading) {
        return (
            <LoadingCircle />

        )
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
            {date.length > 1 &&
                <Alert className='alert-lib' variant='outlined' severity='success'><b>{`${date[0].toDateString()} - ${date[1].toDateString()}`}</b></Alert>
            }
            {error && <Alert variant='outlined' severity='info'>{error}</Alert>}
        </div>
    );
}
