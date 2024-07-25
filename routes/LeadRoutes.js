const express = require('express');
const router = express.Router();
const leadController = require('../controllers/LeadController');

router.post('/register', leadController.create);
router.get('/leads', leadController.index);
router.get('/leads/:id', leadController.show);
router.put('/leads/:id', leadController.update);

module.exports = router;