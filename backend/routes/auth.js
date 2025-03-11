const { handleLogin, handleLogout, handleRegister } = require('../controllers/authController');
const express = require('express');
const router = express.Router();


router.post('/login', handleLogin);
router.post('/logout', handleLogout);
router.post('/register', handleRegister);

module.exports = router
