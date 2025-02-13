import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useModal from "../../Hooks/useModal";
import CancelReservation from "../../utils/Modal/ModalTypes/CancelReservation";
import { AnimatePresence } from "framer-motion";
import Modal from "../../utils/Modal/Modal";
import MotionButton from "../../Components/MotionButton/MotionButton";
import ReservationInfoList from "./ReservationInfoList";
import CalendarComponent from "../../Components/Calendar/CalendarComponent";
import dayjs from "dayjs";
import { apiRequest } from "../../utils/Api/apiService";


export default function ReservationDetails() {

    const { reservationId } = useParams();
    const [data, setData] = useState({});
    const { modalOpen, open, close } = useModal();
    const [selectedDate, setSelectedDate] = useState([]);

    const handleSelectedData = (date) => {
        setSelectedDate(date);
    };

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
                        <MotionButton className='button' id='change-reservation-button' text={'Zameni Termin'} />
                        <MotionButton onClick={open} className='button' id='cancel' text=' Otkaži Rezervaciju' />
                    </div>
                </>
            )}

            {data.calendarId && (
                <div className="cursor-not-allowed">
                    <div className="disabled">
                        <CalendarComponent
                            calendarId={data.calendarId}
                            fetchDates={handleSelectedData}
                            isReservationPage={true}
                        />
                    </div>
                </div>


            )}

            <AnimatePresence initial={false} mode='wait'>
                {modalOpen && <Modal type={'cancel-reservation'} modalOpen={modalOpen} handleClose={close} > <CancelReservation personData={data} eventId={data.eventId} calendarId={data.calendarId} email={data.email} handleClose={close} /></Modal>}
            </AnimatePresence>

        </div>
    );

}
