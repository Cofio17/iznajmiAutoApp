/**
 *  On successful API call to Google Calendar, an HTML email is generated and sent to the user who made a reservation.
 * @param {Function} emailType - function for generating email content
 * @param {*} data - data used in email
 * @param {string} subject - subject of email
 */
export const sendEmail = async (emailType, personData, subject) => {
    const name = personData.buyer;
    // Proveri da li je emailType funkcija
    if (typeof emailType !== "function") {
        console.error("Error: emailType is not a function");
        return;
    }

    const emailContent = {
        to: email,
        subject: subject,
        html: emailType(data)
    }

    try {
        const response = await apiRequest("POST", "email/send-email", emailContent);
        console.log("Email sent:", response);

    } catch (error) {
        console.error("Error sending email:", error);
    }


};