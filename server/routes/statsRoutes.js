const express = require('express');
const { getAdminStats } = require('../controllers/statsController');
const { authenticate } = require('../middleware/authMiddleware');
const { requireAdmin } = require('../middleware/adminMiddleware');

const router = express.Router();

router.get('/admin', authenticate, requireAdmin, getAdminStats);

module.exports = router;
