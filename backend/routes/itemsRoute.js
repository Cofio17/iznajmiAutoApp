const express = require(`express`);
const router = express.Router();
const { getAllCars, getCarById, insertCars } = require('../controllers/itemsControler.js');
const authenticateToken = require('../middleware/authenticate.js');

router.get('/', getAllCars);
router.post('/save', authenticateToken, insertCars);
router.get('/:itemID', getCarById);



module.exports = router;


