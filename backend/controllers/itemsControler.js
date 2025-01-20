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

    const user = req.user;
    const cars = req.body;

    console.log(`this user added a car ${user}`);
    // let cars;
    // cars = [
    //     // {
    //     //     "licensePlate": "BG080EB",
    //     //     "brand": "Toyota",
    //     //     "model": "Corolla",
    //     //     "year": 2020,
    //     //     "type": "Karavan",
    //     //     "fuelType": "Petrol",
    //     //     "transmission": "Manual",
    //     //     "seats": 5,
    //     //     "doors": 4,
    //     //     "pricePerDay": 50,
    //     //     "mileage": 50000,
    //     //     "insuranceIncluded": true,
    //     //     "deposit": 200,
    //     //     "location": "Beograd",
    //     //     "features": [
    //     //         "Air Conditioning",
    //     //         "Bluetooth",
    //     //         "GPS"
    //     //     ],
    //     //     "image": "https://i.imgur.com/WpbMelo.jpeg",
    //     //     "description": "Reliable sedan, perfect for city driving.",
    //     //     "companyId": {
    //     //         "_id": "6743593c11b9b757fa23d8e4",
    //     //         "name": "Rent a Car MobiTrans",
    //     //         "location": "Beograd"
    //     //     },
    //     //     "categoryId": "6744d1a243a73b0ce36e594e",
    //     //     "__v": 0,
    //     //     "calendarId": "b472bdf688ccd0ce10bf2ec4a6d211b26a828eeaf44dc46a28a62e73cd6ecddf@group.calendar.google.com"
    //     // },
    //     // {
    //     //     "licensePlate": "BG167BG",
    //     //     "brand": "Hyundai",
    //     //     "model": "Tucson",
    //     //     "year": 2021,
    //     //     "type": "SUV",
    //     //     "fuelType": "Hybrid",
    //     //     "transmission": "Automatic",
    //     //     "seats": 5,
    //     //     "doors": 5,
    //     //     "pricePerDay": 60,
    //     //     "mileage": 30000,
    //     //     "insuranceIncluded": true,
    //     //     "deposit": 250,
    //     //     "location": "Beograd",
    //     //     "features": [
    //     //         "Cruise Control",
    //     //         "Lane Assist",
    //     //         "Wireless Charging"
    //     //     ],
    //     //     "image": "https://i.imgur.com/j1N5LU4.jpeg",
    //     //     "description": "Spacious SUV, great for family trips.",
    //     //     "companyId": null,
    //     //     "categoryId": "645f31f7c123a1e9d09d9b46",
    //     //     "__v": 0,
    //     //     "calendarId": "3b694671c19cb7ebe152931c56a493b603289b39e15b64c54deab23560fdb041@group.calendar.google.com"
    //     // },
    //     // {
    //     //     "licensePlate": "NS124KG",
    //     //     "brand": "Ford",
    //     //     "model": "Focus",
    //     //     "year": 2018,
    //     //     "type": "Karavan",
    //     //     "fuelType": "Petrol",
    //     //     "transmission": "Manual",
    //     //     "seats": 5,
    //     //     "doors": 5,
    //     //     "pricePerDay": 30,
    //     //     "mileage": 70000,
    //     //     "insuranceIncluded": false,
    //     //     "deposit": 100,
    //     //     "location": "Zrenjanin",
    //     //     "features": [
    //     //         "Roof Rack",
    //     //         "Rear Camera"
    //     //     ],
    //     //     "image": "https://i.imgur.com/jZyzv7K.jpeg",
    //     //     "description": "Practical and economical car with large cargo space.",
    //     //     "companyId": null,
    //     //     "categoryId": "645f31f7c123a1e9d09d9b47",
    //     //     "__v": 0,
    //     //     "calendarId": "5f262cb6399d41786276fdf99ac7aeda780deccb8c9facb7f4fae2c49064adbd@group.calendar.google.com"
    //     // },
    //     // {
    //     //     "licensePlate": "SU117DA",
    //     //     "brand": "BMW",
    //     //     "model": "3 Series",
    //     //     "year": 2022,
    //     //     "type": "HecBek",
    //     //     "fuelType": "Diesel",
    //     //     "transmission": "Automatic",
    //     //     "seats": 5,
    //     //     "doors": 4,
    //     //     "pricePerDay": 80,
    //     //     "mileage": 20000,
    //     //     "insuranceIncluded": true,
    //     //     "deposit": 300,
    //     //     "location": "Zrenjanin",
    //     //     "features": [
    //     //         "Leather Seats",
    //     //         "Premium Sound System",
    //     //         "Sunroof"
    //     //     ],
    //     //     "image": "https://i.imgur.com/7bQaz2N.jpeg",
    //     //     "description": "Luxury sedan for a premium driving experience.",
    //     //     "companyId": {
    //     //         "_id": "6743593c11b9b757fa23d8e4",
    //     //         "name": "Rent a Car MobiTrans",
    //     //         "location": "Subotica"
    //     //     },
    //     //     "categoryId": "6744d1a243a73b0ce36e594e",
    //     //     "__v": 0,
    //     //     "calendarId": "0b041df9b10c8d027ab23dee49a624ee3b4d8e30422ecb75991a5655d0fdd733@group.calendar.google.com"
    //     // },
    //     {
    //         "licensePlate": "ZR075AG",
    //         "brand": "Volkswagen",
    //         "model": "Golf",
    //         "year": 2019,
    //         "type": "HecBek",
    //         "fuelType": "Diesel",
    //         "transmission": "Manual",
    //         "seats": 5,
    //         "doors": 4,
    //         "pricePerDay": 40,
    //         "mileage": 60000,
    //         "insuranceIncluded": false,
    //         "deposit": 150,
    //         "location": "Zrenjanin",
    //         "features": [
    //             "Parking Sensors",
    //             "Heated Seats"
    //         ],
    //         "image": "https://i.imgur.com/FiCkx9U.jpeg",
    //         "description": "Compact and fuel-efficient car, ideal for long trips.",
    //         "companyId": null,
    //         "categoryId": "645f31f7c123a1e9d09d9b47",
    //         "__v": 0,
    //         "calendarId": "321280b59355dd05a7279bd8ddc3736a9c84857f3a22b83dc1bca063b43c223a@group.calendar.google.com"
    //     }
    // ]
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



