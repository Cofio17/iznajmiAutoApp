const { google } = require("googleapis");
const addingXMonths = require("../utils/addingMonths.js");
const reservationService = require("./reservationService.js");

//setting current date
const todayISO = new Date().toISOString();
//setting current date + 3 months
const endDate = addingXMonths(3);

/**
 * // authentification using client email and client private key and scope definition
 */
const auth = new google.auth.JWT(
    process.env.CLIENT_RENTACAR_EMAIL,
    null,
    process.env.CLIENT_RENTACAR_PRIVATE_KEY,
    ["https://www.googleapis.com/auth/calendar"]
);

/**
 * Creates an event in Google Calendar and saves the corresponding reservation in the database.
 *
 * @param {Object} eventDetails - The details of the event to be created.
 * @param {string} eventDetails.calendarId - ID of the Google Calendar where the event will be created.
 * @param {string} eventDetails.start - Start time of the event (ISO 8601 format).
 * @param {string} eventDetails.end - End time of the event (ISO 8601 format).
 * @param {string} eventDetails.summary - Event summary or title.
 * @param {string} eventDetails.description - Description of the event.
 * @returns {Object} Google Calendar event data.
 * @throws {Error} If the event creation or reservation saving fails.
 */
async function createEvent(eventDetails, reservationDetailsParam) {
    if (!eventDetails || !eventDetails.calendarId) {
        throw new Error(
            "Invalid event details: Missing calendarId or eventDetails."
        );
    }

    //calendar = object of a calendar
    //google.calendar = function from googleapis library
    const calendar = google.calendar({ version: "v3", auth });

    try {
        const response = await calendar.events.insert({
            calendarId: eventDetails.calendarId,
            requestBody: eventDetails,
        });
        console.log(
            "Event successfully created in Google Calendar:",
            response.data
        );

        const reservationDetails = buildReservationDetails(
            reservationDetailsParam,
            response.data.id
        );

        const reservationResponse = await reservationService.saveReservation(
            reservationDetails,
            eventDetails.calendarId
        );
        console.log("Reservation saved successfully:", reservationResponse);

        return response.data;
    } catch (error) {
        console.error("Error creating event:", error);
        throw new Error("Unable to create event");
    }
}

/**
 * Creates an event in Google Calendar, without saving a reservation.
 *
 * @param {Object} eventDetails - The details of the event to be created.
 * @param {string} eventDetails.calendarId - ID of the Google Calendar where the event will be created.
 * @param {string} eventDetails.start - Start time of the event (ISO 8601 format).
 * @param {string} eventDetails.end - End time of the event (ISO 8601 format).
 * @param {string} eventDetails.summary - Event summary or title.
 * @param {string} eventDetails.description - Description of the event.
 * @returns {Object} Google Calendar event data.
 * @throws {Error} If the event creation or reservation saving fails.
 */
async function createEventOnly(eventDetails) {
    if (!eventDetails || !eventDetails.calendarId) {
        throw new Error(
            "Invalid event details: Missing calendarId or eventDetails."
        );
    }

    //calendar = object of a calendar
    //google.calendar = function from googleapis library
    const calendar = google.calendar({ version: "v3", auth });

    try {
        const response = await calendar.events.insert({
            calendarId: eventDetails.calendarId,
            requestBody: eventDetails,
        });
        console.log(
            "Event successfully created in Google Calendar:",
            response.data
        );
        return response.data;
    } catch (error) {
        console.error("Error creating event:", error);
        throw new Error("Unable to create event");
    }
}

/**
 * //Accessing busy days in a specific calendar
 * @param {string} calendarId -calendar ID
 * @returns {Promise<Array>} -array of busy events
 */
async function accessBusyDates(calendarId) {
    //creating calendar object
    const calendar = google.calendar({ version: "v3", auth });

    //checking every busy day in period of 3 months
    const response = await calendar.freebusy.query({
        requestBody: {
            timeMin: todayISO,
            timeMax: endDate,
            items: [
                {
                    id: calendarId,
                },
            ],
        },
    });
    return response.data;
}
/**
 * Searching for available cars in the given period
 * @param {Array} cars -array of cars
 * @param {Date} timeMin -start date of period
 * @param {Date} timeMax - end date of period
 * @returns {Promise<Array>}- array of cars that are free in period
 */
