const express = require("express");
const { createEvent, accessBusyDates } = require("../service/googleCalendar.js");

const router = express.Router();

router.post("/create-event", async (req, res) => {
    const { summary, description, start, end, calendarId } = req.body;

    const eventDetails = {
        summary: description || "default description details",
        description: `Auto ID:${summary.carId} ${summary.email}, kontakt telefon: ${summary.number}` || "default summary details",
        start: {
            dateTime: start.dateTime, // Korišćenje tačnog formata sa vremenskom zonom
            timeZone: "Europe/Belgrade"  // Postavljamo vremensku zonu kao "Europe/Belgrade"
        },
        end: {
            dateTime: end.dateTime, // Isto važi za end
            timeZone: "Europe/Belgrade"
        },
        calendarId: calendarId
    };



    try {
        const event = await createEvent(eventDetails);
        console.log(`event created: ${event}`);
        res.status(200).json({ message: "Event created", eventLink: event.htmlLink });
    } catch (error) {
        console.error("Error creating event:", error);
        res.status(500).json({ message: "Error creating event", error: error.message });
    }
});


router.post('/get-busy-dates', async (req, res) => {
    try {
        const { calendarId } = req.body;
        console.log(calendarId);

        if (!calendarId) {
            return res.status(400).json({ message: "Calendar ID is missing" });
        }

        const result = await accessBusyDates(calendarId);
        console.log('bussy dates accessed');
        res.status(200).json({ message: "Busy dates accessed", dates: result });

    } catch (error) {
        console.error("Error creating event:", error);
        res.status(500).json({ message: "Error creating event", error: error.message });
    }
})

module.exports = router;
