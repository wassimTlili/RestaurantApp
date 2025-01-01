// routes/adminRoutes.js
const express = require('express');
const adminController = require('../controllers/adminController');
const { authenticate } = require('../middlewares/authMiddleware'); // Ensure correct import
const router = express.Router();

// Route to create personnel (accessible by admin only)
router.post('/personnel', authenticate(['admin']), adminController.createPersonnel);

module.exports = router;
