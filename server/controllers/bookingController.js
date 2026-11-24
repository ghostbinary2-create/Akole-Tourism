const { PrismaClient } = require('@prisma/client');
const { generateBookingId } = require('../utils/bookingIdGenerator');

const prisma = new PrismaClient();

// POST /api/bookings (User Auth required)
const createBooking = async (req, res, next) => {
  try {
    const { packageId, travelDate, numberOfPeople } = req.body;
    const userId = req.user.id;

    if (!packageId || !numberOfPeople || parseInt(numberOfPeople) <= 0) {
      return res.status(400).json({ success: false, message: 'Package and valid number of travelers are required.' });
    }

    const pkg = await prisma.tourPackage.findUnique({ where: { id: packageId } });
    if (!pkg) {
      return res.status(404).json({ success: false, message: 'Tour package not found.' });
    }

    if (pkg.status !== 'ACTIVE') {
      return res.status(400).json({ success: false, message: 'This tour package is currently unavailable for booking.' });
    }

    const peopleCount = parseInt(numberOfPeople);
    if (pkg.availableSeats < peopleCount) {
      return res.status(400).json({
        success: false,
        message: `Only ${pkg.availableSeats} seat(s) remaining for this tour package.`
      });
    }

    const totalAmount = pkg.price * peopleCount;
    const bookingId = await generateBookingId(prisma);

    // Create booking and initial PENDING payment
    const newBooking = await prisma.booking.create({
      data: {
        bookingId,
        userId,
        packageId,
        travelDate: travelDate ? new Date(travelDate) : pkg.startDate,
        numberOfPeople: peopleCount,
        totalAmount,
        status: 'PENDING',
        paymentStatus: 'PENDING',
        payment: {
          create: {
            amount: totalAmount,
            paymentMethod: 'MOCK_UPI',
            transactionId: `TXN_${bookingId}_${Date.now()}`,
            paymentStatus: 'PENDING',
          }
        }
      },
      include: {
        package: true,
        payment: true,
        user: { select: { name: true, email: true, mobile: true } }
      }
    });

    // Update package available seats
    await prisma.tourPackage.update({
      where: { id: packageId },
      data: { availableSeats: pkg.availableSeats - peopleCount }
    });

    // Create notification
    await prisma.notification.create({
      data: {
        userId,
        title: 'Booking Created',
        message: `Your booking ${bookingId} for ${pkg.name} has been created. Please complete payment to confirm.`,
        type: 'BOOKING'
      }
    });

    return res.status(201).json({
      success: true,
      message: 'Booking initiated successfully! Please proceed to payment.',
      booking: {
        ...newBooking,
        package: {
          ...newBooking.package,
          images: JSON.parse(newBooking.package.images || '[]')
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/bookings/my (User Auth)
const getMyBookings = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const bookings = await prisma.booking.findMany({
      where: { userId },
      include: {
        package: true,
        payment: true
      },
      orderBy: { createdAt: 'desc' }
    });

    const parsedBookings = bookings.map((b) => ({
      ...b,
      package: {
        ...b.package,
        images: JSON.parse(b.package.images || '[]')
      }
    }));

    return res.json({ success: true, count: parsedBookings.length, bookings: parsedBookings });
  } catch (error) {
    next(error);
  }
};

// GET /api/bookings/:id
const getBookingById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const booking = await prisma.booking.findFirst({
      where: {
        OR: [
          { id },
          { bookingId: id }
        ]
      },
      include: {
        package: true,
        payment: true,
        user: { select: { id: true, name: true, email: true, mobile: true } }
      }
    });

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found.' });
    }

    if (req.user.role !== 'ADMIN' && booking.userId !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Forbidden. You do not have permission to view this booking.' });
    }

    const parsedBooking = {
      ...booking,
      package: {
        ...booking.package,
        images: JSON.parse(booking.package.images || '[]'),
        includedServices: JSON.parse(booking.package.includedServices || '[]'),
        itinerary: JSON.parse(booking.package.itinerary || '[]')
      }
    };

    return res.json({ success: true, booking: parsedBooking });
  } catch (error) {
    next(error);
  }
};

// PUT /api/bookings/:id/cancel (User or Admin)
const cancelBooking = async (req, res, next) => {
  try {
    const { id } = req.params;

    const booking = await prisma.booking.findUnique({
      where: { id },
      include: { package: true }
    });

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found.' });
    }

    if (req.user.role !== 'ADMIN' && booking.userId !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Forbidden. You cannot cancel this booking.' });
    }

    if (booking.status === 'CANCELLED') {
      return res.status(400).json({ success: false, message: 'Booking is already cancelled.' });
    }

    // Update booking & payment status
    const updatedBooking = await prisma.booking.update({
      where: { id },
      data: {
        status: 'CANCELLED',
        paymentStatus: booking.paymentStatus === 'SUCCESS' ? 'REFUNDED' : 'CANCELLED'
      }
    });

    if (booking.payment) {
      await prisma.payment.update({
        where: { bookingId: id },
        data: {
          paymentStatus: booking.paymentStatus === 'SUCCESS' ? 'REFUNDED' : 'FAILED'
        }
      });
    }

    // Restore available seats
    await prisma.tourPackage.update({
      where: { id: booking.packageId },
      data: { availableSeats: booking.package.availableSeats + booking.numberOfPeople }
    });

    // Notify User
    await prisma.notification.create({
      data: {
        userId: booking.userId,
        title: 'Booking Cancelled',
        message: `Your booking ${booking.bookingId} for ${booking.package.name} has been cancelled.`,
        type: 'BOOKING'
      }
    });

    return res.json({ success: true, message: 'Booking cancelled successfully.', booking: updatedBooking });
  } catch (error) {
    next(error);
  }
};

