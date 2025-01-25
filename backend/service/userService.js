const User = require('../models/user');

const getUserById = async (id) => {
    try {
        const res = await User.findById(id);
        return res;
    } catch (error) {
        console.log('cannot find user');
        throw error;

    }
}

module.exports = {
    getUserById,
}

