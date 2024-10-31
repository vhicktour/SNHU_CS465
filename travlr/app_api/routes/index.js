const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/trips');

// Route to get all trips
router.get('/trips', tripsController.tripsList);

// Route to get a single trip by `tripCode`
router.get('/trips/:tripCode', tripsController.tripReadOne);

module.exports = router;
