import CalendarComponent from "../../../Components/Calendar/CalendarComponent"
import MotionButton from "../../../Components/MotionButton/MotionButton";
import { useState, useEffect } from "react";
import TimePickerManager from "../../../Components/TimePicker/TimePickerManager";
import { apiRequest } from "../../Api/apiService";
import { createDate, hoursInPeriod, calculatePriceBasedOnHours, calculateTotalDaysBasedOnHours } from "../../createDate";
import SuccesfulChangeModal from "./SuccesfulChangeModal";
import dayjs from "dayjs";
export default function CalendarModal({ handleClose, calendarId, eventId, email, personData, reservationId }) {

    const [selectedDate, setSelectedDate] = useState([]);
    const [selectedTimes, setSelectedTimes] = useState({
        startHours: null,
        endHours: null,
    });
    const [priceTotal, setPriceTotal] = useState();
    const [days, setDays] = useState();
    const [errorText, setErrorText] = useState('');
    const [changedReservation, setChangedReservation] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!selectedDate[0] || !selectedDate[1] || !selectedTimes.startHours || !selectedTimes.endHours) {
            return;
        }

        const handlePriceChange = () => {
            const pricePerDay = personData.pricePerDay;
            const startDate = createDate(selectedDate[0], selectedTimes.startHours);
            const endDate = createDate(selectedDate[1], selectedTimes.endHours);

            const hours = hoursInPeriod(dayjs(startDate), dayjs(endDate));
            const totalDays = calculateTotalDaysBasedOnHours(hours);

            const totalPrice = calculatePriceBasedOnHours(hours, pricePerDay);

            setPriceTotal(totalPrice);
            setDays(totalDays);

            console.log(`Ukupna cena: ${totalPrice}`);
            setErrorText("");
        };

        handlePriceChange();

    }, [selectedDate, selectedTimes]);

    const handleSelectedData = (date) => {
        setSelectedDate(date);
        console.log(selectedDate);

    };

    const handleTimesChange = ({ startHours, endHours }) => {
        setSelectedTimes({ startHours, endHours });
        console.log(`selected times ${selectedTimes}`);

    };


    /**
     * Handles the updating of a reservation by sending a PATCH request to the server.
     * This function constructs the reservation dates using the selected date and time,
     * and then updates the reservation in the calendar.
     */
    const handleUpdateReservation = async () => {
        setLoading(true);
        const reservationDate = {
            startDate: createDate(selectedDate[0], selectedTimes.startHours),
            endDate: createDate(selectedDate[1], selectedTimes.endHours),
            priceTotal: priceTotal,
            daysTotal: days
        }
        console.log(reservationDate);

        try {
            const response = await apiRequest("PATCH", `api/calendar/change/${calendarId}/${eventId}`, reservationDate);
            console.log(`Reservation Date Changed!`, response);
            setChangedReservation(true);

        } catch (error) {
            console.log(`Error Changing reservation date ${error}`);
            throw error;
        }
        finally {
            setLoading(false);
        }

    }

    return (
        <>
            {changedReservation ?
                <SuccesfulChangeModal reservationId={reservationId} />
                : (<>
                    <div className="heading">
                        <h2>Zamena termina</h2>
                        <h3>{personData.brand} {personData.model}</h3>
                    </div>
                    <CalendarComponent
                        calendarId={calendarId}
                        fetchDates={handleSelectedData}
                        isReservationPage={true}
                    />
                    <div className="time-pickers">
                        <TimePickerManager onTimesChange={handleTimesChange} startDateHours={personData.startDate} endDateHours={personData.endDate} />
                    </div>
                    {priceTotal && <span style={{ fontWeight: 'bold', fontSize: 18, color: "#444" }}>Cena za izabrani period: {priceTotal}€ </span>}

                    <div className="buttons">
                        <MotionButton disabled={loading} onClick={handleUpdateReservation} text={loading ? "Čuvanje..." : "Sačuvaj promene"} className={'button'} />
                        <MotionButton disabled={loading} onClick={handleClose} text={'Zatvori'} className={'button'} />
                    </div>
                </>
                )
            }

        </>
    )
}