async function searchCarsByDate(cars, timeMin, timeMax) {
    const calendar = google.calendar({ version: "v3", auth });

    //korigovano-potrebno mozda povecati
    const adjustedTimeMax = new Date(
        new Date(timeMax).getTime() + 12 * 60 * 60 * 1000
    ).toISOString();

    //making array of objects with pair of id:calendarId <String>
    const calendarIds = cars.map((car) => {
        return { id: car.calendarId };
    });

    const response = await calendar.freebusy.query({
        requestBody: {
            timeMin: timeMin,
            timeMax: adjustedTimeMax,
            items: [...calendarIds],
        },
    });

    const freeCars = cars.filter((car) => {
        return response.data.calendars[car.calendarId].busy.length === 0;
    });

    return freeCars;
}

/**
 * Helper function for creating reservation object
 * @param {Object} eventDetails - event details
 * @param {String} eventId - event id
 * @returns {Object} - reservation details
 */
function buildReservationDetails(eventDetails, eventId) {
    return {
        startDate: eventDetails.start.dateTime,
        endDate: eventDetails.end.dateTime,
        licensePlate: eventDetails.summary.carId || "Unknown licensePlate",
        brand: eventDetails.summary.brand || "Unknown Brand",
        model: eventDetails.summary.model || "Unknown Model",
        pricePerDay: eventDetails.summary.priceTotal / eventDetails.summary.daysTotal || 0,
        priceTotal: eventDetails.summary.priceTotal || 0,
        duration: eventDetails.summary.daysTotal || 0,
        buyer: `${eventDetails.summary.firstName || "Unknown"} ${eventDetails.summary.lastName || "Buyer"}`,
        jmbg: eventDetails.summary.jmbg || "Unknown JMBG",
        email: eventDetails.summary.email || "Unknown email",
        number: eventDetails.summary.number || "Unknown Contact",
        eventId: eventId || "Unknown event id",
        reservationId: eventDetails.reservationId,
        calendarId: eventDetails.calendarId,
    };
}

/**
 * Deleting an event/Cancel a reservation
 * @param {String} calendarId - calendar ID
 * @param {String} eventId  - event ID
 * @returns
 */
async function cancelEvent(calendarId, eventId) {
    const calendar = google.calendar({ version: "v3", auth });

    try {
        const res = await calendar.events.delete({
            calendarId: calendarId,
            eventId: eventId,
        });
        if (res.status !== 204) {
            throw new Error("Error while deleting an event from the google calendar");
        }
        console.log(`event deleted!`);

        const deletedReservation =
            await reservationService.findAndDeleteReservation(eventId);

        if (!deletedReservation) {
            console.warn(
                `Reservation with ${eventId} could not be found in database`
            );
        } else {
            console.log(`Reservation deleted from database!`);
        }
        return {
            success: true,
            message: "Događaj i rezervacija uspešno obrisani.",
        };
    } catch (error) {
        console.error(`error while deleting an event  ${error}`);
        throw new Error("Nije moguće obrisati događaj. Pokušajte ponovo.");
    }
}

/**
 * Deleting an event without cancelling a reservation
 * @param {String} calendarId - calendar ID
 * @param {String} eventId  - event ID
 * @returns
 */
async function cancelEventOnly(calendarId, eventId) {
    const calendar = google.calendar({ version: "v3", auth });

    const event = await calendar.events.get({
        calendarId: calendarId,
        eventId: eventId,
    });
    const eventData = event.data;
    console.log(eventData.start);

    try {
        await calendar.events.delete({
            calendarId: calendarId,
            eventId: eventId
        });

        console.log("Event deleted from Google Calendar!");
        return { success: true, message: "Event deleted from Google Calendar!" };

    } catch (error) {
        console.error(`Error while deleting an event: ${error.message}`);
        throw new Error(`Nije moguće obrisati događaj: ${error.message}`);
    }
}

/**
 * Change reservation period of a existing reservation
 * @param {String} calendarId - calendar ID
 * @param {String} eventId - event ID
 * @param {Date} start - start date- must be ISO String
 * @param {Date} end - end date - must be ISO String
 * @returns
 */
