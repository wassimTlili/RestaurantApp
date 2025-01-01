const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const { authenticate } = require('../middlewares/authMiddleware'); 

// Create reservation (authenticated user)
router.post('/', authenticate(['client', 'admin']), reservationController.createReservation);

// Get all reservations (admin only)
router.get('/', authenticate(['admin']), reservationController.getAllReservations);

module.exports = router;
