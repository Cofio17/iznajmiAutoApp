const express = require("express");
const { createEvent, accessBusyDates, searchCarsByDate, cancelEvent, changeEvent, cancelEventOnly, moveEvent } = require("../service/googleCalendar.js");
const Car = require('../models/car.js');

const router = express.Router();

/**
 * POST method for event creation
 * data is received and sent to 'createEvent' Function
 */
router.post("/create-event", async (req, res) => {
    //necessary data for creating an event
    const { summary, description, start, end, calendarId, reservationId } = req.body;

    const eventDetails = {
        summary: description || "default description details",
        description: `- ${summary.carId}\n - ${summary.firstName} ${summary.lastName}\n - ${summary.email}\n - ${summary.number}\nUkupna cena: ${summary.priceTotal}€ \n - ${summary.jmbg}` || "default summary details",
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
        reservationId,
        calendarId
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
    const { timeMin, timeMax, location, companyId } = req.body;
    let filteredCars = [];

    console.log(`timeMin ${timeMin}`);
    console.log(`timeMin ${timeMax}`);
    console.log(companyId);


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

        if (companyId) {
            filteredCars = response.filter((car) => {
                return (car.companyId.toString() === companyId)
            })
            res.status(200).json({ message: "Cars have been accessed", cars: filteredCars })
            return;
        }

        res.status(200).json({ message: "Cars have been accessed", cars: response })

    } catch (error) {
        res.status(500).json({ message: "error", er: error });
    }
})

/**
 * DELETE Method for deleting an event
 * cancelling a reservation
 */
router.delete('/cancel/:calendarId/:eventId', async (req, res) => {

    const { calendarId, eventId } = req.params

    try {
        await cancelEvent(calendarId, eventId);
        res.status(200).json({ message: "Događaj uspešno obrisan." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.patch('/change/:calendarId/:eventId', async (req, res) => {
    const { calendarId, eventId } = req.params
    const { startDate, endDate, priceTotal, daysTotal } = req.body
    try {
        await changeEvent(calendarId, eventId, startDate, endDate, priceTotal, daysTotal);
        res.status(200).json({ message: "Događaj uspešno modifikovan." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

})

router.post('/move/:calendarId/:eventId/:toCalendarId', async (req, res) => {
    console.clear();
    const { calendarId, eventId, toCalendarId } = req.params
    const car = req.body;

    try {
        const response = await moveEvent(calendarId, eventId, toCalendarId, car);
        res.status(200).json({ message: "Event moved succesfully.", data: response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;
