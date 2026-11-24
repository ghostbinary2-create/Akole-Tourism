const express = require('express');
const {
  getAllPlaces,
  getPlaceById,
  createPlace,
  updatePlace,
  deletePlace
} = require('../controllers/placeController');
const { authenticate } = require('../middleware/authMiddleware');
const { requireAdmin } = require('../middleware/adminMiddleware');

const router = express.Router();

router.get('/', getAllPlaces);
router.get('/:id', getPlaceById);
router.post('/', authenticate, requireAdmin, createPlace);
router.put('/:id', authenticate, requireAdmin, updatePlace);
router.delete('/:id', authenticate, requireAdmin, deletePlace);

module.exports = router;
