const express = require('express');
const router = express.Router();
const tourController = require('../controllers/tourController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

/**
 * Public Routes
 */
router.get('/', tourController.getAllTours);
router.get('/destination/:destination', tourController.getToursByDestination);
router.get('/:id', tourController.getTourById);

/**
 * Admin Routes (Protected)
 */
router.post('/', authMiddleware, adminMiddleware, tourController.createTour);
router.put('/:id', authMiddleware, adminMiddleware, tourController.updateTour);
router.delete('/:id', authMiddleware, adminMiddleware, tourController.deleteTour);

module.exports = router;
