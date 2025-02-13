import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContextHelper";
import { TableWrapper } from "../Components/Table/TableWrapper";
import { useContext, useState, useEffect } from "react";
import GoBack from "../Components/GoBack/GoBack";
import MuiTable from "../Components/MuiTable/MuiTable";
import axios from "axios";
const data = {
    "licensePlate": "Provera1",
    "brand": "Volkswagen",
    "model": "Golf",
    "year": 2019,
    "type": "HecBek",
    "fuelType": "Diesel",
    "transmission": "Manual",
    "seats": 5,
    "doors": 4,
    "pricePerDay": 40,
    "mileage": 60000,
    "insuranceIncluded": false,
    "deposit": 150,
    "location": "Zrenjanin",
    "features": [
        "Parking Sensors",
        "Heated Seats"
    ],
    "image": "https://i.imgur.com/FiCkx9U.jpeg",
    "description": "Compact and fuel-efficient car, ideal for long trips.",
    "companyId": null,
    "categoryId": "645f31f7c123a1e9d09d9b47",
    "__v": 0,
    "calendarId": "321280b59355dd05a7279bd8ddc3736a9c84857f3a22b83dc1bca063b43c223a@group.calendar.google.com"
}
export default function DashBoard() {
    const navigate = useNavigate()
    const { user, logout, getUser } = useContext(AuthContext);
    const [totalCars, setTotalCars] = useState(0);
    const [reservations, setReservations] = useState([]);
    const localhost = import.meta.env.VITE_LOCAL_HOST;

    useEffect(() => {
        document.title = `Profil- ${user.name}`
    })

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`${localhost}users/${JSON.parse(localStorage.getItem('user'))}`, { withCredentials: true })
                getUser(res.data); // Postavlja korisnika u AuthContext
            } catch (error) {
                logout();
                navigate('/');
            }
        };

        if (!user) {
            fetchUser();
        }
    }, [user]);


    useEffect(() => {

        const getTotalCars = async () => {
            try {
                const res = await axios.post(`${localhost}cars/by-company-id`, { companyId: user.companyId }, { withCredentials: true });
                console.log(res.data);
                setTotalCars(res.data.count);
            } catch (error) {

            }
        }

        const getReservations = async () => {
            try {
                const res = await axios.get(`${localhost}reservations/${user.companyId}`, { withCredentials: true });
                console.log(res.data.data);
                setReservations(res.data.data);
            } catch (error) {

            }
        }
        getReservations()
        getTotalCars();
    }, [totalCars])

    const handleLogout = async () => {
        await logout();
        navigate('/');
    }


    const addACar = async () => {
        try {
            const res = await axios.post(
                `${localhost}cars/save`,
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Credentials": true,

                    },
                    withCredentials: true,
                }
            );
            console.log(res);
        } catch (error) {
            console.log(`error inserting a car : ${error}`);
        }
    };


    return (
        <div className="dashboard">
            <GoBack />
            <h1>Korisnički profil</h1>
            <h2>{user.name}</h2>
            <p>Ukupno Objavljeno automobila: {totalCars}</p>
            {/* <TableWrapper data={reservations} /> */}
            <MuiTable reservations={reservations} />

            <div className="buttons">
                <button onClick={handleLogout}>Izlogujte se</button>
                <button>Dodajte auto</button>

            </div>

        </div>
    )

}