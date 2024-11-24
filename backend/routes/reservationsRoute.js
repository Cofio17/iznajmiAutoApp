const express = require('express');
const router = express.Router();
const { reservationsPost } = require('../controllers/reservations.js');

router.post('/reservations', reservationsPost);

module.exports = router;