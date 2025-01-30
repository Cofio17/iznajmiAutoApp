import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import formatDate from "../../utils/convertDate";
import './reservationForm.scss'
import { TextField, FormControlLabel, Checkbox } from '@mui/material'
import { generateReservationEmailHtml } from "../../utils/emails/emailUtils";
import Modal from "../../utils/Modal/Modal";
import { AnimatePresence } from "framer-motion";
import GoBack from "../../Components/GoBack/GoBack";
import useModal from "../../Hooks/useModal";
import SuccesfulReservation from "../../utils/Modal/ModalTypes/SuccesfulReservation";
import { createDate } from "../../utils/createDate";
import generateReservationId from "../../utils/generateId";


export default function ReservationForm() {
    const location = useLocation();
    const navigate = useNavigate();
    const { car, selectedDate, carId, priceTotal, daysTotal, selectedTimes } = location.state || {};
    const localhost = import.meta.env.VITE_LOCAL_HOST;


    //wall of state- FORM STATES
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [jmbg, setJmbg] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(false);
    const { modalOpen, open, close } = useModal()


    //UseEffect for moving data 
    useEffect(() => {
        if (!car || !selectedDate || !carId || !priceTotal) {
            navigate('/');
        }
    }, [car, selectedDate, carId, navigate]);


    //Form validation for inccorect input
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
            newErrors.jmbg = 'Neispravan format JMBG.';
        }
        if (!email.includes('@')) {
            newErrors.email = 'Email mora biti validan.';
        }
        if (!/^\+\d+$/.test(number) || number.length < 9) {
            newErrors.number = 'Neispravan format broja';
        }

        if (!termsAccepted) {
            newErrors.termsAccepted = 'Morate prihvatiti uslove.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    /**
     * If validateForm() is true Google calendar API triggers and if succesful, event is being created in the  calendar
     * @param {Event} event 
     */
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            setIsSubmitting(true);
            try {
                const [startDate, endDate] = selectedDate;
                const startHours = selectedTimes.startHours;
                const endHours = selectedTimes.endHours;

                const reservationData = {
                    summary: { carId: carId, email, number, firstName, lastName, jmbg, priceTotal, daysTotal, brand: car.brand, model: car.model },
                    description: `Zakazan Auto: ${car.brand}: ${car.licensePlate}`,
                    start: { dateTime: createDate(startDate, startHours) },
                    end: { dateTime: createDate(endDate, endHours) },
                    calendarId: car.calendarId,
                    reservationId: generateReservationId()
                };
                console.log(reservationData);

                const response = await axios.post(`${localhost}api/calendar/create-event`, reservationData, {
                    headers: { 'Content-Type': 'application/json' },
                });
                if (response.status === 200) {
                    await sendEmail(car.brand, car.model, reservationData);
                    open();

                }

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

    /**
     * On succesfull api call to google calendar, html mail is generated and sent to the user who made a reservation
     * @param {string} brand - brand of a car
     * @param {string} model  - model of a car
     */
    const sendEmail = async (brand, model, reservationData) => {
        const userFirstname = firstName;

        const emailHtml = generateReservationEmailHtml(userFirstname, brand, model, reservationData);

        try {
            const response = await axios.post(
                `${localhost}email/send-email`,
                {
                    to: email,
                    subject: "Uspešna rezervacija! Iznajmi.me",
                    html: emailHtml,
                },
                {
                    headers: { "Content-Type": "application/json" },
                }
            );
            console.log("Email sent:", response.data);
        } catch (error) {
            console.error("Error sending email:", error);
        }
    };

    const handleBlur = (fieldName, value) => {
        const newErrors = { ...errors };

        // Provera validacije za svako polje
        if (fieldName === 'firstName' && !value.trim()) {
            newErrors.firstName = 'Ime je obavezno.';
        } else if (fieldName === 'firstName') {
            delete newErrors.firstName;
        }

        if (fieldName === 'lastName' && !value.trim()) {
            newErrors.lastName = 'Prezime je obavezno.';
        } else if (fieldName === 'lastName') {
            delete newErrors.lastName;
        }

        if (fieldName === 'jmbg' && !/^\d{13}$/.test(value)) {
            newErrors.jmbg = 'Neispravan format JMBG.';
        } else if (fieldName === 'jmbg') {
            delete newErrors.jmbg;
        }

        if (fieldName === 'email' && !value.includes('@')) {
            newErrors.email = 'Email mora biti validan.';
        } else if (fieldName === 'email') {
            delete newErrors.email;
        }

        if (fieldName === 'number' && (!/^\+\d+$/.test(value) || value.length < 9)) {
            newErrors.number = 'Neispravan format broja.';
        } else if (fieldName === 'number') {
            delete newErrors.number;
        }

        setErrors(newErrors); // Ažuriraj greške
    };

    return (
        <div>
            <AnimatePresence initial={false} mode='wait'>
                {modalOpen && <Modal type={'succesful'} modalOpen={modalOpen} handleClose={close} > <SuccesfulReservation handleClose={close} /></Modal>}
            </AnimatePresence>
            <GoBack />

            <form className="reservation-form" onSubmit={handleSubmit}>
                <h1>Rezervacija</h1>
                <p>Automobil: {car?.brand} {car?.model} {car.year}</p>
                <p>{selectedDate[0].toDateString()} - {selectedDate[1].toDateString()}</p>


                <TextField error={error} fullWidth id="firstname" required={true} variant="outlined" type="text" value={firstName} label={'Ime'} onChange={(e) => setFirstName(e.target.value)} className="mui-input reservation-form-input" />
                <TextField error={error} fullWidth id="lastName" required={true} variant="outlined" type="text" value={lastName} label={'Prezime'} onChange={(e) => setLastName(e.target.value)} className="mui-input reservation-form-input" />


                <TextField onBlur={(e) => handleBlur('jmbg', e.target.value)} error={Boolean(errors.jmbg)} helperText={errors.jmbg || ''} fullWidth id="jmbg" required={true} variant="outlined" type="text" value={jmbg} label={'unesite JMBG'} onChange={(e) => setJmbg(e.target.value)} className="mui-input reservation-form-input" />


                <TextField onBlur={(e) => handleBlur('number', e.target.value)} error={Boolean(errors.number)} helperText={errors.number || 'unesite broj u formatu +381123456789'} placeholder="+3816" fullWidth id="number" required={true} variant="outlined" type="tel" value={number} label={'Mobilni'} onChange={(e) => setNumber(e.target.value)} className="mui-input reservation-form-input" />

                <TextField error={Boolean(errors.email)} helperText={errors.email || ''} onBlur={(e) => handleBlur('email', e.target.value)} autoComplete="on" placeholder="email@example.com" fullWidth id="email" required={true} variant="outlined" type="email" value={email} label={'Email'} onChange={(e) => setEmail(e.target.value)} className="mui-input reservation-form-input" />




                <FormControlLabel required control={
                    <Checkbox
                        name="terms"
                        onChange={(e) => { setTermsAccepted(e.target.checked) }}
                        size="small"
                        sx={{
                            marginLeft: 2,
                            color: '#B69121',
                            '&.Mui-checked': { color: '#B69121' }
                        }} />} label={'Prihvatam uslove korišćenja'} />

                <button type="submit" className="button" disabled={isSubmitting}>
                    {isSubmitting ? 'Slanje...' : 'Rezerviši'}
                </button>
                {errors.server && <p style={{ color: 'red' }}>{errors.server}</p>}

            </form>

        </div>

    );
}