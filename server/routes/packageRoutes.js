const express = require('express');
const {
  getAllPackages,
  getPackageById,
  createPackage,
  updatePackage,
  deletePackage
} = require('../controllers/packageController');
const { authenticate } = require('../middleware/authMiddleware');
const { requireAdmin } = require('../middleware/adminMiddleware');

const router = express.Router();

router.get('/', getAllPackages);
router.get('/:id', getPackageById);
router.post('/', authenticate, requireAdmin, createPackage);
router.put('/:id', authenticate, requireAdmin, updatePackage);
router.delete('/:id', authenticate, requireAdmin, deletePackage);

module.exports = router;
