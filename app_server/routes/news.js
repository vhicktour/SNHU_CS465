const express = require('express');
const router = express.Router();
const newsController = require('../controllers/news');

// Define the route for /news
router.get('/', newsController.news);

module.exports = router;
