const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const authMiddleware = require('../middleware/authMiddleware');

/**
 * Public Routes
 */
router.get('/tour/:tourId', reviewController.getReviewsByTour);

/**
 * User Routes (Protected - Authenticated users only)
 */
router.post('/', authMiddleware, reviewController.createReview);
router.get('/user/me', authMiddleware, reviewController.getReviewsByUser);
router.put('/:id', authMiddleware, reviewController.updateReview);
router.delete('/:id', authMiddleware, reviewController.deleteReview);

module.exports = router;
