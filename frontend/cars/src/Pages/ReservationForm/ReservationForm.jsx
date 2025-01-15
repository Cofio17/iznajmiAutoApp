import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import formatDate from "../../utils/convertDate";
import './reservationForm.scss'
import { TextField, FormControlLabel, Checkbox } from '@mui/material'
import { generateReservationEmailHtml } from "../../utils/emails/ReservationEmail";
import Modal from "../../utils/Modal/Modal";
import { AnimatePresence } from "framer-motion";
import GoBack from "../../Components/GoBack/GoBack";



export default function ReservationForm() {
    const location = useLocation();
    const navigate = useNavigate();
    const { car, selectedDate, carId } = location.state || {};
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


    //Modal
    const [modalOpen, setModalOpen] = useState(false);
    const close = () => {
        setModalOpen(false);
        navigate('/', { replace: true });
    }
    const open = () => setModalOpen(true);

    useEffect(() => {
        if (modalOpen) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }

        // Čisti efekat prilikom demontaže komponenta
        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, [modalOpen]);


    //UseEffect for moving data 
    useEffect(() => {
        if (!car || !selectedDate || !carId) {
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
                const reservationData = {
                    summary: { carId: carId, email, number, firstName, lastName, jmbg },
                    description: `Zakazan Auto: ${car.brand}: ${car.licensePlate}`,
                    start: { dateTime: formatDate(startDate) },
                    end: { dateTime: formatDate(endDate) },
                    calendarId: car.calendarId,
                };
                console.log(reservationData);

                const response = await axios.post(`${localhost}api/calendar/create-event`, reservationData, {
                    headers: { 'Content-Type': 'application/json' },
                });
                if (response.status === 200) {
                    await sendEmail(car.brand, car.model);
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
    const sendEmail = async (brand, model) => {
        const userFirstname = firstName;

        // Generisanje HTML sadržaja
        const emailHtml = generateReservationEmailHtml(userFirstname, brand, model);

        try {
            const response = await axios.post(
                `${localhost}email/send-email`,
                {
                    to: email, // Dinamička adresa korisnika
                    subject: "Uspešna rezervacija! Iznajmi.me",
                    html: emailHtml, // Prosleđivanje generisanog HTML sadržaja
                },
                {
                    headers: { "Content-Type": "application/json" }, // Ispravno postavljanje zaglavlja
                }
            );
            console.log("Email sent:", response.data);
        } catch (error) {
            console.error("Error sending email:", error);
        }
    };


    return (
        <div>
            <AnimatePresence initial={false} mode='wait'>
                {modalOpen && <Modal modalOpen={modalOpen} handleClose={close} />}
            </AnimatePresence>
            <GoBack />

            <form className="reservation-form" onSubmit={handleSubmit}>
                <h1>Rezervacija</h1>
                <p>Automobil: {car?.brand} {car?.model} {car.year}</p>
                <p>{selectedDate[0].toDateString()} - {selectedDate[1].toDateString()}</p>


                <TextField error={error} fullWidth id="firstname" required={true} variant="outlined" type="text" value={firstName} label={'Ime'} onChange={(e) => setFirstName(e.target.value)} className="mui-input reservation-form-input" />
                <TextField error={error} fullWidth id="lastName" required={true} variant="outlined" type="text" value={lastName} label={'Prezime'} onChange={(e) => setLastName(e.target.value)} className="mui-input reservation-form-input" />

                <TextField error={error} fullWidth id="jmbg" required={true} variant="outlined" type="text" value={jmbg} label={'unesite JMBG'} onChange={(e) => setJmbg(e.target.value)} className="mui-input reservation-form-input" />
                {errors.jmbg && <p style={{ color: 'red' }}>{errors.jmbg}</p>}

                <TextField error={error} fullWidth id="number" required={true} variant="outlined" type="tel" value={number} label={'mobilni telefon...'} onChange={(e) => setNumber(e.target.value)} className="mui-input reservation-form-input" />
                {errors.number && <p style={{ color: 'red' }}>{errors.number}</p>}

                <TextField error={error} fullWidth id="email" required={true} variant="outlined" type="email" value={email} label={'Email'} onChange={(e) => setEmail(e.target.value)} className="mui-input reservation-form-input" />
                {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}



                <FormControlLabel required control={
                    <Checkbox

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
