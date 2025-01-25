const userService = require('../service/userService');

const getUserById = async (req, res) => {
    const { userId } = req.params;

    try {
        const { _id, companyId, name, email } = await userService.getUserById(userId);
        if (!_id) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ _id, companyId, name, email });
    } catch (error) {

        console.error('Error retrieving user:', error);
        res.status(500).json({ message: 'Error retrieving user' });
    }
};

module.exports = { getUserById };