// --- ADMIN BOOKING MANAGEMENT ENDPOINTS ---

// GET /api/admin/bookings (Admin only)
const getAllAdminBookings = async (req, res, next) => {
  try {
    const { status, paymentStatus, search } = req.query;

    const whereClause = {};
    if (status) whereClause.status = status;
    if (paymentStatus) whereClause.paymentStatus = paymentStatus;

    if (search) {
      whereClause.OR = [
        { bookingId: { contains: search } },
        { user: { name: { contains: search } } },
        { user: { email: { contains: search } } },
        { package: { name: { contains: search } } }
      ];
    }

    const bookings = await prisma.booking.findMany({
      where: whereClause,
      include: {
        user: { select: { id: true, name: true, email: true, mobile: true } },
        package: { select: { id: true, name: true, price: true, duration: true } },
        payment: true
      },
      orderBy: { createdAt: 'desc' }
    });

    return res.json({ success: true, count: bookings.length, bookings });
  } catch (error) {
    next(error);
  }
};

// PUT /api/admin/bookings/:id/confirm
const confirmBooking = async (req, res, next) => {
  try {
    const { id } = req.params;

    const booking = await prisma.booking.findUnique({
      where: { id },
      include: { package: true }
    });

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found.' });
    }

    const updatedBooking = await prisma.booking.update({
      where: { id },
      data: {
        status: 'CONFIRMED',
        paymentStatus: 'SUCCESS'
      }
    });

    if (booking.payment) {
      await prisma.payment.update({
        where: { bookingId: id },
        data: { paymentStatus: 'SUCCESS' }
      });
    }

    await prisma.notification.create({
      data: {
        userId: booking.userId,
        title: 'Booking Confirmed!',
        message: `Your booking ${booking.bookingId} for ${booking.package.name} is confirmed! Get ready for your tour.`,
        type: 'BOOKING'
      }
    });

    return res.json({ success: true, message: 'Booking confirmed by admin.', booking: updatedBooking });
  } catch (error) {
    next(error);
  }
};

// PUT /api/admin/bookings/:id/complete
const completeBooking = async (req, res, next) => {
  try {
    const { id } = req.params;

    const booking = await prisma.booking.findUnique({
      where: { id },
      include: { package: true }
    });

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found.' });
    }

    const updatedBooking = await prisma.booking.update({
      where: { id },
      data: { status: 'COMPLETED' }
    });

    await prisma.notification.create({
      data: {
        userId: booking.userId,
        title: 'Tour Completed',
        message: `Hope you enjoyed your tour ${booking.package.name}! Please take a moment to leave a review.`,
        type: 'BOOKING'
      }
    });

    return res.json({ success: true, message: 'Booking marked as completed.', booking: updatedBooking });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  getBookingById,
  cancelBooking,
  getAllAdminBookings,
  confirmBooking,
  completeBooking
};
