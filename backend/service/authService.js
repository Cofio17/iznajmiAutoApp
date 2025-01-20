const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const User = require('../models/user')
require('dotenv').config();


const authenticateUser = async (email, password) => {
    try {
        const user = await User.findOne({ email: email });
        const userData = {
            _id: user._id,
            email: user.email
        }
        if (!user) {
            return { success: false, message: 'User doesnt exist' }
        }
        const isMatched = await bcrypt.compare(password, user.password);
        if (!isMatched) {
            return { success: false, message: 'Email and password is inccorect' }
        }
        const accessToken = generateAccessToken(user);
        return { success: true, accessToken, userData };

    } catch (error) {
        console.error('Error during authentication:', error);
        throw new Error('Authentication failed');
    }
}

const generateAccessToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.MY_SUPER_SECRET_KEY, { expiresIn: '1h' });
}

module.exports = {
    authenticateUser
}