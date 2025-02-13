const Company = require('../models/company');
const Reservation = require('../models/reservation');

/**
 * Saves a new reservation into the MongoDB database.
 *
 * This function creates a reservation document based on the provided reservation details
 * and associates it with the specified company. The company is identified using the
 * provided `companyId` (or calendar ID), and an error is thrown if no matching company is found.
 *
 * @param {Object} reservationDetails - Object containing reservation information.
 * @param {string} reservationDetails.startDate - Start date of the reservation (ISO 8601 format).
 * @param {string} reservationDetails.endDate - End date of the reservation (ISO 8601 format).
 * @param {string} reservationDetails.brand - Brand of the car being reserved.
 * @param {string} reservationDetails.model - Model of the car being reserved.
 * @param {number} reservationDetails.pricePerDay - Daily price for the reservation.
 * @param {number} reservationDetails.priceTotal - Total price for the reservation.
 * @param {number} reservationDetails.duration - Total duration of the reservation (in days).
 * @param {string} reservationDetails.buyer - Name of the buyer.
 * @param {string} reservationDetails.jmbg - JMBG (personal ID) of the buyer.
 * @param {string} reservationDetails.number - Contact number of the buyer.
 * @param {string} companyId - ID of the company associated with the selected calendar.
 * 
 * @throws {Error} If reservation details or company ID are missing, or no matching company is found.
 * 
 * @returns {Promise<Object>} An object containing a success message and the saved reservation.
 *
 * Example:
 * ```javascript
 * const reservation = {
 *   startDate: "2025-01-25T00:00:00.000Z",
 *   endDate: "2025-01-30T00:00:00.000Z",
 *   brand: "Toyota",
 *   model: "Corolla",
 *   pricePerDay: 50,
 *   priceTotal: 250,
 *   duration: 5,
 *   buyer: "John Doe",
 *   jmbg: "1234567890123",
 *   number: "555-555-5555"
 * };
 * 
 * const response = await saveReservation(reservation, "company12345");
 * console.log(response.message); // 'Reservation saved successfully!'
 * ```
 */
const saveReservation = async (reservationDetails, calendarId) => {
    try {

        if (!reservationDetails || !calendarId) {
            throw new Error("Missing required data: reservation details or calendar ID.");
        }

        if (!reservationDetails.startDate || !reservationDetails.endDate || !reservationDetails.brand || !reservationDetails.model) {
            throw new Error("Missing required reservation details!");
        }


        const company = await Company.findOne({ calendarIds: calendarId });
        if (!company) {
            throw new Error("No company found with the provided calendar ID!");
        }

        console.log("Company found:", company);
        console.log(`company number!!! ${company.contact}`);



        const reservation = new Reservation({
            startDate: reservationDetails.startDate,
            endDate: reservationDetails.endDate,
            licensePlate: reservationDetails.licensePlate,
            brand: reservationDetails.brand,
            model: reservationDetails.model,
            pricePerDay: reservationDetails.pricePerDay,
            priceTotal: reservationDetails.priceTotal,
            duration: reservationDetails.duration,
            buyer: reservationDetails.buyer,
            jmbg: reservationDetails.jmbg,
            email: reservationDetails.email,
            number: reservationDetails.number,
            eventId: reservationDetails.eventId,
            reservationId: reservationDetails.reservationId,
            calendarId: reservationDetails.calendarId,
            companyId: company._id,
            companyContact: company.contact
        });

        const response = await reservation.save();

        return { message: 'Reservation saved successfully!', reservation: response };
    } catch (error) {
        console.error(`Error while making a reservation: ${error.message}`);
        throw error;
    }
};

/**
 * 
 * @param {string} id -companyId
 * @returns 
 */
const findReservationsByCompanyId = async (id) => {
    try {
        const res = await Reservation.find({ companyId: id }).sort({ createdAt: -1 });
        return res;
    } catch (error) {
        console.error(`Error while making a reservation: ${error.message}`);
        throw error;
    }
}

/**
 * Finds reservation by reservation id (example of reservation id: R-768391-906)
 * @param {String} id -reservation id 
 * @returns 
 */
const findReservationByReservationId = async (id) => {
    try {
        const res = await Reservation.findOne({ reservationId: id });
        return res;
    } catch (error) {
        console.error(`Error while making a reservation: ${error.message}`);
        throw error;
    }
}

/**
 * Finds and deletes one reservation by eventId
 * @param {String} id - eventId 
 * @returns {Object} - Deletion result or null if not found
 */
const findAndDeleteReservation = async (id) => {
    try {
        const res = await Reservation.deleteOne({ eventId: id });
        if (res.deletedCount === 0) {
            console.warn(`Reservation with ID ${id} not found.`);
            return null;
        }
        return res;
    } catch (error) {
        console.error(`Error while deleting reservation: ${error.message}`);
        throw error;
    }
};

module.exports = {
    saveReservation,
    findReservationsByCompanyId,
    findReservationByReservationId,
    findAndDeleteReservation
}