const express = require('express');
const path = require('path');
const hbs = require('hbs');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
console.log('JWT Secret is set:', !!process.env.JWT_SECRET);

// Initialize Express
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB first
require('./app_api/models/db');

// Load models before passport configuration
require('./app_api/models/user'); // Add this line to load the User model first

// Initialize Passport after models are loaded
const passport = require('passport');
require('./app_api/config/passport');

// Enable CORS with specific options
app.use(
  cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With', 'Accept'],
    credentials: true,
  })
);

// Parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize Passport middleware
app.use(passport.initialize());

// Log MongoDB connection status
mongoose.connection.on('connected', () => {
  console.log('MongoDB connected successfully.');
});
mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

// Set up Handlebars as the view engine
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'app_server', 'views'));

// Register Handlebars partials
hbs.registerPartials(path.join(__dirname, 'app_server', 'views', 'partials'));

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Import routes
const apiRouter = require('./app_api/routes/index');
const indexRouter = require('./app_server/routes/index');
const roomsRouter = require('./app_server/routes/rooms');
const travelRouter = require('./app_server/routes/travel');
const mealsRouter = require('./app_server/routes/meals');
const newsRouter = require('./app_server/routes/news');
const contactRouter = require('./app_server/routes/contact');
const aboutRouter = require('./app_server/routes/about');

// Use API routes first (before error handlers)
app.use('/api', apiRouter);

// Use frontend routes
app.use('/', indexRouter);
app.use('/rooms', roomsRouter);
app.use('/travel', travelRouter);
app.use('/meals', mealsRouter);
app.use('/news', newsRouter);
app.use('/contact', contactRouter);
app.use('/about', aboutRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', message: 'Server is running smoothly.' });
});

// Error handling for unauthorized access
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    console.log('Unauthorized error caught:', err.message);
    return res.status(401).json({
      message: 'Unauthorized access',
      error: 'No authorization token was found'
    });
  }
  next(err);
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;