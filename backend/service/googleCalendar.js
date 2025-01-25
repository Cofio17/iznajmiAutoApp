const { google } = require('googleapis');
const addingXMonths = require('../utils/addingMonths.js');
const reservationServcice = require('./reservationService.js');

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
    console.log("event details: ", JSON.stringify(eventDetails, null, 2));
    console.log(eventDetails.calendarId);

    if (!eventDetails || !eventDetails.calendarId) {
        throw new Error("Invalid event details: Missing calendarId or eventDetails.");
    }

    //calendar = object of a calendar
    //google.calendar = function from googleapis library
    const calendar = google.calendar({ version: "v3", auth });

    try {
        const response = await calendar.events.insert({
            calendarId: eventDetails.calendarId, //dynamic calendar id change
            requestBody: eventDetails,
        });
        console.log("Event successfully created in Google Calendar:", response.data);

        const reservationDetails = buildReservationDetails(reservationDetailsParam);

        const reservationResponse = await reservationServcice.saveReservation(reservationDetails, eventDetails.calendarId);
        console.log("Reservation saved successfully:", reservationResponse);

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
                }
            ]

        }
    })
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

    //making array of objects with pair of id:calendarId <String>
    const calendarIds = cars.map((car) => {
        return ({ id: car.calendarId });
    })

    const response = await calendar.freebusy.query({
        requestBody: {
            timeMin: timeMin,
            timeMax: timeMax,
            items: [...calendarIds]
        }
    })

    const freeCars = cars.filter((car) => {
        return response.data.calendars[car.calendarId].busy.length === 0;
    })


    return freeCars;
}

/**
 * Helper function for creating reservation object
 * @param {Object} eventDetails - event details
 * @returns {Object} - reservation details
 */
function buildReservationDetails(eventDetails) {
    return {
        startDate: eventDetails.start.dateTime,
        endDate: eventDetails.end.dateTime,
        licensePlate: eventDetails.summary.carId || 'Unknown licensePlate',
        brand: eventDetails.summary.brand || "Unknown Brand",
        model: eventDetails.summary.model || "Unknown Model",
        pricePerDay: eventDetails.summary.priceTotal / eventDetails.summary.daysTotal || 0,
        priceTotal: eventDetails.summary.priceTotal || 0,
        duration: eventDetails.summary.daysTotal || 0,
        buyer: eventDetails.summary.firstName || "Unknown Buyer",
        jmbg: eventDetails.summary.jmbg || "Unknown JMBG",
        number: eventDetails.summary.number || "Unknown Contact",
    };
}

module.exports = { createEvent, accessBusyDates, searchCarsByDate };
