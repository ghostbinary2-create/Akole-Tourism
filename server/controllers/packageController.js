const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET /api/packages (Public Search & Filter)
const getAllPackages = async (req, res, next) => {
  try {
    const { search, destination, maxPrice, minPrice, duration, status, placeId } = req.query;

    const whereClause = {};

    if (status && status !== 'ALL') {
      whereClause.status = status;
    } else if (!status) {
      whereClause.status = 'ACTIVE';
    }

    if (placeId) whereClause.placeId = placeId;

    if (search) {
      whereClause.OR = [
        { name: { contains: search } },
        { destination: { contains: search } },
        { description: { contains: search } }
      ];
    }

    if (destination) {
      whereClause.destination = { contains: destination };
    }

    if (maxPrice || minPrice) {
      whereClause.price = {};
      if (minPrice) whereClause.price.gte = parseFloat(minPrice);
      if (maxPrice) whereClause.price.lte = parseFloat(maxPrice);
    }

    if (duration) {
      whereClause.duration = { contains: duration };
    }

    const packages = await prisma.tourPackage.findMany({
      where: whereClause,
      include: {
        place: { select: { id: true, name: true, location: true } },
        reviews: { where: { isApproved: true }, select: { rating: true } },
        _count: { select: { bookings: true } }
      },
      orderBy: { createdAt: 'desc' }
    });

    const parsedPackages = packages.map((pkg) => {
      const avgRating = pkg.reviews.length > 0
        ? pkg.reviews.reduce((acc, r) => acc + r.rating, 0) / pkg.reviews.length
        : 5.0;

      return {
        ...pkg,
        images: JSON.parse(pkg.images || '[]'),
        includedServices: JSON.parse(pkg.includedServices || '[]'),
        excludedServices: JSON.parse(pkg.excludedServices || '[]'),
        itinerary: JSON.parse(pkg.itinerary || '[]'),
        averageRating: Number(avgRating.toFixed(1)),
        reviewCount: pkg.reviews.length
      };
    });

    return res.json({ success: true, count: parsedPackages.length, packages: parsedPackages });
  } catch (error) {
    next(error);
  }
};

