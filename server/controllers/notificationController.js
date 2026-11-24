const { PrismaClient } = require('@prisma/client');
const { sendBroadcastToUsers } = require('../utils/emailService');
const prisma = new PrismaClient();

// GET /api/notifications (User Auth)
const getMyNotifications = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const notifications = await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 20
    });

    const unreadCount = notifications.filter(n => !n.isRead).length;

    return res.json({ success: true, unreadCount, count: notifications.length, notifications });
  } catch (error) {
    next(error);
  }
};

// PUT /api/notifications/:id/read (User Auth)
const markNotificationRead = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (id === 'all') {
      await prisma.notification.updateMany({
        where: { userId: req.user.id, isRead: false },
        data: { isRead: true }
      });
      return res.json({ success: true, message: 'All notifications marked as read.' });
    }

    const notification = await prisma.notification.findUnique({ where: { id } });
    if (!notification) {
      return res.status(404).json({ success: false, message: 'Notification not found.' });
    }

    if (notification.userId !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Forbidden.' });
    }

    const updated = await prisma.notification.update({
      where: { id },
      data: { isRead: true }
    });

    return res.json({ success: true, notification: updated });
  } catch (error) {
    next(error);
  }
};

// POST /api/notifications/broadcast (Admin only)
const broadcastNotification = async (req, res, next) => {
  try {
    const { title, message, type } = req.body;

    if (!title || !message) {
      return res.status(400).json({ success: false, message: 'Title and message are required.' });
    }

    // Fetch active users with email and name
    const users = await prisma.user.findMany({
      where: { status: 'ACTIVE' },
      select: { id: true, name: true, email: true }
    });

    // 1. Create in-app notifications in database
    const notificationsData = users.map(u => ({
      userId: u.id,
      title,
      message,
      type: type || 'ANNOUNCEMENT',
      isRead: false
    }));

    if (notificationsData.length > 0) {
      await prisma.notification.createMany({ data: notificationsData });
    }

    // 2. Dispatch broadcast email directly to all users' email inboxes (async, non-blocking)
    sendBroadcastToUsers({
      users,
      title,
      message
    }).catch(err => {
      console.error('[NotificationController] Broadcast email dispatch error:', err.message);
    });

    return res.json({
      success: true,
      message: `Notification broadcasted and emailed directly to ${users.length} active users!`
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMyNotifications,
  markNotificationRead,
  broadcastNotification
};
