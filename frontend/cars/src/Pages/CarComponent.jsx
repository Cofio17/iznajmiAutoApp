import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'
import ErrorPage from './ErrorPage';
import CalendarComponent from '../Components/Calendar/CalendarComponent';
import ImageSlider from '../Components/ImageSlider/ImageSlider';
import CategoryInfo from '../Components/Car/CategoryInfo,';
import { useNavigate } from 'react-router-dom';
import GoBack from '../Components/GoBack/GoBack';
import dayjs from 'dayjs';
import Layout from '../Components/Layout/Layout';


export default function Car() {
    const params = useParams();
    const carId = params.carId;
    const [carData, setCarData] = useState({});
    const [error, setError] = useState();
    const [errorText, setErrorText] = useState('');
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState([]);
    const [priceTotal, setPriceTotal] = useState();
    const navigate = useNavigate();

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
            selectedDate: selectedDate
        }
        setErrorText('');
        navigate('/reservation', { state: dataToPass });
    }



    //fetching data from child/calendar component
    const handleSelectedData = (date) => {
        setSelectedDate(date);
        // Izračunavanje broja dana
        const daysTotal = dayjs(date[1]).diff(dayjs(date[0]), 'days') + 1;

        // Izračunavanje ukupne cene
        const totalPrice = carData.pricePerDay * daysTotal;

        // Ažuriranje stanja
        setPriceTotal(totalPrice);

        // Debugging
        console.log(carData.pricePerDay);
        console.log(`Price total: ${totalPrice}, Days total: ${daysTotal}`);

        // Resetovanje greške
        setErrorText('');
    }

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

                        <button className='button' onClick={handleNavigate}><Link>Dalje</Link></button>
                        {priceTotal && <span style={{ fontWeight: 'bold', fontSize: 18, color: "#444" }}>Cena za izabrane dane <del>{priceTotal}€</del> {priceTotal * 0.98}€ </span>}
                    </div>
                </div>
                <CategoryInfo carData={carData} />
            </div>
        </Layout>
    )
}