const { Router } = require('express');
const router = Router();
const { getAllCompanies, insertCompany } = require('../controllers/companyController.js');


router.get('/', getAllCompanies);
router.get('/add', insertCompany);

module.exports = router;