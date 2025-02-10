const express = require('express');
const router = express.Router();
const { reservationsPost, findReservationsByCompanyId, findReservByReservId } = require('../controllers/reservations.js');
const authenticateToken = require('../middleware/authenticate.js')

// router.post('/reservations', reservationsPost);
router.get('/:companyId', authenticateToken, findReservationsByCompanyId);
router.get('/idReservation/:reservationId', findReservByReservId);

module.exports = router;