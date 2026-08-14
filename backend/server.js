const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const apiRoutes = require('./routes/api');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: '*', // Allow all origins for dev simplicity, can restrict to front-end port
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Helmet security headers (configured for CORS and API usage)
app.use(helmet({
  crossOriginResourcePolicy: false
}));

// Morgan request logging
app.use(morgan('dev'));

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', apiRoutes);

const path = require('path');
const fs = require('fs');

const frontendDistPath = path.join(__dirname, '../frontend/dist');

// Serve static assets in production OR if frontend/dist exists
if (process.env.NODE_ENV === 'production' || fs.existsSync(frontendDistPath)) {
  // Set static folder
  app.use(express.static(frontendDistPath));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(frontendDistPath, 'index.html'));
  });
} else {
  // Base route
  app.get('/', (req, res) => {
    res.json({ message: 'Rohan Raut Portfolio Backend API is running...' });
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Server Error'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
