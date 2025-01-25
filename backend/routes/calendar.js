const express = require("express");
const { createEvent, accessBusyDates, searchCarsByDate } = require("../service/googleCalendar.js");
const Car = require('../models/car.js');

const router = express.Router();

/**
 * POST method for event creation
 * data is received and sent to 'createEvent' Function
 */
router.post("/create-event", async (req, res) => {
    //necessary data for creating an event
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

    const reservationDetails = {
        summary,
        description,
        start,
        end,
    }

    try {
        //creating an event
        const event = await createEvent(eventDetails, reservationDetails);
        console.log(`event created: ${event}`);
        res.status(200).json({ message: "Event created", eventLink: event.htmlLink });
    } catch (error) {
        console.error("Error creating event:", error);
        res.status(500).json({ message: "Error creating event", error: error.message });
    }
});

/**
 * POST method for receiving busy dates
 * data is received and sent to 'accessBusyDates' Function
 */
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


/**
 * POST Method for receiving busy dates for every car 
 * 
 */
router.post('/search', async (req, res) => {
    const { timeMin, timeMax, location } = req.body;
    let filteredCars = [];

    console.log(`timeMin ${timeMin}`);
    console.log(`timeMin ${timeMax}`);

    try {
        const cars = await Car.find();
        const response = await searchCarsByDate(cars, timeMin, timeMax);

        if (location) {
            filteredCars = response.filter((car) => {
                return (car.location === location)
            })
            res.status(200).json({ message: "Cars have been accessed", cars: filteredCars })
            return;
        }

        res.status(200).json({ message: "Cars have been accessed", cars: response })

    } catch (error) {
        res.status(500).json({ message: "error", er: error });
    }
})

module.exports = router;
