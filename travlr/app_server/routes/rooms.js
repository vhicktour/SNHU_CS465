const express = require('express');
const router = express.Router();
const roomsController = require('../controllers/rooms');

// Define the route for /rooms
router.get('/', roomsController.rooms);

module.exports = router;
