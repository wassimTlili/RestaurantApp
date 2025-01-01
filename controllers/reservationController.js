const Reservation = require('../models/Reservation'); // Import the Reservation model

// Create a reservation
exports.createReservation = async (req, res) => {
  try {
    const { date, nbPersonnes } = req.body;

    // Create new reservation instance
    const newReservation = new Reservation({
      userId: req.user.userId, // Assuming you have a `userId` from authentication middleware
      date,
      nbPersonnes,
    });

    // Save reservation to the database
    await newReservation.save();
    res.status(201).json({ message: 'Reservation created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all reservations
exports.getAllReservations = async (req, res) => {
  try {
    // Fetch all reservations, optionally populate user details (e.g., name, email)
    const reservations = await Reservation.find()
      .populate('userId', 'name email') // This will populate the user info (if needed)
      .exec();

    res.status(200).json({
      message: 'All reservations fetched successfully',
      reservations,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