// GET /api/packages/:id (Public Detail View)
const getPackageById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const pkg = await prisma.tourPackage.findUnique({
      where: { id },
      include: {
        place: true,
        reviews: {
          where: { isApproved: true },
          include: { user: { select: { name: true, profileImage: true } } },
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!pkg) {
      return res.status(404).json({ success: false, message: 'Tour package not found.' });
    }

    const avgRating = pkg.reviews.length > 0
      ? pkg.reviews.reduce((acc, r) => acc + r.rating, 0) / pkg.reviews.length
      : 5.0;

    const parsedPackage = {
      ...pkg,
      images: JSON.parse(pkg.images || '[]'),
      includedServices: JSON.parse(pkg.includedServices || '[]'),
      excludedServices: JSON.parse(pkg.excludedServices || '[]'),
      itinerary: JSON.parse(pkg.itinerary || '[]'),
      averageRating: Number(avgRating.toFixed(1)),
      reviewCount: pkg.reviews.length
    };

    return res.json({ success: true, package: parsedPackage });
  } catch (error) {
    next(error);
  }
};

// POST /api/packages (Admin only)
const createPackage = async (req, res, next) => {
  try {
    const {
      name,
      description,
      destination,
      duration,
      price,
      maxPeople,
      availableSeats,
      startDate,
      endDate,
      pickupLocation,
      includedServices,
      excludedServices,
      itinerary,
      images,
      status,
      placeId
    } = req.body;

    if (!name || !description || !destination || !price || !duration) {
      return res.status(400).json({ success: false, message: 'Name, description, destination, duration, and price are required.' });
    }

    const newPackage = await prisma.tourPackage.create({
      data: {
        name,
        description,
        destination,
        duration,
        price: parseFloat(price),
        maxPeople: parseInt(maxPeople) || 20,
        availableSeats: availableSeats !== undefined ? parseInt(availableSeats) : parseInt(maxPeople) || 20,
        startDate: startDate ? new Date(startDate) : new Date(),
        endDate: endDate ? new Date(endDate) : new Date(Date.now() + 86400000 * 2),
        pickupLocation: pickupLocation || 'Akole Bus Stand',
        includedServices: JSON.stringify(Array.isArray(includedServices) ? includedServices : [includedServices || 'Guided Tour']),
        excludedServices: JSON.stringify(Array.isArray(excludedServices) ? excludedServices : [excludedServices || 'Personal Expenses']),
        itinerary: JSON.stringify(Array.isArray(itinerary) ? itinerary : [{ day: 'Day 1', title: 'Arrival', description: 'Tour starts' }]),
        images: JSON.stringify(Array.isArray(images) ? images : [images || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80']),
        status: status || 'ACTIVE',
        placeId: placeId || null
      }
    });

    return res.status(201).json({
      success: true,
      message: 'Tour package created successfully!',
      package: {
        ...newPackage,
        images: JSON.parse(newPackage.images),
        includedServices: JSON.parse(newPackage.includedServices),
        excludedServices: JSON.parse(newPackage.excludedServices),
        itinerary: JSON.parse(newPackage.itinerary)
      }
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/packages/:id (Admin only)
const updatePackage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      destination,
      duration,
      price,
      maxPeople,
      availableSeats,
      startDate,
      endDate,
      pickupLocation,
      includedServices,
      excludedServices,
      itinerary,
      images,
      status,
      placeId
    } = req.body;

    const existingPackage = await prisma.tourPackage.findUnique({ where: { id } });
    if (!existingPackage) {
      return res.status(404).json({ success: false, message: 'Tour package not found.' });
    }

    const updateData = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (destination) updateData.destination = destination;
    if (duration) updateData.duration = duration;
    if (price !== undefined) updateData.price = parseFloat(price);
    if (maxPeople !== undefined) updateData.maxPeople = parseInt(maxPeople);
    if (availableSeats !== undefined) updateData.availableSeats = parseInt(availableSeats);
    if (startDate) updateData.startDate = new Date(startDate);
    if (endDate) updateData.endDate = new Date(endDate);
    if (pickupLocation) updateData.pickupLocation = pickupLocation;
    if (status) updateData.status = status;
    if (placeId !== undefined) updateData.placeId = placeId;

    if (includedServices) updateData.includedServices = JSON.stringify(Array.isArray(includedServices) ? includedServices : [includedServices]);
    if (excludedServices) updateData.excludedServices = JSON.stringify(Array.isArray(excludedServices) ? excludedServices : [excludedServices]);
    if (itinerary) updateData.itinerary = JSON.stringify(Array.isArray(itinerary) ? itinerary : [itinerary]);
    if (images) updateData.images = JSON.stringify(Array.isArray(images) ? images : [images]);

    const updatedPackage = await prisma.tourPackage.update({
      where: { id },
      data: updateData
    });

    return res.json({
      success: true,
      message: 'Tour package updated successfully!',
      package: {
        ...updatedPackage,
        images: JSON.parse(updatedPackage.images),
        includedServices: JSON.parse(updatedPackage.includedServices),
        excludedServices: JSON.parse(updatedPackage.excludedServices),
        itinerary: JSON.parse(updatedPackage.itinerary)
      }
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/packages/:id (Admin only)
const deletePackage = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existingPackage = await prisma.tourPackage.findUnique({ where: { id } });
    if (!existingPackage) {
      return res.status(404).json({ success: false, message: 'Tour package not found.' });
    }

    await prisma.tourPackage.delete({ where: { id } });

    return res.json({ success: true, message: 'Tour package deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllPackages,
  getPackageById,
  createPackage,
  updatePackage,
  deletePackage
};
