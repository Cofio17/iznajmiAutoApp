import { useState } from "react";
import { generateCanceEmailHtml } from "../../emails/emailUtils";
import SuccesfulCancel from "./SuccesfulCancel";
import { apiRequest } from "../../Api/apiService";
import MotionButton from "../../../Components/MotionButton/MotionButton";

export default function CancelReservation({ handleClose, calendarId, eventId, email, personData }) {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [cancelReservation, setCancelReservation] = useState(false);


    /**
     * On succesfull API call to Google Calendar, an HTML email is generated and sent to the user who made a reservation.
     */
    const sendEmail = async () => {
        const name = personData.buyer;
        const emailContent = {
            to: email,
            subject: "Uspešno otkazivanje! Iznajmi.me",
            html: generateCanceEmailHtml(name)
        }

        try {
            const response = await apiRequest("POST", "email/send-email", emailContent);
            console.log("Email sent:", response);

        } catch (error) {
            console.error("Error sending email:", error);
        }


    };

    const cancelAReservation = async () => {
        setLoading(true);
        setError("");

        try {
            const res = await apiRequest("DELETE", `api/calendar/cancel/${calendarId}/${eventId}`);
            console.log("Rezervacija otkazana:", res);
            await sendEmail();
            setCancelReservation(true);
        } catch (error) {
            console.error("Greška pri otkazivanju rezervacije:", error);
            setError("Došlo je do greške prilikom otkazivanja rezervacije.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {cancelReservation ? (
                <SuccesfulCancel />
            ) : (
                <div>
                    <div className="heading">
                        <h2>Otkazivanje rezervacije</h2>
                        <h3>{personData.brand} {personData.model}</h3>
                        <p>Da li ste sigurni da želite da otkažete rezervaciju?</p>
                    </div>

                    {error && <p className="error-message">{error}</p>}

                    <div className="main-content">
                        <div className="buttons">
                            {/* <Button
                                id="cancel-button"
                                variant="outlined"
                                onClick={cancelAReservation}
                                disabled={loading} // Sprečava više klikova dok traje zahtev
                            >
                                {loading ? "Otkazivanje..." : "Da, otkazujem"}
                            </Button>
                            <Button id="second-thought-button" variant="contained" onClick={handleClose}>
                                Ne želim, predomislio sam se
                            </Button> */}
                            <MotionButton text={loading ? "Otkazivanje..." : "Da, otkazujem"} id='cancel-button' onClick={cancelAReservation} disabled={loading} />
                            <MotionButton text={"Ne želim, predomislio sam se"} id='second-thought-button' onClick={handleClose} disabled={loading} />

                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
