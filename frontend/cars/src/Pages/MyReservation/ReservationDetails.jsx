import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { motion } from 'framer-motion'
import useModal from "../../Hooks/useModal";
import CancelReservation from "../../utils/Modal/ModalTypes/CancelReservation";
import { AnimatePresence } from "framer-motion";
import Modal from "../../utils/Modal/Modal";

const excludeKeys = ["__v", "_id", "updatedAt", "calendarId", "jmbg", "email", "number", "eventId", "reservationId", "companyId", "createdAt"];

const keyMappings = {
    startDate: "Početni datum",
    endDate: "Krajnji datum",
    model: "Model",
    brand: "Brend",
    priceTotal: "Ukupna Cena(€)",
    duration: 'Trajanje u danima',
    buyer: 'Kupac',
    pricePerDay: 'Cena po danu(€)',
    licensePlate: "Registracija"
};

export default function ReservationDetails() {
    const { reservationId } = useParams();
    const [data, setData] = useState({});
    const localhost = import.meta.env.VITE_LOCAL_HOST;
    const { modalOpen, open, close } = useModal();
    const [reservationData, setReservationData] = useState({
        calendarId: null,
        eventId: null,
        email: null
    })

    useEffect(() => {
        const fetchReservation = async () => {
            try {
                const res = await axios.get(`${localhost}reservations/idReservation/${reservationId}`);
                console.log(res.data.data);
                setData(res.data.data);
                setReservationData({ calendarId: res.data.data.calendarId, eventId: res.data.data.eventId, email: res.data.data.email })
            } catch (error) {
                setData({});
                console.log(`error while fetching reservation ${error}`);
            }
        };
        fetchReservation();
    }, [reservationId]);


    return (
        <div className="reservation-details-container">
            <h2>Moja Rezervacija: {reservationId}</h2>

            {Object.keys(data).length === 0 ? (
                <p className="no-reservation-message">Nema podataka o ovoj rezervaciji.</p>
            ) : (
                <ul>
                    {Object.keys(data)
                        .filter((key) => !excludeKeys.includes(key))
                        .map((key) => (
                            <li key={key}>
                                <strong className="primary-color">{keyMappings[key] || key}:</strong>{" "}
                                <span className="bold">
                                    {key.includes("Date")
                                        ? dayjs(data[key]).add(2, "hours").format("DD/MM/YYYY HH:mm")
                                        : data[key]}
                                </span>
                            </li>
                        ))}
                </ul>
            )}
            <div className="buttons">
                <motion.button
                    whileTap={{ scale: 1.1 }}
                    whileHover={{
                        scale: 0.95,
                        transition: { duration: 0.05 },
                    }}
                    className="button"
                    id="cancel-change-reservation-button"
                    variant="contained"
                    sx={{ ml: 2 }}
                >
                    Zameni Termin
                </motion.button>

                <motion.button
                    onClick={open}
                    whileTap={{ scale: 1.1 }}
                    whileHover={{
                        scale: 0.95,
                        transition: { duration: 0.05 },
                    }}
                    className="button"
                    id="cancel"
                    variant="contained"
                    sx={{ ml: 2 }}
                >
                    Otkaži Rezervaciju
                </motion.button>
            </div>

            <AnimatePresence initial={false} mode='wait'>
                {modalOpen && <Modal type={'succesful'} modalOpen={modalOpen} handleClose={close} > <CancelReservation personData={data} eventId={reservationData.eventId} calendarId={reservationData.calendarId} email={reservationData.email} handleClose={close} /></Modal>}
            </AnimatePresence>

        </div>
    );

}
