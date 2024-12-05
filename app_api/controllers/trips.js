// app_api/controllers/trips.js
const mongoose = require('mongoose');
const Trip = mongoose.model('trips');

// Get all trips
const tripsList = async (req, res) => {
  console.log('tripsList controller called');
  try {
    const trips = await Trip.find();
    res.status(200).json(trips);
  } catch (error) {
    console.error('Error in tripsList:', error);
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
    console.error('Error in tripReadOne:', error);
    res.status(500).json({ message: error.message });
  }
};

// POST: /trips - Add a new Trip
const tripsAddTrip = async (req, res) => {
  try {
    const newTrip = new Trip(req.body);
    const trip = await newTrip.save();
    res.status(201).json(trip);
  } catch (error) {
    console.error('Error in tripsAddTrip:', error);
    res.status(400).json({ message: 'Error creating trip', error: error.message });
  }
};

// PUT: /trips/:tripCode - Update an existing Trip
const tripsUpdateTrip = async (req, res) => {
  console.log('tripsUpdateTrip controller called with tripCode:', req.params.tripCode);
  try {
    const updatedTrip = await Trip.findOneAndUpdate(
      { code: req.params.tripCode },
      req.body,
      { new: true, runValidators: true } // Return the updated document and validate
    );

    if (!updatedTrip) {
      console.log('No trip found to update with code:', req.params.tripCode);
      return res.status(404).json({ message: 'Trip not found' });
    }

    console.log('Trip updated successfully:', updatedTrip);
    res.status(200).json(updatedTrip);
  } catch (error) {
    console.error('Error in tripsUpdateTrip:', error);
    res.status(400).json({ message: 'Error updating trip', error: error.message });
  }
};

module.exports = {
  tripsList,
  tripReadOne,
  tripsAddTrip,
  tripsUpdateTrip, // Added export for update method
};
