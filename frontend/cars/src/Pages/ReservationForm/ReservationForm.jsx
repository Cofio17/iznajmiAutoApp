import { useLocation, useNavigate } from "react-router-dom";
import { apiRequest } from "../../utils/Api/apiService";
import { useEffect, useState } from "react";
import './reservationForm.scss'
import { TextField, FormControlLabel, Checkbox } from '@mui/material'
import { generateReservationEmailHtml } from "../../utils/emails/emailUtils";
import Modal from "../../utils/Modal/Modal";
import { AnimatePresence } from "framer-motion";
import useModal from "../../Hooks/useModal";
import SuccesfulReservation from "../../utils/Modal/ModalTypes/SuccesfulReservation";
import { createDate } from "../../utils/createDate";
import generateReservationId from "../../utils/generateId";
import MotionButton from "../../Components/MotionButton/MotionButton";
import Input from "../../Components/Filter/Input";


export default function ReservationForm() {
    const location = useLocation();
    const navigate = useNavigate();
    const { car, selectedDate, carId, priceTotal, daysTotal, selectedTimes } = location.state || {};


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
        if (!/^\d{9}(\d{4})?$/.test(jmbg)) {
            newErrors.jmbg = 'Neispravan format matičnog broja.';
        }
        if (!email.includes('@')) {
            newErrors.email = 'Email mora biti validan.';
        }
        if (!/^\+?\d+$/.test(number) || number.length < 9) {
            newErrors.number = 'Neispravan format broja';
        }


        if (!termsAccepted) {
            newErrors.termsAccepted = 'Morate prihvatiti uslove.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    function resetForm() {
        setEmail('');
        setNumber('');
        setFirstName('');
        setLastName('');
        setJmbg('');
        setTermsAccepted(false);
    }

    /**
     * If validateForm() is true Google calendar API triggers and if succesful, event is being created in the  calendar
     * @param {Event} event 
     */
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            const [startDate, endDate] = selectedDate;
            const { startHours, endHours } = selectedTimes;

            const reservationData = {
                summary: { carId, email, number, firstName, lastName, jmbg, priceTotal, daysTotal, brand: car.brand, model: car.model },
                description: `Zakazan Auto: ${car.brand}: ${car.licensePlate}`,
                start: { dateTime: createDate(startDate, startHours) },
                end: { dateTime: createDate(endDate, endHours) },
                calendarId: car.calendarId,
                reservationId: generateReservationId()
            };

            const response = await apiRequest("POST", "api/calendar/create-event", reservationData);

            if (response) {
                await sendEmail(car.brand, car.model, reservationData);
                open();
            }
            resetForm();

        } catch (error) {
            console.error("Error sending data:", error);
            setErrors({ server: 'Došlo je do greške. Pokušajte ponovo.' });
        } finally {
            setIsSubmitting(false);
            setError(false);
        }
    };


    /**
     * On succesfull api call to google calendar, html mail is generated and sent to the user who made a reservation
     * @param {string} brand - brand of a car
     * @param {string} model  - model of a car
     */
    const sendEmail = async (brand, model, reservationData) => {

        const emailContent = {
            to: email,
            subject: "Uspešna rezervacija!",
            html: generateReservationEmailHtml(firstName, brand, model, reservationData)
        }
        try {
            const response = await apiRequest("POST", "email/send-email", emailContent);
            console.log("Email sent:", response);
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

        if (fieldName === 'jmbg' && !/^\d{9}(\d{4})?$/.test(jmbg)) {
            newErrors.jmbg = 'Neispravan format JMBG.';
        } else if (fieldName === 'jmbg') {
            delete newErrors.jmbg;
        }

        if (fieldName === 'email' && !value.includes('@')) {
            newErrors.email = 'Email mora biti validan.';
        } else if (fieldName === 'email') {
            delete newErrors.email;
        }

        if (fieldName === 'number' && (!/^\+?\d+$/.test(number) || value.length < 9)) {
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


            <form className="reservation-form" onSubmit={handleSubmit}>
                <h1>Rezervacija</h1>
                <p>Automobil: {car?.brand} {car?.model} {car.year}</p>
                <p className="selected-dates">
                    {selectedDate[0].toLocaleDateString("sr-Latn-RS", { weekday: "short", day: "numeric", month: "short", year: "numeric" })}{'-'}
                    {selectedDate[1].toLocaleDateString("sr-Latn-RS", { weekday: "short", day: "numeric", month: "short", year: "numeric" })}

                </p>
                <h3><b>Ukupna cena:</b> {priceTotal}€</h3>


                <TextField error={error} fullWidth id="firstname" required={true} variant="outlined" type="text" value={firstName} label={'Ime'} onChange={(e) => setFirstName(e.target.value)} className="mui-input reservation-form-input" />
                <TextField error={error} fullWidth id="lastName" required={true} variant="outlined" type="text" value={lastName} label={'Prezime'} onChange={(e) => setLastName(e.target.value)} className="mui-input reservation-form-input" />
                <TextField onBlur={(e) => handleBlur('jmbg', e.target.value)} error={Boolean(errors.jmbg)} helperText={errors.jmbg || 'JBMG ili PIB firme'} fullWidth id="jmbg" required={true} variant="outlined" type="text" value={jmbg} label={'JMBG/PIB'} onChange={(e) => setJmbg(e.target.value)} className="mui-input reservation-form-input" />
                <TextField onBlur={(e) => handleBlur('number', e.target.value)} error={Boolean(errors.number)} helperText={errors.number || ''} placeholder="06..." fullWidth id="number" required={true} variant="outlined" type="tel" value={number} label={'Mobilni'} onChange={(e) => setNumber(e.target.value)} className="mui-input reservation-form-input" />
                <TextField onBlur={(e) => handleBlur('email', e.target.value)} error={Boolean(errors.email)} helperText={errors.email || ''} autoComplete="on" placeholder="email@example.com" fullWidth id="email" required={true} variant="outlined" type="email" value={email} label={'Email'} onChange={(e) => setEmail(e.target.value)} className="mui-input reservation-form-input" />

                {/* <FormControlLabel required control={
                    <Checkbox
                        name="terms"
                        onChange={(e) => { setTermsAccepted(e.target.checked) }}
                        size="small"
                        sx={{
                            marginLeft: 2,
                            color: '#2D6A4F',
                            '&.Mui-checked': { color: '#2D6A4F' }
                        }} />} label={'Prihvatam uslove korišćenja'} /> */}
                <Input required={true} label={'Prihvatam uslove korišćenja'} checked={termsAccepted} onChangeProp={(e) => { setTermsAccepted(e.target.checked) }} />

                <MotionButton type="submit" className="button" disabled={isSubmitting} text={isSubmitting ? 'Slanje...' : 'Rezerviši'} />

                {errors.server && <p style={{ color: 'red' }}>{errors.server}</p>}

            </form>

        </div>

    );
}

