const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./Config/db');

// Connect to database
connectDB();

const app = express();

// CORS middleware
app.use(cors());

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Mount routers
app.use('/api/auth', require('./Routes/authRoutes'));     
app.use('/api/tasks', require('./Routes/taskRoutes'));

// Basic route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Personal Task Manager API is running!',
    timestamp: new Date().toISOString()
  });
});

// Handle undefined routes - FIXED VERSION
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({
    success: false,
    message: 'Server error',
    error: process.env.NODE_ENV === 'development' ? error.message : {}
  });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
  console.log(` Database: taskmanager_db`);
  console.log(` Environment: ${process.env.NODE_ENV}`);
});

