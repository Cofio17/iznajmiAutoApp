import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';

export default function CalendarComponent({ calendarId, carId, fetchDates }) {
    const [date, setDate] = useState([]);
    const [error, setError] = useState('');
    // const [busyDates, setBusyDates] = useState(); //busy dates need to be implemnted into calendar
    const [loading, setLoading] = useState(true);
    const [busyDays, setBusyDays] = useState([]);

    // Data simulation 
    const disabledDays = [
        new Date(2024, 10, 5),
        new Date(2024, 10, 7),
        new Date(2024, 10, 20),
    ];



    useEffect(() => {
        // checking if range is valid
        function checkValidRange() {
            if (date.length === 2) {
                let isDisabled = false;
                const datum = new Date(date[0]);
                while (datum <= date[1]) {
                    isDisabled = disabledDays.some(el => el.toDateString() === datum.toDateString());
                    if (isDisabled) {
                        setError(`Datum ${datum.toDateString()} je već zauzet`);
                        return true;  // Datum je zauzet
                    }
                    datum.setDate(datum.getDate() + 1);
                }
                setError('');
            }
        }

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

        //iteration through busy days
        const iteratediabledDays = () => {
            busyDays.forEach((busyEvent) => {
                let { start, end } = busyEvent;

                while (new Date(start).toDateString() !== new Date(end).toDateString()) {
                    const day = new Date(start);
                    day.setDate(day.getDate() + 1); //increasing days for 1
                    console.log(`dani ${day.toDateString()}`);
                    start = day;
                }
            })
        }

        iteratediabledDays();
        getBusyDates();
        checkValidRange();
    }, []);  // izbaceno date i disabledDays

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


    // Funkcija za odabir datuma, proverava da li je opseg validan
    const handleDateChange = (selectedDate) => {
        // Ako se odabere opseg, proveri sve datume u tom opsegu
        if (Array.isArray(selectedDate) && selectedDate.length === 2) {
            const [startDate, endDate] = selectedDate;
            let invalidRange = false;
            const datum = new Date(startDate);

            while (datum <= endDate) {
                if (disabledDays.some(disableDate => disableDate.toDateString() === datum.toDateString())) {
                    invalidRange = true;
                    break;
                }
                datum.setDate(datum.getDate() + 1);
            }

            if (invalidRange) {
                setError('Opseg sadrži zauzeti datum. Molimo odaberite drugi opseg.');
                setDate([]); // Resetuje selektovane datume
                fetchDates([]);//salje izabrane datume u parent component
            } else {
                setError('');
                setDate(selectedDate); // Ako je opseg validan, postavi ga
                fetchDates(selectedDate);//salje izabrane datume u parent component
            }
        } else {
            setDate(selectedDate); // Ako je samo jedan datum izabran
            fetchDates(selectedDate);//salje izabrane datume u parent component
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
                onChange={handleDateChange} // Check when the date is changed if the range is valid *incomplete
                allowPartialRange={false}
            />
            {date.length > 1 && (
                <p>Izabrani datum: {`${date[0].toDateString()} - ${date[1].toDateString()}`}</p>
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}
