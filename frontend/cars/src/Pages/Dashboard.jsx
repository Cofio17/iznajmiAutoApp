import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContextHelper";
import { useAuth } from "../Hooks/useAuth"
import { useContext } from "react";
import axios from "axios";


export default function DashBoard() {
    const navigate = useNavigate()
    const { token, user, logout } = useContext(AuthContext);
    const localhost = import.meta.env.VITE_LOCAL_HOST;
    axios.defaults.withCredentials = true;

    const handleLogout = async () => {
        await logout();
        navigate('/');
    }


    const addACar = async () => {
        try {

            const res = await axios.post(`${localhost}cars/save`,
                {
                    "licensePlate": "GGIZILOL",
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

                , {
                    headers: {
                        withCredentials: true,
                        Authorization: `Bearer ${token}`, // Dodavanje Authorization zaglavlja
                        "Content-Type": "application/json",// Postavljanje Content-Type zaglavlja
                    }

                });
            console.log(res);
        } catch (error) {
            console.log(`error inserting a car : ${error}`);

        }

    }
    return (
        <div className="dashboard">
            <h1>DashBoard {user.email}</h1>
            <button onClick={handleLogout}>logout</button>
            <button onClick={addACar}>Add A Car</button>


        </div>
    )




}