// routes/orderRoutes.js

const express = require('express');
const orderController = require('../controllers/orderController'); // Correct path to controller
const { authenticate } = require('../middlewares/authMiddleware');
const router = express.Router();

// Define routes for orders

// Create order (accessible by client)
router.post('/', authenticate(['client']), orderController.createOrder);

// Get all orders (accessible by admin or personnel)
router.get('/', authenticate(['admin', 'personnel']), orderController.getAllOrders);

// Get specific order by ID (accessible by admin or personnel)
router.get('/:orderId', authenticate(['admin', 'personnel']), orderController.getOrderById);

// Update order status (accessible by admin or personnel)
router.put('/:orderId', authenticate(['admin', 'personnel']), orderController.updateOrderStatus);

// Delete order (accessible by admin)
router.delete('/:orderId', authenticate(['admin']), orderController.deleteOrder);

module.exports = router;
