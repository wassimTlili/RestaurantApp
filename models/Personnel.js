const mongoose = require('mongoose');

const personnelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  poste: { type: String, required: true }, // e.g., waiter, chef
});

module.exports = mongoose.model('Personnel', personnelSchema);
