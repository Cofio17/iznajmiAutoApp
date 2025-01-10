import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import formatDate from "../../utils/convertDate";
import './reservationForm.scss'
import { TextField } from '@mui/material'


export default function ReservationForm() {
    const location = useLocation();
    const navigate = useNavigate();
    const { car, selectedDate, carId } = location.state || {};

    console.log(selectedDate[0].toDateString());


    useEffect(() => {
        if (!car || !selectedDate || !carId) {
            navigate('/');
        }
    }, [car, selectedDate, carId, navigate]);

    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [jmbg, setJmbg] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [error, setError] = useState(false);

    const validateForm = () => {
        const newErrors = {};
        if (!firstName.trim()) {
            newErrors.firstName = 'Ime je obavezno.';
            setError(true);
        }
        if (!lastName.trim()) {
            newErrors.lastName = 'Prezime je obavezno.';
        }
        if (!/^\d{13}$/.test(jmbg)) {
            newErrors.jmbg = 'JMBG mora imati tačno 13 cifara.';
        }
        if (!email.includes('@')) {
            newErrors.email = 'Email mora biti validan.';
        }
        if (!/^\d+$/.test(number) || number.length < 10) {
            newErrors.number = 'Neispravan format broja';
        }
        if (!termsAccepted) {
            newErrors.termsAccepted = 'Morate prihvatiti uslove.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            setIsSubmitting(true);
            try {
                const [startDate, endDate] = selectedDate;
                const reservationData = {
                    summary: { carId: carId, email, number, firstName, lastName, jmbg },
                    description: `Zakazan Auto: ${car.brand}: ${car.licensePlate}`,
                    start: { dateTime: formatDate(startDate) },
                    end: { dateTime: formatDate(endDate) },
                    calendarId: car.calendarId,
                };
                console.log(reservationData);

                const response = await axios.post(`http://localhost:5000/api/calendar/create-event`, reservationData, {
                    headers: { 'Content-Type': 'application/json' },
                });
                setEmail('');
                setNumber('');
                setFirstName('');
                setLastName('');
                setJmbg('');
                setTermsAccepted(false);
            } catch (error) {
                console.error("Error sending data:", error);
                setErrors({ server: 'Došlo je do greške. Pokušajte ponovo.' });
            } finally {
                setIsSubmitting(false);
                setError(false);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Rezervacija</h1>
            <p>Automobil: {car?.brand}</p>
            <p>{selectedDate[0].toDateString()} - {selectedDate[1].toDateString()}</p>

            <label htmlFor="firstName">Ime</label>
            <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Unesite ime" />
            {errors.firstName && <p style={{ color: 'red' }}>{errors.firstName}</p>}

            <label htmlFor="firstname">Ime</label>
            <TextField error={error} fullWidth id="firstname" required={true} variant="outlined" type="text" value={firstName} label={'Ime'} onChange={(e) => setFirstName(e.target.value)} className="mui-input" />

            <label htmlFor="lastName">Prezime</label>
            <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Unesite prezime" />
            {errors.lastName && <p style={{ color: 'red' }}>{errors.lastName}</p>}

            <label htmlFor="jmbg">JMBG</label>
            <input type="text" id="jmbg" value={jmbg} onChange={(e) => setJmbg(e.target.value)} placeholder="Unesite JMBG" />
            {errors.jmbg && <p style={{ color: 'red' }}>{errors.jmbg}</p>}

            <label htmlFor="number">Broj Telefona</label>
            <input type="text" id="number" value={number} onChange={(e) => setNumber(e.target.value)} placeholder="Unesite broj telefona" />
            {errors.number && <p style={{ color: 'red' }}>{errors.number}</p>}

            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Unesite email" />
            {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}

            <div className="checkbox">
                <input type="checkbox" id="terms" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} />
                <label htmlFor="terms">Prihvatam uslove korišćenja</label>
                {errors.termsAccepted && <p style={{ color: 'red' }}>{errors.termsAccepted}</p>}
            </div>

            <button type="submit" className="button" disabled={isSubmitting}>
                {isSubmitting ? 'Slanje...' : 'Rezerviši'}
            </button>

            {errors.server && <p style={{ color: 'red' }}>{errors.server}</p>}
        </form>
    );
}
