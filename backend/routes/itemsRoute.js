const express = require(`express`);
const router = express.Router();
const { getAllCars, getCarById, insertCars } = require('../controllers/itemsControler.js');


router.get('/', getAllCars);
router.get('/save', insertCars);
router.get('/:itemID', getCarById);



module.exports = router;


