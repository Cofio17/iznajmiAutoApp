const { default: mongoose } = require('mongoose');
const Car = require('../models/car');
const carService = require('../service/carsService');

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
const insertCars = async (req, res) => {

    const user = req.user;
    let cars = req.body;

    if (cars.length === undefined) {
        // Ako cars nije niz, pretvaramo ga u niz sa jednim elementom
        cars = [cars];
    }

    //zahteva IZMENE
    cars = await Promise.all(cars.map(async (car) => {
        const images = await carService.returnCarImages(car.licensePlate);
        return {
            ...car,
            images,
            image: images[0],
            enginePower: 80,
            // location: "Subotica",
            // companyId: "67e848026671c169effc1ebc"
        };
    }));
    try {
        const response = await Car.insertMany(cars);
        console.log('Car/s successfully added:', response);

        res.status(201).json({
            message: "Car/s successfully added",
            car: response
        });
    } catch (error) {
        console.error("Error while adding car to the database:", error.message);

        res.status(500).json({
            message: "Failed to add car to the database",
            error: error.message
        });
    }
};

/**
 * User Logout
 * @param {import('express').Request} req - HTTP request object
 * @param {import('express').Response} res - HTTP response object
 */
const getCarByCompanyId = async (req, res) => {
    const { companyId } = req.body;

    try {
        const totalCars = await carService.filterCarsById(companyId);

        res.status(200).json({ count: totalCars.length, cars: totalCars })
    } catch (error) {
        res.status(500).json({ message: 'Error counting cars' });
    }

}

const updateCarsWithNullCompanyId = async (req, res) => {
    const { newCompanyId } = req.body;
    try {
        const result = await carService.updateCarsWithNullCompanyId(newCompanyId);
        res.status(200).json({ message: 'Cars updated successfully', result });
    } catch (error) {
        res.status(500).json({ message: 'Error updating cars' });
    }
}




module.exports = {
    getAllCars,
    getCarById,
    insertCars,
    getCarByCompanyId,
    updateCarsWithNullCompanyId
}



