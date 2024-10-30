const express = require('express');
const router = express.Router();
const mealsController = require('../controllers/meals');

// Define the route for /meals
router.get('/', mealsController.meals);

module.exports = router;
