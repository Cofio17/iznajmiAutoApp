import { apiRequest } from "../Api/apiService";


/**
 *  On successful API call to Google Calendar, an HTML email is generated and sent to the user who made a reservation.
 * @param {Function} emailType - function for generating email content
 * @param {*} personData - data used in email
 * @param {string} subject - subject of email
 */
export const sendEmailHelper = async (emailType, personData, subject) => {
    if (typeof emailType !== "function") {
        console.error("Error: emailType is not a function");
        return;
    }

    // Proveri da li personData ima email
    if (!personData.email) {
        console.error("Error: personData.email is missing");
        return;
    }

    const emailContent = {
        to: personData.email,
        subject: subject,
        html: emailType(personData.buyer, personData)
    };

    try {
        const response = await apiRequest("POST", "email/send-email", emailContent);
        console.log("Email sent:", response);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};
