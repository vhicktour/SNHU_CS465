const mongoose = require('mongoose');
const Trip = mongoose.model('trips');
const User = mongoose.model('users'); // Import User model

// Helper function to get authenticated user
const getUser = (req, res, callback) => {
  if (req.payload && req.payload.email) {
    User.findOne({ email: req.payload.email }).exec((err, user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      } else if (err) {
        return res.status(500).json(err);
      }
      callback(req, res, user);
    });
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

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

// POST: Add a new trip (secured)
const tripsAddTrip = async (req, res) => {
  getUser(req, res, (req, res, user) => {
    const newTrip = new Trip(req.body);
    newTrip.save((err, trip) => {
      if (err) {
        return res.status(400).json(err); // Bad Request
      } else {
        return res.status(201).json(trip); // Created
      }
    });
  });
};

// PUT: Update an existing trip (secured)
const tripsUpdateTrip = async (req, res) => {
  getUser(req, res, (req, res, user) => {
    Trip.findOneAndUpdate(
      { code: req.params.tripCode },
      req.body,
      { new: true, runValidators: true },
      (err, trip) => {
        if (err) {
          return res.status(400).json(err); // Bad Request
        }
        if (!trip) {
          return res.status(404).json({ message: "Trip not found" }); // Not Found
        }
        return res.status(200).json(trip); // OK
      }
    );
  });
};

// DELETE: Delete an existing trip (secured)
const tripsDeleteTrip = async (req, res) => {
  getUser(req, res, (req, res, user) => {
    Trip.findOneAndDelete({ code: req.params.tripCode }, (err, trip) => {
      if (err) {
        return res.status(400).json({ message: "Error deleting trip", error: err.message }); // Bad Request
      }
      if (!trip) {
        return res.status(404).json({ message: "Trip not found" }); // Not Found
      }
      return res.status(204).send(); // No Content
    });
  });
};

module.exports = {
  tripsList,
  tripReadOne,
  tripsAddTrip,
  tripsUpdateTrip,
  tripsDeleteTrip,
};