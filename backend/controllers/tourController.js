const Tour = require('../models/Tour');
const Review = require('../models/Review');

/**
 * Get all tours with optional filters
 * Query params: destination, minPrice, maxPrice, sortBy
 */
exports.getAllTours = async (req, res) => {
  try {
    const { destination, minPrice, maxPrice, sortBy } = req.query;

    // Build filter object
    let filter = {};

    if (destination) {
      filter.destination = { $regex: destination, $options: 'i' }; // Case insensitive search
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // Build sort object
    let sortObject = {};
    if (sortBy === 'price-asc') sortObject.price = 1;
    if (sortBy === 'price-desc') sortObject.price = -1;
    if (sortBy === 'newest') sortObject.createdAt = -1;
    if (sortBy === 'rating') sortObject.rating = -1;

    const tours = await Tour.find(filter).sort(sortObject);

    res.status(200).json({
      success: true,
      count: tours.length,
      data: tours,
    });
  } catch (error) {
    console.error('Get tours error:', error);
    res.status(500).json({ success: false, message: 'Error fetching tours' });
  }
};

/**
 * Get single tour by ID with reviews
 */
exports.getTourById = async (req, res) => {
  try {
    const { id } = req.params;

    const tour = await Tour.findById(id);

    if (!tour) {
      return res.status(404).json({ success: false, message: 'Tour not found' });
    }

    // Fetch reviews for this tour
    const reviews = await Review.find({ tourId: id })
      .populate('userId', 'name')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: {
        ...tour._doc,
        reviews,
      },
    });
  } catch (error) {
    console.error('Get tour by ID error:', error);
    res.status(500).json({ success: false, message: 'Error fetching tour' });
  }
};

/**
 * Create new tour (Admin only)
 */
exports.createTour = async (req, res) => {
  try {
    const { name, description, price, duration, destination, images } = req.body;

    // Validation
    if (!name || !description || !price || !duration || !destination) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, description, price, duration, destination',
      });
    }

    if (price <= 0) {
      return res.status(400).json({ success: false, message: 'Price must be greater than 0' });
    }

    const tour = new Tour({
      name,
      description,
      price,
      duration,
      destination,
      images: images || [],
      rating: 0,
    });

    await tour.save();

    res.status(201).json({
      success: true,
      message: 'Tour created successfully',
      data: tour,
    });
  } catch (error) {
    console.error('Create tour error:', error);
    res.status(500).json({ success: false, message: 'Error creating tour' });
  }
};

/**
 * Update tour (Admin only)
 */
exports.updateTour = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, duration, destination, images, rating } = req.body;

    // Check if tour exists
    const tour = await Tour.findById(id);
    if (!tour) {
      return res.status(404).json({ success: false, message: 'Tour not found' });
    }

    // Validate price if provided
    if (price && price <= 0) {
      return res.status(400).json({ success: false, message: 'Price must be greater than 0' });
    }

    // Update fields
    if (name) tour.name = name;
    if (description) tour.description = description;
    if (price) tour.price = price;
    if (duration) tour.duration = duration;
    if (destination) tour.destination = destination;
    if (images) tour.images = images;
    if (rating !== undefined) tour.rating = rating;

    await tour.save();

    res.status(200).json({
      success: true,
      message: 'Tour updated successfully',
      data: tour,
    });
  } catch (error) {
    console.error('Update tour error:', error);
    res.status(500).json({ success: false, message: 'Error updating tour' });
  }
};

/**
 * Delete tour (Admin only)
 */
exports.deleteTour = async (req, res) => {
  try {
    const { id } = req.params;

    const tour = await Tour.findByIdAndDelete(id);

    if (!tour) {
      return res.status(404).json({ success: false, message: 'Tour not found' });
    }

    // Also delete associated reviews
    await Review.deleteMany({ tourId: id });

    res.status(200).json({
      success: true,
      message: 'Tour deleted successfully',
    });
  } catch (error) {
    console.error('Delete tour error:', error);
    res.status(500).json({ success: false, message: 'Error deleting tour' });
  }
};

/**
 * Get tours by destination
 */
exports.getToursByDestination = async (req, res) => {
  try {
    const { destination } = req.params;

    const tours = await Tour.find({
      destination: { $regex: destination, $options: 'i' },
    });

    if (tours.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No tours found for destination: ${destination}`,
      });
    }

    res.status(200).json({
      success: true,
      count: tours.length,
      data: tours,
    });
  } catch (error) {
    console.error('Get tours by destination error:', error);
    res.status(500).json({ success: false, message: 'Error fetching tours' });
  }
};

/**
 * Update tour rating (Called after review is created/deleted)
 */
exports.updateTourRating = async (tourId) => {
  try {
    const reviews = await Review.find({ tourId, isVerified: true });

    if (reviews.length === 0) {
      await Tour.findByIdAndUpdate(tourId, { rating: 0 });
      return;
    }

    const averageRating =
      reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

    await Tour.findByIdAndUpdate(tourId, { rating: averageRating.toFixed(1) });
  } catch (error) {
    console.error('Update tour rating error:', error);
  }
};
