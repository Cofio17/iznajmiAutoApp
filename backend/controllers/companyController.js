const Company = require('../models/company');

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
    const { name, location } = req.body;
    try {
        const newCompany = new Company({
            name: "Rent a Car Agencija 2",
            location: "Novi Sad"
        })
        const response = await newCompany.save();
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

module.exports = { getAllCompanies, insertCompany };