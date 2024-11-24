const express = require(`express`);
const router = express.Router();
const { getAllICars, getCarById } = require('../controllers/itemsControler.js');


router.get('/', getAllICars);

router.get('/:itemID', getCarById);

module.exports = router;


