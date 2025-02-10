import { Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { generateCanceEmailHtml } from "../../emails/emailUtils";

export default function CancelReservation({ handleClose, calendarId, eventId, email, personData }) {
    const localhost = import.meta.env.VITE_LOCAL_HOST;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    /**
       * On succesfull api call to google calendar, html mail is generated and sent to the user who made a reservation
       * @param {string} brand - brand of a car
       * @param {string} model  - model of a car
       */
    const sendEmail = async () => {

        const name = personData.buyer
        const emailHtml = generateCanceEmailHtml(name);
        try {
            const response = await axios.post(
                `${localhost}email/send-email`,
                {
                    to: email,
                    subject: "Uspešno otkazivanje! Iznajmi.me",
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

    const cancelAReservation = async () => {
        setLoading(true);
        setError("");

        try {
            const res = await axios.delete(`${localhost}api/calendar/cancel/${calendarId}/${eventId}`);
            console.log("Rezervacija otkazana:", res.data);
            await sendEmail();
            handleClose(); // Zatvara modal ili prebacuje korisnika dalje
        } catch (error) {
            console.error("Greška pri otkazivanju rezervacije:", error);
            setError("Došlo je do greške prilikom otkazivanja rezervacije.");
        } finally {
            setLoading(false);
        }
    };



    return (
        <>
            <div className="heading">
                <h2>Otkazivanje rezervacije</h2>
                <p>Da li ste sigurni da želite da otkažete rezervaciju?</p>
            </div>

            {error && <p className="error-message">{error}</p>}

            <div className="main-content">
                <div className="buttons">
                    <Button
                        id="cancel-button"
                        variant="outlined"
                        onClick={cancelAReservation}
                        disabled={loading} // Sprečava više klikova dok traje zahtev
                    >
                        {loading ? "Otkazivanje..." : "Da, otkazujem"}
                    </Button>
                    <Button id="second-thought-button" variant="contained" onClick={handleClose}>
                        Ne želim, predomislio sam se
                    </Button>
                </div>
            </div>
        </>
    );
}
