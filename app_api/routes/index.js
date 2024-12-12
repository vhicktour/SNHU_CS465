// app_api/routes/index.js
const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/trips');

// Define route for listing and adding trips
router
  .route('/trips')
  .get(tripsController.tripsList)   // GET all trips
  .post(tripsController.tripsAddTrip); // POST a new trip

// Define route for getting, updating, and deleting a single trip by `tripCode`
router
  .route('/trips/:tripCode')
  .get(tripsController.tripReadOne)    // GET a single trip
  .put(tripsController.tripsUpdateTrip) // PUT (update) a trip
  .delete(tripsController.tripsDeleteTrip); // DELETE a trip

module.exports = router;