async function changeEvent(
    calendarId,
    eventId,
    startDate,
    endDate,
    priceTotal,
    daysTotal
) {
    const calendar = google.calendar({ version: "v3", auth });

    console.log(`event id ${eventId}`);

    if (!startDate || !endDate) {
        return res
            .status(400)
            .json({ error: "Oba datuma (startDate i endDate) su obavezna." });
    }

    try {
        const res = await calendar.events.patch({
            calendarId: calendarId,
            eventId: eventId,
            resource: {
                start: {
                    dateTime: startDate,
                    timeZone: "Europe/Belgrade",
                },
                end: {
                    dateTime: endDate,
                    timeZone: "Europe/Belgrade",
                },
            },
        });

        // if (res.status !== 200) {
        //     throw new Error("Error while modifing an event from the google calendar");
        // }
        console.log(`event changed in google calendar!`);

        const updatedReservation =
            await reservationService.findAndUpdateReservationByEventId(
                eventId,
                startDate,
                endDate,
                priceTotal,
                daysTotal
            );

        if (!updatedReservation) {
            console.warn(
                `Reservation with ${eventId} could not be found in database`
            );
        } else {
            console.log(`Reservation changed in database!`);
        }
        return {
            success: true,
            message: "Događaj i rezervacija uspešno modifikovani.",
        };
    } catch (error) {
        console.log(`error while changing an event  ${error}`);
        throw new Error("Nije moguće menjati događaj. Pokušajte ponovo.");
    }
}

/**
 * Deletes event from existing Google Calendar and adds that same event into the new Google Calendar and updates the reservation in the database.
 * @param {string} fromCalendarId - Old calendar ID.
 * @param {string} fromEventId - Old event ID.
 * @param {string} toCalendarId - New calendar ID.
 * @param {Object} reservationData - Object containing reservation details.
 * @param {string} reservationData.licensePlate - License plate of the vehicle.
 * @param {string} reservationData.brand - Brand of the vehicle.
 * @param {string} reservationData.model - Model of the vehicle.
 * @param {number} reservationData.pricePerDay - Price per day for the vehicle rental.
 * @param {number} reservationData.priceTotal - Total price for the reservation.
 * @param {string} reservationData.eventId - ID of the reservation event.
 * @param {string} reservationData.calendarId - Calendar ID associated with the reservation.
 */
async function moveEvent(fromCalendarId, fromEventId, toCalendarId, reservationData) {
    const fromEventData = await getInfoFromEvent(fromCalendarId, fromEventId);

    const eventBody = {
        calendarId: toCalendarId,
        summary: `new: ${reservationData.model}: ${reservationData.licensePlate} old: ${fromEventData.summary}`,
        description: `new: Auto ID: ${reservationData.licensePlate || 'undefined'} cena: ${reservationData.priceTotal || 'ISTA'} old: ${fromEventData.description}`,
        start: fromEventData.start,
        end: fromEventData.end,

    };


    try {
        const createdEvent = await createEventOnly(eventBody);

        console.log(createdEvent);

        const fieldsToUpdate = {
            licensePlate: reservationData.licensePlate,
            brand: reservationData.brand,
            model: reservationData.model,
            eventId: createdEvent.id,
            calendarId: reservationData.calendarId
        }

        const updatedReservation = await reservationService.findAndUpdateReservationByReservationId(fromEventId, fieldsToUpdate)
        console.log('Reservation updated:', updatedReservation);

        const oldEvent = await cancelEventOnly(fromCalendarId, fromEventId);
        console.log(`old event canceled: `, oldEvent);

        return { createdEvent, oldEvent, updatedReservation };
    } catch (error) {
        console.error('Error in moveEvent:', error.message);
        throw new Error(`Failed to move event: ${error.message}`);
    }

}
/**
 * Return event informations (description, start,end...)
 * @param {String} calendarId - calendar ID
 * @param {String} eventId  - event ID
 */
async function getInfoFromEvent(calendarId, eventId) {
    const calendar = google.calendar({ version: "v3", auth });

    try {
        const event = await calendar.events.get({
            calendarId: calendarId,
            eventId: eventId,
        });

        const eventData = event.data;
        console.log("Event data retrieved:", eventData);
        return eventData;
    } catch (error) {
        console.error(`Error while fetching event data: ${error.message}`);
        return { success: false, error: error.message };
    }
}

module.exports = {
    createEvent,
    accessBusyDates,
    searchCarsByDate,
    cancelEvent,
    changeEvent,
    cancelEventOnly,
    moveEvent,
};
