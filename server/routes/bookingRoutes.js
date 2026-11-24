const express = require('express');
const {
  createBooking,
  getMyBookings,
  getBookingById,
  cancelBooking,
  getAllAdminBookings,
  confirmBooking,
  completeBooking
} = require('../controllers/bookingController');
const { authenticate } = require('../middleware/authMiddleware');
const { requireAdmin } = require('../middleware/adminMiddleware');

const router = express.Router();

// User Routes
router.post('/', authenticate, createBooking);
router.get('/my', authenticate, getMyBookings);
router.get('/:id', authenticate, getBookingById);
router.put('/:id/cancel', authenticate, cancelBooking);

// Admin Booking Routes
router.get('/admin/all', authenticate, requireAdmin, getAllAdminBookings);
router.put('/admin/:id/confirm', authenticate, requireAdmin, confirmBooking);
router.put('/admin/:id/cancel', authenticate, requireAdmin, cancelBooking);
router.put('/admin/:id/complete', authenticate, requireAdmin, completeBooking);

module.exports = router;
