const express = require('express');
const {
  createReview,
  getReviewsByPackage,
  getAllReviewsAdmin,
  approveReview,
  deleteReview
} = require('../controllers/reviewController');
const { authenticate } = require('../middleware/authMiddleware');
const { requireAdmin } = require('../middleware/adminMiddleware');

const router = express.Router();

router.post('/', authenticate, createReview);
router.get('/package/:packageId', getReviewsByPackage);
router.get('/admin', authenticate, requireAdmin, getAllReviewsAdmin);
router.put('/admin/:id/approve', authenticate, requireAdmin, approveReview);
router.delete('/:id', authenticate, deleteReview);

module.exports = router;
