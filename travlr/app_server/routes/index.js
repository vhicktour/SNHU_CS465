const express = require('express');
const router = express.Router();
const mainController = require('../controllers/main');
const travelController = require('../controllers/travel');

// Route for the main page
router.get('/', mainController.index);

// Route for the travel page
router.get('/travel', travelController.travel);

module.exports = router;
