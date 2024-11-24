const { google } = require('googleapis');
const addingXMonths = require('../utils/addingMonths.js');


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


    //instance of a calendar 
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
    const calendar = google.calendar({ version: "v3", auth });


    //setting current date
    const todayISO = new Date().toISOString();
    //setting current date + 3 months 
    const endDate = addingXMonths(3);

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

module.exports = { createEvent, accessBusyDates };
