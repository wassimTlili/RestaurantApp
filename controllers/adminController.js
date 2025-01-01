const Personnel = require('../models/Personnel');
const bcrypt = require('bcrypt');

// Create Personnel
exports.createPersonnel = async (req, res) => {
  try {
    const { name, lastname, email, password, poste } = req.body;

    // Check if personnel already exists
    const existingPersonnel = await Personnel.findOne({ email });
    if (existingPersonnel) {
      return res.status(400).json({ message: 'Personnel already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create personnel
    const newPersonnel = new Personnel({
      name,
      lastname,
      email,
      password: hashedPassword,
      poste,
    });

    await newPersonnel.save();
    res.status(201).json({ message: 'Personnel created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
