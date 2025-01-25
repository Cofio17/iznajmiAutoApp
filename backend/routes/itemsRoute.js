const express = require(`express`);
const router = express.Router();
const { getAllCars, getCarById, insertCars, updateCarsWithNullCompanyId, getCarByCompanyId } = require('../controllers/itemsControler.js');
const authenticateToken = require('../middleware/authenticate.js');

router.get('/', getAllCars);
router.post('/save', authenticateToken, insertCars);
router.get('/:itemID', getCarById);
router.post('/by-company-id', authenticateToken, getCarByCompanyId);
router.put('/update-company-id', updateCarsWithNullCompanyId);



module.exports = router;


