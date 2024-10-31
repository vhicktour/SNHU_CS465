const express = require('express');
const path = require('path');
const hbs = require('hbs');
const mongoose = require('mongoose');

// Initialize Express
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB via Mongoose (ensure MongoDB is running locally or configured to connect)
require('./app_api/models/db');

// Set up Handlebars as the view engine
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'app_server', 'views'));

// Register partials
hbs.registerPartials(path.join(__dirname, 'app_server', 'views', 'partials'));

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Import app_server routes (frontend)
const indexRouter = require('./app_server/routes/index');
const roomsRouter = require('./app_server/routes/rooms');
const travelRouter = require('./app_server/routes/travel');
const mealsRouter = require('./app_server/routes/meals');
const newsRouter = require('./app_server/routes/news');
const contactRouter = require('./app_server/routes/contact');
const aboutRouter = require('./app_server/routes/about');

// Import app_api routes (API backend)
const apiRouter = require('./app_api/routes/index');

// Use frontend routes
app.use('/', indexRouter);
app.use('/rooms', roomsRouter);
app.use('/travel', travelRouter);
app.use('/meals', mealsRouter);
app.use('/news', newsRouter);
app.use('/contact', contactRouter);
app.use('/about', aboutRouter);

// Use API routes
app.use('/api', apiRouter); 

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
