// app_api/routes/index.js
const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/trips');

// Define route for our trips endpoint
router
  .route('/trips')
  .get(tripsController.tripsList)
  .post(tripsController.tripsAddTrip); // Add the POST route

// Route to get a single trip by `tripCode` and to update a trip
router
  .route('/trips/:tripCode')
  .get(tripsController.tripReadOne)
  .put(tripsController.tripsUpdateTrip); // Add the PUT route

module.exports = router;
