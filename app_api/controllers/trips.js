const mongoose = require('mongoose');
const Trip = mongoose.model('trips');

// GET all trips
const tripsList = async (req, res) => {
  try {
    const trips = await Trip.find();
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET a single trip by `tripCode`
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

// POST: Add a new trip
const tripsAddTrip = async (req, res) => {
  try {
    const newTrip = new Trip(req.body);
    const trip = await newTrip.save();
    res.status(201).json(trip);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT: Update an existing trip
const tripsUpdateTrip = async (req, res) => {
  try {
    const updatedTrip = await Trip.findOneAndUpdate(
      { code: req.params.tripCode },
      req.body,
      { new: true, runValidators: true }
    );
    if (updatedTrip) {
      res.status(200).json(updatedTrip);
    } else {
      res.status(404).json({ message: 'Trip not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE: Delete an existing trip
const tripsDeleteTrip = async (req, res) => {
  try {
    const deletedTrip = await Trip.findOneAndDelete({ code: req.params.tripCode });
    if (deletedTrip) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Trip not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error deleting trip', error: error.message });
  }
};

module.exports = {
  tripsList,
  tripReadOne,
  tripsAddTrip,
  tripsUpdateTrip,
  tripsDeleteTrip,
};