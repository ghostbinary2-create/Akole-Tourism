const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET /api/admin/stats
const getAdminStats = async (req, res, next) => {
  try {
    const totalUsers = await prisma.user.count({ where: { role: 'USER' } });
    const totalPlaces = await prisma.touristPlace.count();
    const totalPackages = await prisma.tourPackage.count();
    const totalBookings = await prisma.booking.count();

    const upcomingTours = await prisma.booking.count({
      where: {
        status: 'CONFIRMED',
        travelDate: { gte: new Date() }
      }
    });

    const revenueResult = await prisma.booking.aggregate({
      _sum: { totalAmount: true },
      where: { paymentStatus: 'SUCCESS' }
    });
    const totalRevenue = revenueResult._sum.totalAmount || 0;

    // Monthly Analytics Mock / Aggregated Data for Recharts
    const monthlyBookings = [
      { month: 'Jan', bookings: 12, revenue: 24000 },
      { month: 'Feb', bookings: 18, revenue: 36000 },
      { month: 'Mar', bookings: 25, revenue: 52000 },
      { month: 'Apr', bookings: 30, revenue: 68000 },
      { month: 'May', bookings: 22, revenue: 45000 },
      { month: 'Jun', bookings: 35, revenue: 78000 },
      { month: 'Jul', bookings: 42, revenue: 95000 },
      { month: 'Aug', bookings: 50, revenue: 112000 }
    ];

    const popularPackages = await prisma.tourPackage.findMany({
      take: 5,
      select: {
        id: true,
        name: true,
        _count: { select: { bookings: true } }
      },
      orderBy: { bookings: { _count: 'desc' } }
    });

    const formattedPopularPackages = popularPackages.map(pkg => ({
      name: pkg.name.length > 20 ? pkg.name.substring(0, 20) + '...' : pkg.name,
      bookings: pkg._count.bookings
    }));

    const userRegistrations = [
      { month: 'Jan', users: 15 },
      { month: 'Feb', users: 24 },
      { month: 'Mar', users: 38 },
      { month: 'Apr', users: 45 },
      { month: 'May', users: 52 },
      { month: 'Jun', users: 68 },
      { month: 'Jul', users: 84 },
      { month: 'Aug', users: 105 }
    ];

    return res.json({
      success: true,
      stats: {
        totalUsers,
        totalPlaces,
        totalPackages,
        totalBookings,
        upcomingTours,
        totalRevenue
      },
      charts: {
        monthlyBookings,
        popularPackages: formattedPopularPackages,
        userRegistrations
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAdminStats };
