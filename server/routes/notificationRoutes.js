const express = require('express');
const {
  getMyNotifications,
  markNotificationRead,
  broadcastNotification
} = require('../controllers/notificationController');
const { authenticate } = require('../middleware/authMiddleware');
const { requireAdmin } = require('../middleware/adminMiddleware');

const router = express.Router();

router.get('/', authenticate, getMyNotifications);
router.put('/:id/read', authenticate, markNotificationRead);
router.post('/broadcast', authenticate, requireAdmin, broadcastNotification);

module.exports = router;
