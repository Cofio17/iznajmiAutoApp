import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom'
import ErrorPage from './ErrorPage';
import CalendarComponent from '../Components/Calendar/CalendarComponent';
import ImageSlider from '../Components/ImageSlider/ImageSlider';
import CategoryInfo from '../Components/Car/CategoryInfo,';
import GoBack from '../Components/GoBack/GoBack';
import dayjs from 'dayjs';
import Layout from '../Components/Layout/Layout';
import TimePickerManager from '../Components/TimePicker/TimePickerManager';
import { createDate, hoursInPeriod, calculatePriceBasedOnHours } from "../utils/createDate"


export default function Car() {

    const params = useParams();
    const carId = params.carId;
    const [carData, setCarData] = useState({});
    const [error, setError] = useState();
    const [errorText, setErrorText] = useState('');
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState([]);
    const [priceTotal, setPriceTotal] = useState();
    const [days, setDays] = useState();
    const navigate = useNavigate();
    const [selectedTimes, setSelectedTimes] = useState({
        startHours: null,
        endHours: null,
    });

    const localhost = import.meta.env.VITE_LOCAL_HOST;

    useEffect(() => {
        const fetchCarData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${localhost}cars/${params.carId}`)


                setCarData(response.data.data);
                setError(false);
            }
            catch (err) {
                setError(err);
            }
            finally {
                setLoading(false);
            }
        }
        fetchCarData();
    }, [])

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

            console.log(`handle price change`);

            const hours = hoursInPeriod(dayjs(startDate), dayjs(endDate));
            const totalPrice = calculatePriceBasedOnHours(hours, carData.pricePerDay);
            setPriceTotal(totalPrice);

            console.log(`Ukupna cena: ${totalPrice}`);
            setErrorText("");
        };

        handlePriceChange();

    }, [selectedDate, selectedTimes]);


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
                <GoBack />
                <div className="container-car-upper">
                    <ImageSlider carData={carData} />
                    <div className='container-car-calendar'>
                        <div id='price'><p>{carData.pricePerDay}€ / Dan </p></div>
                        {/* fetchDates prop receives a fuctions that handles the selected dates and brings back to the this/parent component */}
                        <CalendarComponent calendarId={carData.calendarId} fetchDates={handleSelectedData} carId={params.carId} />
                        {errorText && <p>{errorText}</p>}

                        <TimePickerManager onTimesChange={handleTimesChange} />

                        <button className='button' onClick={handleNavigate}><Link>Dalje</Link></button>
                        {priceTotal && <span style={{ fontWeight: 'bold', fontSize: 18, color: "#444" }}>Cena za izabrani period: {priceTotal}€ </span>}
                    </div>
                </div>
                <CategoryInfo carData={carData} />
            </div>
        </Layout>
    )
}