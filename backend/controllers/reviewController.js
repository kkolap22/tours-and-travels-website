const Review = require('../models/Review');
const Tour = require('../models/Tour');
const Booking = require('../models/Booking');
const { updateTourRating } = require('./tourController');

/**
 * Create a new review (Authenticated users only)
 * User must have a confirmed booking for this tour
 */
exports.createReview = async (req, res) => {
  try {
    const { tourId, rating, comment } = req.body;
    const userId = req.userId;

    // Validation
    if (!tourId || rating === undefined || !comment) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: tourId, rating, comment',
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5',
      });
    }

    if (comment.length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Comment must be at least 10 characters long',
      });
    }

    if (comment.length > 500) {
      return res.status(400).json({
        success: false,
        message: 'Comment cannot exceed 500 characters',
      });
    }

    // Check if tour exists
    const tour = await Tour.findById(tourId);
    if (!tour) {
      return res.status(404).json({ success: false, message: 'Tour not found' });
    }

    // Check if user has a confirmed booking for this tour
    const booking = await Booking.findOne({
      userId,
      tourId,
      status: 'confirmed',
    });

    if (!booking) {
      return res.status(403).json({
        success: false,
        message: 'You can only review tours you have booked and confirmed',
      });
    }

    // Check if user already reviewed this tour
    const existingReview = await Review.findOne({ userId, tourId });
    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this tour. You can update your existing review.',
      });
    }

    // Create review
    const review = new Review({
      userId,
      tourId,
      rating,
      comment,
      isVerified: true, // Auto-verify since we checked booking
    });

    await review.save();
    await review.populate('userId', 'name');

    // Update tour rating
    await updateTourRating(tourId);

    res.status(201).json({
      success: true,
      message: 'Review posted successfully',
      data: review,
    });
  } catch (error) {
    console.error('Create review error:', error);
    res.status(500).json({ success: false, message: 'Error posting review' });
  }
};

/**
 * Get reviews for a specific tour
 */
exports.getReviewsByTour = async (req, res) => {
  try {
    const { tourId } = req.params;

    // Check if tour exists
    const tour = await Tour.findById(tourId);
    if (!tour) {
      return res.status(404).json({ success: false, message: 'Tour not found' });
    }

    const reviews = await Review.find({ tourId, isVerified: true })
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });

    // Calculate average rating
    let averageRating = 0;
    if (reviews.length > 0) {
      averageRating =
        (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1);
    }

    res.status(200).json({
      success: true,
      count: reviews.length,
      averageRating,
      data: reviews,
    });
  } catch (error) {
    console.error('Get reviews by tour error:', error);
    res.status(500).json({ success: false, message: 'Error fetching reviews' });
  }
};

/**
 * Update review (User can only update their own review)
 */
exports.updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;
    const userId = req.userId;

    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    // Check if user owns this review
    if (review.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'You can only update your own review',
      });
    }

    // Validate rating if provided
    if (rating !== undefined) {
      if (rating < 1 || rating > 5) {
        return res.status(400).json({
          success: false,
          message: 'Rating must be between 1 and 5',
        });
      }
      review.rating = rating;
    }

    // Validate comment if provided
    if (comment !== undefined) {
      if (comment.length < 10) {
        return res.status(400).json({
          success: false,
          message: 'Comment must be at least 10 characters long',
        });
      }
      if (comment.length > 500) {
        return res.status(400).json({
          success: false,
          message: 'Comment cannot exceed 500 characters',
        });
      }
      review.comment = comment;
    }

    review.updatedAt = new Date();
    await review.save();
    await review.populate('userId', 'name');

    // Update tour rating
    await updateTourRating(review.tourId);

    res.status(200).json({
      success: true,
      message: 'Review updated successfully',
      data: review,
    });
  } catch (error) {
    console.error('Update review error:', error);
    res.status(500).json({ success: false, message: 'Error updating review' });
  }
};

/**
 * Delete review (User can delete their own, Admin can delete any)
 */
exports.deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    // Check permissions (user can delete own review, admin can delete any)
    const User = require('../models/User');
    const user = await User.findById(userId);

    if (user.role !== 'admin' && review.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'You can only delete your own review',
      });
    }

    const tourId = review.tourId;
    await Review.findByIdAndDelete(id);

    // Update tour rating
    await updateTourRating(tourId);

    res.status(200).json({
      success: true,
      message: 'Review deleted successfully',
    });
  } catch (error) {
    console.error('Delete review error:', error);
    res.status(500).json({ success: false, message: 'Error deleting review' });
  }
};

/**
 * Get reviews by user (for their profile)
 */
exports.getReviewsByUser = async (req, res) => {
  try {
    const userId = req.userId;

    const reviews = await Review.find({ userId, isVerified: true })
      .populate('tourId', 'name destination images')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (error) {
    console.error('Get reviews by user error:', error);
    res.status(500).json({ success: false, message: 'Error fetching reviews' });
  }
};
