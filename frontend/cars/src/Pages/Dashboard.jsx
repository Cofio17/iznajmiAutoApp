import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContextHelper";
import { useContext, useState, useEffect } from "react";

import MuiTable from "../Components/MuiTable/MuiTable";
import MotionButton from "../Components/MotionButton/MotionButton";
import { apiRequest } from "../utils/Api/apiService";


export default function DashBoard() {
    const navigate = useNavigate()
    const { user, logout, getUser } = useContext(AuthContext);
    const [totalCars, setTotalCars] = useState(0);
    const [reservations, setReservations] = useState([]);


    useEffect(() => {
        document.title = `Profil - ${user.name}`
        const fetchUser = async () => {
            try {
                const response = apiRequest("GET", `users/${JSON.parse(localStorage.getItem('user'))}`)
                getUser(response); // Postavlja korisnika u AuthContext
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
                const response = await apiRequest("POST", 'cars/by-company-id', { companyId: user.companyId })
                console.log(response);
                setTotalCars(response.count);
            } catch (error) {

            }
        }

        const getReservations = async () => {
            console.log(`useffect`);

            try {
                const response = await apiRequest("GET", `reservations/${user.companyId}`)
                console.log(response.data);
                setReservations(response.data);
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



    return (
        <div className="dashboard">

            <h1>Portal agencije</h1>
            <h2 id="agency-name">{user.name}</h2>
            <p>Ukupno Objavljeno automobila: {totalCars}</p>
            <MuiTable companyId={user.companyId} reservations={reservations} setReservations={setReservations} />

            <div className="buttons">
                <MotionButton onClick={handleLogout} className={'button'} text={'Izlogujte se'} />
                <MotionButton className={'button'} text={'Dodajte auto'} />
            </div>



        </div>
    )

}