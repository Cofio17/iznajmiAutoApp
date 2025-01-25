const express = require('express');
const router = express.Router();
const { reservationsPost, findReservationsByCompanyId } = require('../controllers/reservations.js');
const authenticateToken = require('../middleware/authenticate.js')

// router.post('/reservations', reservationsPost);
router.get('/:companyId', authenticateToken, findReservationsByCompanyId);

module.exports = router;