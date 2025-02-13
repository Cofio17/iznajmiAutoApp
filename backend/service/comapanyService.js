const Company = require('../models/company');

/**
 * Returns company by company id if exists
 * @param {string} id -companyId
 * @returns 
 */
const findCompanyById = async (id) => {
    try {
        const company = await Company.findById(id);
        if (!company) {
            throw new Error('Company not found');
        }
        return company;
    } catch (error) {
        console.error('Error finding company:', error);
        throw error;
    }
};

module.exports = {
    findCompanyById
}
