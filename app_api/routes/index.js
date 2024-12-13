const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');
const { expressjwt: jwt } = require('express-jwt'); // Updated import for v8

// JWT middleware
const auth = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
});

// Define route for listing and adding trips
router
  .route('/trips')
  .get(tripsController.tripsList) // Public route
  .post(auth, tripsController.tripsAddTrip); // Protected route

// Define route for getting, updating, and deleting a single trip by `tripCode`
router
  .route('/trips/:tripCode')
  .get(tripsController.tripReadOne) // Public route
  .put(auth, tripsController.tripsUpdateTrip) // Protected route
  .delete(auth, tripsController.tripsDeleteTrip); // Protected route

// Authentication routes
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;