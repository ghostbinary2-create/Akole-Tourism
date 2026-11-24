const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// POST /api/reviews (User Auth)
const createReview = async (req, res, next) => {
  try {
    const { packageId, rating, comment } = req.body;
    const userId = req.user.id;

    if (!packageId || !rating || !comment) {
      return res.status(400).json({ success: false, message: 'Package, star rating (1-5), and comment are required.' });
    }

    const ratingNum = parseInt(rating);
    if (ratingNum < 1 || ratingNum > 5) {
      return res.status(400).json({ success: false, message: 'Rating must be between 1 and 5 stars.' });
    }

    const pkg = await prisma.tourPackage.findUnique({ where: { id: packageId } });
    if (!pkg) {
      return res.status(404).json({ success: false, message: 'Tour package not found.' });
    }

    const newReview = await prisma.review.create({
      data: {
        userId,
        packageId,
        rating: ratingNum,
        comment,
        isApproved: true // auto approve or admin moderate
      },
      include: {
        user: { select: { name: true, profileImage: true } }
      }
    });

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your review has been published.',
      review: newReview
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/reviews/package/:packageId (Public)
const getReviewsByPackage = async (req, res, next) => {
  try {
    const { packageId } = req.params;

    const reviews = await prisma.review.findMany({
      where: {
        packageId,
        isApproved: true
      },
      include: {
        user: { select: { name: true, profileImage: true } }
      },
      orderBy: { createdAt: 'desc' }
    });

    return res.json({ success: true, count: reviews.length, reviews });
  } catch (error) {
    next(error);
  }
};

// GET /api/admin/reviews (Admin only)
const getAllReviewsAdmin = async (req, res, next) => {
  try {
    const reviews = await prisma.review.findMany({
      include: {
        user: { select: { name: true, email: true } },
        package: { select: { name: true } }
      },
      orderBy: { createdAt: 'desc' }
    });

    return res.json({ success: true, count: reviews.length, reviews });
  } catch (error) {
    next(error);
  }
};

// PUT /api/admin/reviews/:id/approve (Admin only)
const approveReview = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updatedReview = await prisma.review.update({
      where: { id },
      data: { isApproved: true }
    });

    return res.json({ success: true, message: 'Review approved.', review: updatedReview });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/reviews/:id (User/Admin)
const deleteReview = async (req, res, next) => {
  try {
    const { id } = req.params;

    const review = await prisma.review.findUnique({ where: { id } });
    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found.' });
    }

    if (req.user.role !== 'ADMIN' && review.userId !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Forbidden. Cannot delete this review.' });
    }

    await prisma.review.delete({ where: { id } });

    return res.json({ success: true, message: 'Review deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createReview,
  getReviewsByPackage,
  getAllReviewsAdmin,
  approveReview,
  deleteReview
};
