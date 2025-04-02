const Company = require('../models/company');
const companyService = require('../service/comapanyService');

//Get all companies from db 
const getAllCompanies = async (req, res) => {
    try {
        const response = await Company.find();
        res.status(200).json({ message: "Successful", data: response });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching companies', error: err });
    }
}

//insert company in a db
const insertCompany = async (req, res) => {
    const company = req.body;
    try {

        const response = await new Company(company).save();
        res.status(201).json({
            message: "Company successfully added",
            data: response,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error adding company',
            error: error.message,
        });
    }
}

/**
 * Returns Company
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getCompany = async (req, res) => {
    const { companyId } = req.params
    if (!companyId) {
        return res.status(404).json({ message: "No Company ID provided!" });
    }
    try {
        const company = await companyService.findCompanyById(companyId);
        if (!company) {
            return res.status(404).json({ message: "Company not found" });
        }
        res.status(200).json({ message: "Reservations found", data: company });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
}

module.exports = { getAllCompanies, insertCompany, getCompany };