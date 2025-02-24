

const authService = require('../service/authService');
/**
 * User login
 * @param {import('express').Request} req - HTTP request object
 * @param {import('express').Response} res - HTTP response object
 */
const handleLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        const { success, message, accessToken, userData } = await authService.authenticateUser(email, password);
        if (!success) {
            return res.status(401).json({ success, message });
        }

        res
            .cookie('token', accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                path: '/',
                maxAge: 60 * 60 * 1000
            })
            .status(200).json({ message: "Logged in succesfully", userData, accessToken });



    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};

/**
 * User Logout
 * @param {import('express').Request} req - HTTP request object
 * @param {import('express').Response} res - HTTP response object
 */
const handleLogout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/'
        })
            .status(200).json({ message: "Logged out succesfully" })

    } catch (error) {
        res.status(500).json({ error: "Logout failed", details: error.message });

    }
}

module.exports = {
    handleLogin,
    handleLogout
}
