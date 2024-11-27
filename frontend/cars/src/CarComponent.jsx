import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import ErrorPage from './ErrorPage';
import './style.scss'
import CalendarComponent from './Components/CalendarComponent';
import formatDate from './utils/convertDate';
import Header from './Components/Header';


export default function Car() {
    const params = useParams();
    const carId = params.carId;
    const [carData, setCarData] = useState({});
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState([]);


    //privremeno ovde
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');


    //fetching data from child/calendar component
    const handleSelectedData = (date) => {
        setSelectedDate(date);
    }

    //sending data to server/ google calendar api and making event in a calendar
    const postDataToServer = async () => {
        if (selectedDate.length !== 2) {
            console.log("Invalid date selection:", selectedDate);
            return;
        }
        try {
            const [startDate, endDate] = selectedDate;
            const reservationData = {
                summary: {
                    carId: carId,
                    email: email,
                    number: number,

                },
                description: `Zakazan Auto: ${carData.brand}: ${carData.licensePlate}`,
                start: {
                    dateTime: formatDate(startDate)
                },
                end: {
                    dateTime: formatDate(endDate),
                },
                calendarId: carData.calendarId
            };
            const response = await axios.post(`http://localhost:5000/api/calendar/create-event`, reservationData, {
                headers: { 'Content-Type': 'application/json' },
            });
            console.log("Response:", response.data);

        } catch (error) {
            console.error("Error sending data:", error);
        }

    };

    useEffect(() => {
        const fetchCarData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:5000/cars/${params.carId}`)

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




    if (loading) {
        return <p>Data is loading</p>
    }
    if (error) {
        return <ErrorPage error={error} />
    }

    return (<>
        <Header />
        <div className='container'>
            <h1>Car Page {params.carId}</h1>
            <h2>Car {carData.name}</h2> <br />
            <h3>Tablice: {carData.tablice}</h3>


            <CalendarComponent calendarId={carData.calendarId} fetchDates={handleSelectedData} carId={params.carId} />
            {/* fetchDates prop receives a fuctions that handles the selected dates and brings back to the this/parent component */}

            <label htmlFor="number">Unesite Broj:</label>
            <input type="text" id='number' value={number} onChange={(e) => { setNumber(e.target.value) }} />
            <br />
            <label htmlFor="number">Unesite email:</label>
            <input type="email" id='email' value={email} onChange={(e) => { setEmail(e.target.value) }} />

            <button onClick={postDataToServer}>Make a reservation</button>
        </div>
        <img className='car-image' src={carData.image} alt="car image" />
    </>

    )
}