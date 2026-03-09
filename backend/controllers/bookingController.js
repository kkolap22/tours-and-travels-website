const Booking = require('../models/Booking');
const Tour = require('../models/Tour');
const User = require('../models/User');

/**
 * Create a new booking (Authenticated users only)
 */
exports.createBooking = async (req, res) => {
  try {
    const { tourId, startDate, endDate, numberOfPeople } = req.body;
    const userId = req.userId;

    // Validation
    if (!tourId || !startDate || !endDate || !numberOfPeople) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: tourId, startDate, endDate, numberOfPeople',
      });
    }

    if (numberOfPeople <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Number of people must be greater than 0',
      });
    }

    // Validate date range
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start >= end) {
      return res.status(400).json({
        success: false,
        message: 'Start date must be before end date',
      });
    }

    if (start < new Date()) {
      return res.status(400).json({
        success: false,
        message: 'Start date cannot be in the past',
      });
    }

    // Check if tour exists
    const tour = await Tour.findById(tourId);
    if (!tour) {
      return res.status(404).json({ success: false, message: 'Tour not found' });
    }

    // Calculate total price
    const totalPrice = tour.price * numberOfPeople;

    // Create booking
    const booking = new Booking({
      userId,
      tourId,
      startDate,
      endDate,
      numberOfPeople,
      totalPrice,
      status: 'pending',
    });

    await booking.save();

    // Populate user and tour details
    await booking.populate('userId', 'name email phone');
    await booking.populate('tourId', 'name price destination');

    res.status(201).json({
      success: true,
      message: 'Booking created successfully. Awaiting confirmation.',
      data: booking,
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ success: false, message: 'Error creating booking' });
  }
};

/**
 * Get all bookings of logged-in user
 */
exports.getMyBookings = async (req, res) => {
  try {
    const userId = req.userId;

    const bookings = await Booking.find({ userId })
      .populate('tourId', 'name price destination duration images')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    console.error('Get my bookings error:', error);
    res.status(500).json({ success: false, message: 'Error fetching bookings' });
  }
};

/**
 * Get all bookings (Admin only)
 */
exports.getAllBookings = async (req, res) => {
  try {
    const { status } = req.query;

    let filter = {};
    if (status) {
      filter.status = status;
    }

    const bookings = await Booking.find(filter)
      .populate('userId', 'name email phone')
      .populate('tourId', 'name destination')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    console.error('Get all bookings error:', error);
    res.status(500).json({ success: false, message: 'Error fetching bookings' });
  }
};

/**
 * Get booking by ID
 */
exports.getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const booking = await Booking.findById(id)
      .populate('userId', 'name email phone')
      .populate('tourId');

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    // Check if user owns this booking (unless user is admin)
    const user = await User.findById(userId);
    if (user.role !== 'admin' && booking.userId._id.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to view this booking',
      });
    }

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    console.error('Get booking by ID error:', error);
    res.status(500).json({ success: false, message: 'Error fetching booking' });
  }
};

/**
 * Update booking status (Admin only)
 */
exports.updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Please provide status: pending, confirmed, or cancelled',
      });
    }

    const validStatuses = ['pending', 'confirmed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be: pending, confirmed, or cancelled',
      });
    }

    const booking = await Booking.findByIdAndUpdate(id, { status }, { new: true })
      .populate('userId', 'name email phone')
      .populate('tourId', 'name destination');

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    res.status(200).json({
      success: true,
      message: `Booking status updated to ${status}`,
      data: booking,
    });
  } catch (error) {
    console.error('Update booking status error:', error);
    res.status(500).json({ success: false, message: 'Error updating booking' });
  }
};

/**
 * Cancel booking (User or Admin)
 */
exports.cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    // Check if user owns this booking (unless user is admin)
    const user = await User.findById(userId);
    if (user.role !== 'admin' && booking.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to cancel this booking',
      });
    }

    // Check if booking is already cancelled
    if (booking.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        message: 'This booking is already cancelled',
      });
    }

    booking.status = 'cancelled';
    await booking.save();

    await booking.populate('tourId', 'name destination');

    res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully',
      data: booking,
    });
  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({ success: false, message: 'Error cancelling booking' });
  }
};
