const { default: mongoose } = require('mongoose');
const Car = require('../models/car');

//get all cars from the db
const getAllCars = async (req, res) => {
    try {
        const response = await Car.find().populate('companyId');
        res.status(200).json({ message: 'Succesfull', data: response })
    } catch (err) {
        res.status(500).json({ message: 'error getting cars', error: err.message })
    }

}


//get a specific car using licescePlate 
const getCarById = async (req, res) => {
    try {
        const { itemID } = req.params;
        const car = await Car.findOne({ licensePlate: itemID }).populate('companyId');
        if (!car) {
            return res.status(404).json({ success: false, data: 'This car doesnt exits' });
        }
        res.status(200).json({ success: true, data: car });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "An unexpected error occurred" });
    }
}


//inserting car
const insertCars = async (req, res) => { //incomplete 

    let cars;
    try {
        const response = await Car.insertMany(cars);
        console.log('Car successfully added:', response);

        // Vraćanje odgovora klijentu
        res.status(201).json({
            message: "Car successfully added",
            car: response
        });
    } catch (error) {
        console.error("Error while adding car to the database:", error.message);

        // Slanje greške klijentu
        res.status(500).json({
            message: "Failed to add car to the database",
            error: error.message
        });
    }
};


module.exports = {
    getAllCars,
    getCarById,
    insertCars
}



