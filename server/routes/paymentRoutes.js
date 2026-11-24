const express = require('express');
const { processPayment, getPaymentById } = require('../controllers/paymentController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authenticate, processPayment);
router.get('/:id', authenticate, getPaymentById);

module.exports = router;
