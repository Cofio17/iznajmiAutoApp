
import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom'
import ErrorPage from './ErrorPage';
import CalendarComponent from '../Components/Calendar/CalendarComponent';
import ImageSlider from '../Components/ImageSlider/ImageSlider';
import CategoryInfo from '../Components/Car/CategoryInfo,';
import dayjs from 'dayjs';
import Layout from '../Components/Layout/Layout';
import TimePickerManager from '../Components/TimePicker/TimePickerManager';
import { createDate, hoursInPeriod, calculatePriceBasedOnHours, calculateTotalDaysBasedOnHours } from "../utils/createDate"
import { apiRequest } from '../utils/Api/apiService';


export default function Car() {

    const params = useParams();
    const carId = params.carId;
    const [carData, setCarData] = useState({});
    const navigate = useNavigate();

    const [error, setError] = useState();
    const [errorText, setErrorText] = useState('');
    const [loading, setLoading] = useState(true);

    const [selectedDate, setSelectedDate] = useState([]);
    const [priceTotal, setPriceTotal] = useState();
    const [days, setDays] = useState();

    const [selectedTimes, setSelectedTimes] = useState({
        startHours: null,
        endHours: null,
    });

    useEffect(() => {
        setLoading(true);

        apiRequest("GET", `cars/${carId}`)
            .then((data) => {
                setCarData(data.data);
                setError(null);
            })
            .catch((err) => {
                setError(err);
                console.error("Greška pri učitavanju auta:", err);
            })
            .finally(() => setLoading(false));

    }, [carId]);


    const handleNavigate = () => {
        if (selectedDate.length < 2) {
            setErrorText('Please, selected the reservation date');
            return null;
        }
        const dataToPass = {
            car: carData,
            carId: carId,
            selectedDate: selectedDate,
            priceTotal: priceTotal,
            daysTotal: days,
            selectedTimes: selectedTimes
        }
        setErrorText('');
        navigate('/reservation', { state: dataToPass });
    }
    const handleTimesChange = ({ startHours, endHours }) => {
        setSelectedTimes({ startHours, endHours });
    };

    useEffect(() => {
        if (!selectedDate[0] || !selectedDate[1] || !selectedTimes.startHours || !selectedTimes.endHours) {
            return;
        }

        const handlePriceChange = () => {

            const startDate = createDate(selectedDate[0], selectedTimes.startHours);
            const endDate = createDate(selectedDate[1], selectedTimes.endHours);

            const hours = hoursInPeriod(dayjs(startDate), dayjs(endDate));
            const totalPrice = calculatePriceBasedOnHours(hours, carData.pricePerDay);
            const totalDays = calculateTotalDaysBasedOnHours(hours);

            setPriceTotal(totalPrice);
            setDays(totalDays);

            console.log(`Ukupna cena: ${totalPrice}`);
            setErrorText("");
        };

        handlePriceChange();

    }, [selectedDate, selectedTimes]);

    /**
     * Fetch dates from child component
     * @param {Array} date 
     */
    const handleSelectedData = (date) => {
        setSelectedDate(date);
    };

    if (loading) {
        return <p>Data is loading</p>
    }
    if (error) {
        return <ErrorPage error={error} />
    }

    return (
        <Layout>
            <div className='container-car'>

                <div className="container-car-upper">
                    <ImageSlider carData={carData} />
                    <div className='container-car-calendar'>
                        <div id='price'><p>{carData.pricePerDay}€ / Dan </p></div>
                        {/* fetchDates prop receives a fuctions that handles the selected dates and brings back to the this/parent component */}
                        <CalendarComponent calendarId={carData.calendarId} fetchDates={handleSelectedData} carId={params.carId} />
                        {errorText && <p>{errorText}</p>}

                        <TimePickerManager onTimesChange={handleTimesChange} />

                        <button id='to-reservation-page' className='button' onClick={handleNavigate}><Link>Dalje</Link></button>
                        {priceTotal && <span style={{ fontWeight: 'bold', fontSize: 18, color: "#444" }}>Cena za izabrani period: {priceTotal}€ </span>}
                    </div>
                </div>
                <CategoryInfo carData={carData} />
            </div>
        </Layout>
    )
}