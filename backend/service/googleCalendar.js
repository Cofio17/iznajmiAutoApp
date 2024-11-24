const { google } = require('googleapis');
const addingXMonths = require('../utils/addingMonths.js');


// autentifikacija
const auth = new google.auth.JWT(
    process.env.CLIENT_RENTACAR_EMAIL,
    null,
    process.env.CLIENT_RENTACAR_PRIVATE_KEY,
    ["https://www.googleapis.com/auth/calendar"]
);

// Funkcija za pravljenje dogadjaja
async function createEvent(eventDetails) {
    console.log("event details: ", JSON.stringify(eventDetails, null, 2));
    console.log(eventDetails.calendarId);


    const calendar = google.calendar({ version: "v3", auth });

    try {
        const response = await calendar.events.insert({
            calendarId: eventDetails.calendarId, // Možeš ovde staviti specifičan ID kalendara
            requestBody: eventDetails,
        });
        return response.data;
    } catch (error) {
        console.error("Error creating event:", error);
        throw new Error("Unable to create event");
    }
}


async function accessBusyDates(calendarId) {
    const calendar = google.calendar({ version: "v3", auth });


    const todayISO = new Date().toISOString();
    const endDate = addingXMonths(3);

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
