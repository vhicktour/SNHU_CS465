const express = require('express');
const path = require('path');
const hbs = require('hbs');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize Express
const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS with specific options
app.use(cors({
  origin: 'http://localhost:4200', // Allow Angular dev server
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With', 'Accept'], // Allowed headers
  credentials: true // Allow credentials
}));

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB via Mongoose (ensure MongoDB is running locally or configured to connect)
require('./app_api/models/db');

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

// Add a health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', message: 'Server is running smoothly.' });
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
