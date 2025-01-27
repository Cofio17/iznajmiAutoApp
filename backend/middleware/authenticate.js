require('dotenv').config();
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Token iz Authorization zaglavlja
    const cookieToken = req.cookies?.token; // Token iz kolačića


    if (!token && !cookieToken) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token || cookieToken, process.env.MY_SUPER_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }

        req.user = user;
        next();
    });
};


module.exports = authenticateToken;
