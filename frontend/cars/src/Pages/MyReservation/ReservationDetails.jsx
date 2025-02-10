import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ReservationDetails() {
    const { reservationId } = useParams();

    const [data, setData] = useState({});
    const localhost = import.meta.env.VITE_LOCAL_HOST;

    useEffect(() => {
        const fetchReservation = async () => {
            try {
                const res = await axios.get(`${localhost}reservations/idReservation/${reservationId}`);
                console.log(res.data.data);
                setData(res.data.data);
            } catch (error) {
                setData({});
                console.log(`error while fetching reservation ${error}`);
            }
        }
        fetchReservation();
    }, [reservationId]);

    return (
        <div style={{ color: 'black' }}>
            <h2>Moja Rezervacija: {reservationId}</h2>
            <ul>
                {Object.keys(data).map((key) => (
                    <li key={key}>
                        <strong>{key}:</strong> {data[key]}
                    </li>
                ))}
            </ul>
        </div>
    );
}
