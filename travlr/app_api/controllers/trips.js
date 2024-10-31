const mongoose = require('mongoose');
const Trip = mongoose.model('trips');

// Get all trips
const tripsList = async (req, res) => {
  try {
    const trips = await Trip.find();
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single trip by `tripCode`
const tripReadOne = async (req, res) => {
  try {
    const trip = await Trip.findOne({ code: req.params.tripCode });
    if (trip) {
      res.status(200).json(trip);
    } else {
      res.status(404).json({ message: 'Trip not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { tripsList, tripReadOne };
