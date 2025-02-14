import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useModal from "../../Hooks/useModal";
import CancelReservation from "../../utils/Modal/ModalTypes/CancelReservation";
import { AnimatePresence } from "framer-motion";
import Modal from "../../utils/Modal/Modal";
import MotionButton from "../../Components/MotionButton/MotionButton";
import ReservationInfoList from "./ReservationInfoList";
import dayjs from "dayjs";
import CalendarModal from "../../utils/Modal/ModalTypes/CalendarModal";
import { apiRequest } from "../../utils/Api/apiService";


export default function ReservationDetails() {

    const { reservationId } = useParams();
    const [data, setData] = useState({});
    const { modalOpen, close, openModals, modalType } = useModal();

    useEffect(() => {
        const fetchReservation = async () => {
            try {
                const res = await apiRequest("GET", `reservations/idReservation/${reservationId}`);
                setData(res.data);

                const dateRange = {
                    start: dayjs(res.data.startDate).toISOString(),
                    end: dayjs(res.data.endDate).toISOString()
                };
                localStorage.setItem('dateRange', JSON.stringify(dateRange));

            } catch (error) {
                setData({});
                console.log(`error while fetching reservation ${error}`);
            }
        };

        fetchReservation();
    }, [reservationId]);



    return (
        <div className="reservation-details-container">
            <h2>Rezervacioni kod: {reservationId}</h2>
            {Object.keys(data).length === 0 ? (
                <p className="no-reservation-message">Nema podataka o ovoj rezervaciji.</p>
            ) : (
                <>
                    <ReservationInfoList data={data} />
                    <div className="buttons">
                        <MotionButton onClick={() => openModals("calendar-modal")} className='button' id='change-reservation-button' text={'Zameni Termin'} />
                        <MotionButton onClick={() => openModals("cancel-reservation")} className='button' id='cancel' text=' Otkaži Rezervaciju' />
                    </div>
                </>
            )}
            <AnimatePresence initial={false} mode='wait'>
                {modalOpen && modalType === "cancel-reservation" && (
                    <Modal type="cancel-reservation" modalOpen={modalOpen} handleClose={close}>
                        <CancelReservation personData={data} eventId={data.eventId} calendarId={data.calendarId} email={data.email} handleClose={close} />
                    </Modal>
                )}

                {modalOpen && modalType === "calendar-modal" && (
                    <Modal type="calendar-modal" modalOpen={modalOpen} handleClose={close}>
                        <CalendarModal personData={data} eventId={data.eventId} calendarId={data.calendarId} handleClose={close} reservationId={reservationId} />
                    </Modal>
                )}
            </AnimatePresence>

        </div>
    );

}
