const { Router } = require('express');
const router = Router();
const { getAllCompanies, insertCompany } = require('../controllers/companyController.js');
const authenticateToken = require('../middleware/authenticate.js');


router.get('/', authenticateToken, getAllCompanies);
router.get('/add', authenticateToken, insertCompany);

module.exports = router;