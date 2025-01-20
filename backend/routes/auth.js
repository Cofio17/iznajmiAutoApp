const { handleLogin, handleLogout } = require('../controllers/authController');
const express = require('express');
const router = express.Router();


router.post('/login', handleLogin);
router.post('/logout', handleLogout);

module.exports = router
