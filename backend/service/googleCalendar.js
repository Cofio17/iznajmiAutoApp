const { google } = require('googleapis');
const addingXMonths = require('../utils/addingMonths.js');

//setting current date
const todayISO = new Date().toISOString();
//setting current date + 3 months 
const endDate = addingXMonths(3);


// authentification using client email and client private key and scope definition
const auth = new google.auth.JWT(
    process.env.CLIENT_RENTACAR_EMAIL,
    null,
    process.env.CLIENT_RENTACAR_PRIVATE_KEY,
    ["https://www.googleapis.com/auth/calendar"]
);

// method for event creation
async function createEvent(eventDetails) {
    console.log("event details: ", JSON.stringify(eventDetails, null, 2));
    console.log(eventDetails.calendarId);

    //calendar = object of a calendar
    //google.calendar = function from googleapis library
    const calendar = google.calendar({ version: "v3", auth });

    try {
        const response = await calendar.events.insert({
            calendarId: eventDetails.calendarId, //dynamic calendar id change
            requestBody: eventDetails,
        });
        return response.data;
    } catch (error) {
        console.error("Error creating event:", error);
        throw new Error("Unable to create event");
    }
}


//method for accessing busy days in a calendar 
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

module.exports = { createEvent, accessBusyDates, searchCarsByDate };
