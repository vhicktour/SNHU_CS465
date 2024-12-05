const express = require('express');
const router = express.Router();
const aboutController = require('../controllers/about');

// Define the route for /about
router.get('/', aboutController.about);

module.exports = router;
