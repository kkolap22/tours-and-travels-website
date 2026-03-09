const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

/**
 * User Routes (Protected - Authenticated users only)
 */
router.post('/', authMiddleware, bookingController.createBooking);
router.get('/my-bookings', authMiddleware, bookingController.getMyBookings);
router.get('/:id', authMiddleware, bookingController.getBookingById);
router.put('/:id/cancel', authMiddleware, bookingController.cancelBooking);

/**
 * Admin Routes (Protected - Admin only)
 */
router.get('/', authMiddleware, adminMiddleware, bookingController.getAllBookings);
router.put('/:id/status', authMiddleware, adminMiddleware, bookingController.updateBookingStatus);

module.exports = router;
