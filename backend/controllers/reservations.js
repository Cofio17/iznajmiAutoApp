const { writeFile } = require('fs');
const reservationService = require('../service/reservationService');

//method for saving reservtions data- incomplete
function reservationsPost(req, res) {
    console.log(`Received data ${JSON.stringify(req.body, null, 2)}`);
    writeFile('./reservations.txt', JSON.stringify(req.body, null, 2) + '\n', { flag: 'a' }, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Internal server error" })
        }
    });
    res.status(200).json({ message: 'Reservation received' });
}

const findReservationsByCompanyId = async (req, res) => {
    const { companyId } = req.params
    if (!companyId) {
        res.status(404).json({ message: "No company found!" })
    }
    try {
        const reservations = await reservationService.findReservationsByCompanyId(companyId);
        res.status(200).json({ message: "Reserations found", data: reservations });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
}


module.exports = { reservationsPost, findReservationsByCompanyId };

