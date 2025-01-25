const express = require('express');
const router = express.Router();
const { getUserById } = require('../controllers/usersController');
const authenticateToken = require('../middleware/authenticate.js');



router.get('/:userId', authenticateToken, getUserById);

module.exports = router