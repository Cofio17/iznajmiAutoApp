const { default: mongoose } = require('mongoose');
const Car = require('../models/car');

//potebno je povuci podatke iz baze umesto prop podataka
// let cars = [
//     {
//         id: 1,
//         name: 'BMW 1',
//         tablice: 'SU090AB',
//         calendarId: 'c324e43eb43dc852b7ebd49ff328bbab4d9d14d23a4a3df89663fc22fc370b26@group.calendar.google.com'
//     },
//     {
//         id: 2,
//         name: 'Mercedes S klasa',
//         tablice: 'NS001AA',
//         calendarId: 'c324e43eb43dc852b7ebd49ff328bbab4d9d14d23a4a3df89663fc22fc370b26@group.calendar.google.com'
//     },
//     {
//         id: 3,
//         name: 'Audi A3',
//         tablice: 'SU070CC',
//         calendarId: 'c324e43eb43dc852b7ebd49ff328bbab4d9d14d23a4a3df89663fc22fc370b26@group.calendar.google.com'
//     },
//     {
//         id: 4,
//         name: 'Ford C-Max',
//         tablice: 'SU080EB',
//         calendarId: '5f262cb6399d41786276fdf99ac7aeda780deccb8c9facb7f4fae2c49064adbd@group.calendar.google.com'
//     },
//     {
//         id: 5,
//         name: 'Lamborgini',
//         tablice: 'SU010EB',
//         calendarId: 'c324e43eb43dc852b7ebd49ff328bbab4d9d14d23a4a3df89663fc22fc370b26@group.calendar.google.com'
//     },
//     {
//         id: 6,
//         name: 'Lamborgini',
//         tablice: 'SU010EB',
//         calendarId: 'c324e43eb43dc852b7ebd49ff328bbab4d9d14d23a4a3df89663fc22fc370b26@group.calendar.google.com'
//     },
// ]


// const getAllICars = (req, res) => {
//     res.status(200).json({ successful: true, data: cars })
// }


//get all cars from the db
const getAllCars = async (req, res) => {
    try {
        const response = await Car.find();
        res.status(200).json({ message: 'Succesful', data: response })
    } catch (err) {
        res.status(500).json({ message: 'error getting cars', error: err.message })
    }

}


//get a specific car using licescePlate 
const getCarById = async (req, res) => {
    try {
        const { itemID } = req.params;
        const car = await Car.findOne({ licensePlate: itemID });
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



