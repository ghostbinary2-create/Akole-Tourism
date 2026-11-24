const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// POST /api/payments (Process Mock Payment)
const processPayment = async (req, res, next) => {
  try {
    const { bookingId, paymentMethod, transactionId } = req.body;

    if (!bookingId) {
      return res.status(400).json({ success: false, message: 'Booking ID is required.' });
    }

    const booking = await prisma.booking.findFirst({
      where: {
        OR: [
          { id: bookingId },
          { bookingId: bookingId }
        ]
      },
      include: { package: true }
    });

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found.' });
    }

    if (booking.paymentStatus === 'SUCCESS') {
      return res.status(400).json({ success: false, message: 'Payment for this booking has already been processed.' });
    }

    const finalTxnId = transactionId || `TXN_${booking.bookingId}_${Math.floor(100000 + Math.random() * 900000)}`;
    const finalMethod = paymentMethod || 'MOCK_UPI';

    // Upsert payment record
    const payment = await prisma.payment.upsert({
      where: { bookingId: booking.id },
      update: {
        amount: booking.totalAmount,
        paymentMethod: finalMethod,
        transactionId: finalTxnId,
        paymentStatus: 'SUCCESS',
        paymentDate: new Date()
      },
      create: {
        bookingId: booking.id,
        amount: booking.totalAmount,
        paymentMethod: finalMethod,
        transactionId: finalTxnId,
        paymentStatus: 'SUCCESS',
        paymentDate: new Date()
      }
    });

    // Update booking status
    const updatedBooking = await prisma.booking.update({
      where: { id: booking.id },
      data: {
        status: 'CONFIRMED',
        paymentStatus: 'SUCCESS'
      },
      include: {
        package: true,
        payment: true
      }
    });

    // Send Notification
    await prisma.notification.create({
      data: {
        userId: booking.userId,
        title: 'Payment Successful!',
        message: `Payment of ₹${booking.totalAmount.toLocaleString()} via ${finalMethod} was successful for booking ${booking.bookingId}.`,
        type: 'PAYMENT'
      }
    });

    return res.json({
      success: true,
      message: 'Payment processed successfully! Your booking is confirmed.',
      payment,
      booking: {
        ...updatedBooking,
        package: {
          ...updatedBooking.package,
          images: JSON.parse(updatedBooking.package.images || '[]')
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/payments/:id
const getPaymentById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const payment = await prisma.payment.findFirst({
      where: {
        OR: [
          { id },
          { bookingId: id },
          { transactionId: id }
        ]
      },
      include: {
        booking: {
          include: {
            package: true,
            user: { select: { name: true, email: true, mobile: true } }
          }
        }
      }
    });

    if (!payment) {
      return res.status(404).json({ success: false, message: 'Payment record not found.' });
    }

    return res.json({ success: true, payment });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  processPayment,
  getPaymentById
};
