const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact');

// Define the route for /contact
router.get('/', contactController.contact);

module.exports = router;
