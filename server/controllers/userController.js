const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

// GET /api/users (Admin only)
const getAllUsers = async (req, res, next) => {
  try {
    const { search, role, status } = req.query;

    const whereClause = {};

    if (search) {
      whereClause.OR = [
        { name: { contains: search } },
        { email: { contains: search } },
        { mobile: { contains: search } },
      ];
    }

    if (role && role !== 'ALL') whereClause.role = role;
    if (status && status !== 'ALL') whereClause.status = status;

    const users = await prisma.user.findMany({
      where: whereClause,
      select: {
        id: true,
        name: true,
        email: true,
        mobile: true,
        role: true,
        status: true,
        profileImage: true,
        createdAt: true,
        _count: { select: { bookings: true } }
      },
      orderBy: { createdAt: 'desc' }
    });

    return res.json({ success: true, count: users.length, users });
  } catch (error) {
    next(error);
  }
};

// GET /api/users/:id
const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (req.user.role !== 'ADMIN' && req.user.id !== id) {
      return res.status(403).json({ success: false, message: 'Forbidden. Cannot view other users profile.' });
    }

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        mobile: true,
        role: true,
        status: true,
        profileImage: true,
        createdAt: true,
        bookings: {
          include: {
            package: true,
            payment: true
          },
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    return res.json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

// PUT /api/users/:id (Update Profile or Change Password)
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, mobile, profileImage, currentPassword, newPassword } = req.body;

    if (req.user.role !== 'ADMIN' && req.user.id !== id) {
      return res.status(403).json({ success: false, message: 'Forbidden. Cannot edit other user account.' });
    }

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    const updateData = {};
    if (name) updateData.name = name;
    if (mobile) updateData.mobile = mobile;
    if (profileImage !== undefined) updateData.profileImage = profileImage;

    // Password change check
    if (newPassword) {
      if (!currentPassword && req.user.role !== 'ADMIN') {
        return res.status(400).json({ success: false, message: 'Current password is required to change password.' });
      }

      if (req.user.role !== 'ADMIN') {
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
          return res.status(400).json({ success: false, message: 'Incorrect current password.' });
        }
      }

      if (newPassword.length < 6) {
        return res.status(400).json({ success: false, message: 'New password must be at least 6 characters.' });
      }

      updateData.password = await bcrypt.hash(newPassword, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        mobile: true,
        role: true,
        status: true,
        profileImage: true,
        updatedAt: true
      }
    });

    return res.json({ success: true, message: 'User profile updated successfully.', user: updatedUser });
  } catch (error) {
    next(error);
  }
};

// PUT /api/users/:id/status (Admin toggle Block/Unblock)
const toggleUserStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // 'ACTIVE' or 'BLOCKED'

    if (id === req.user.id) {
      return res.status(400).json({ success: false, message: 'Admin cannot block their own account.' });
    }

    const user = await prisma.user.update({
      where: { id },
      data: { status },
      select: { id: true, name: true, email: true, status: true }
    });

    return res.json({ success: true, message: `User status changed to ${status}`, user });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/users/:id (Admin only)
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (id === req.user.id) {
      return res.status(400).json({ success: false, message: 'Admin cannot delete their own account.' });
    }

    await prisma.user.delete({ where: { id } });

    return res.json({ success: true, message: 'User deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  toggleUserStatus,
  deleteUser,
};
