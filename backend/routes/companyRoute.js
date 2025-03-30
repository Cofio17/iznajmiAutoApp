const { Router } = require('express');
const router = Router();
const { getAllCompanies, insertCompany, getCompany } = require('../controllers/companyController.js');
const authenticateToken = require('../middleware/authenticate.js');


router.get('/', authenticateToken, getAllCompanies);
router.post('/add', authenticateToken, insertCompany);
router.get('/:companyId', getCompany);

module.exports = router;