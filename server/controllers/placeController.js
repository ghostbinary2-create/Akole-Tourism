const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET /api/places (Public)
const getAllPlaces = async (req, res, next) => {
  try {
    const { search, status } = req.query;

    const whereClause = {};

    if (status && status !== 'ALL') {
      whereClause.status = status;
    } else if (!status) {
      // By default show active places unless admin requests all
      whereClause.status = 'ACTIVE';
    }

    if (search) {
      whereClause.OR = [
        { name: { contains: search } },
        { location: { contains: search } },
        { description: { contains: search } },
      ];
    }

    const places = await prisma.touristPlace.findMany({
      where: whereClause,
      include: {
        _count: { select: { packages: true } }
      },
      orderBy: { name: 'asc' }
    });

    const parsedPlaces = places.map((place) => ({
      ...place,
      images: JSON.parse(place.images || '[]'),
      activities: JSON.parse(place.activities || '[]'),
    }));

    return res.json({ success: true, count: parsedPlaces.length, places: parsedPlaces });
  } catch (error) {
    next(error);
  }
};

// GET /api/places/:id (Public)
const getPlaceById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const place = await prisma.touristPlace.findUnique({
      where: { id },
      include: {
        packages: {
          where: { status: 'ACTIVE' },
          orderBy: { price: 'asc' }
        }
      }
    });

    if (!place) {
      return res.status(404).json({ success: false, message: 'Tourist place not found.' });
    }

    const parsedPlace = {
      ...place,
      images: JSON.parse(place.images || '[]'),
      activities: JSON.parse(place.activities || '[]'),
      packages: place.packages.map((pkg) => ({
        ...pkg,
        images: JSON.parse(pkg.images || '[]'),
        includedServices: JSON.parse(pkg.includedServices || '[]'),
        excludedServices: JSON.parse(pkg.excludedServices || '[]'),
        itinerary: JSON.parse(pkg.itinerary || '[]'),
      }))
    };

    return res.json({ success: true, place: parsedPlace });
  } catch (error) {
    next(error);
  }
};

// POST /api/places (Admin only)
const createPlace = async (req, res, next) => {
  try {
    const {
      name,
      description,
      location,
      latitude,
      longitude,
      images,
      bestTimeToVisit,
      activities,
      entryFee,
      status
    } = req.body;

    if (!name || !description || !location) {
      return res.status(400).json({ success: false, message: 'Name, description, and location are required.' });
    }

    const imagesJson = Array.isArray(images) ? JSON.stringify(images) : JSON.stringify([images || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80']);
    const activitiesJson = Array.isArray(activities) ? JSON.stringify(activities) : JSON.stringify(activities ? [activities] : []);

    const newPlace = await prisma.touristPlace.create({
      data: {
        name,
        description,
        location,
        latitude: parseFloat(latitude) || 19.5441,
        longitude: parseFloat(longitude) || 73.7661,
        images: imagesJson,
        bestTimeToVisit: bestTimeToVisit || 'Monsoon & Winter',
        activities: activitiesJson,
        entryFee: parseFloat(entryFee) || 0,
        status: status || 'ACTIVE'
      }
    });

    return res.status(201).json({
      success: true,
      message: 'Tourist place created successfully!',
      place: {
        ...newPlace,
        images: JSON.parse(newPlace.images),
        activities: JSON.parse(newPlace.activities)
      }
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/places/:id (Admin only)
const updatePlace = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      location,
      latitude,
      longitude,
      images,
      bestTimeToVisit,
      activities,
      entryFee,
      status
    } = req.body;

    const existingPlace = await prisma.touristPlace.findUnique({ where: { id } });
    if (!existingPlace) {
      return res.status(404).json({ success: false, message: 'Tourist place not found.' });
    }

    const updateData = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (location) updateData.location = location;
    if (latitude !== undefined) updateData.latitude = parseFloat(latitude);
    if (longitude !== undefined) updateData.longitude = parseFloat(longitude);
    if (bestTimeToVisit) updateData.bestTimeToVisit = bestTimeToVisit;
    if (entryFee !== undefined) updateData.entryFee = parseFloat(entryFee);
    if (status) updateData.status = status;

    if (images) {
      updateData.images = Array.isArray(images) ? JSON.stringify(images) : JSON.stringify([images]);
    }
    if (activities) {
      updateData.activities = Array.isArray(activities) ? JSON.stringify(activities) : JSON.stringify([activities]);
    }

    const updatedPlace = await prisma.touristPlace.update({
      where: { id },
      data: updateData
    });

    return res.json({
      success: true,
      message: 'Tourist place updated successfully!',
      place: {
        ...updatedPlace,
        images: JSON.parse(updatedPlace.images),
        activities: JSON.parse(updatedPlace.activities)
      }
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/places/:id (Admin only)
const deletePlace = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existingPlace = await prisma.touristPlace.findUnique({ where: { id } });
    if (!existingPlace) {
      return res.status(404).json({ success: false, message: 'Tourist place not found.' });
    }

    await prisma.touristPlace.delete({ where: { id } });

    return res.json({ success: true, message: 'Tourist place deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllPlaces,
  getPlaceById,
  createPlace,
  updatePlace,
  deletePlace
};
