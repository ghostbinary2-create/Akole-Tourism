const express = require('express');
const {
  getAllUsers,
  getUserById,
  updateUser,
  toggleUserStatus,
  deleteUser
} = require('../controllers/userController');
const { authenticate } = require('../middleware/authMiddleware');
const { requireAdmin } = require('../middleware/adminMiddleware');

const router = express.Router();

router.get('/', authenticate, requireAdmin, getAllUsers);
router.get('/:id', authenticate, getUserById);
router.put('/:id', authenticate, updateUser);
router.put('/:id/status', authenticate, requireAdmin, toggleUserStatus);
router.delete('/:id', authenticate, requireAdmin, deleteUser);

module.exports = router;
