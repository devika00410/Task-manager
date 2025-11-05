const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./Config/db');

const app = express();

// CORS middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-frontend-app.onrender.com' 
  ],
  credentials: true
}));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Basic route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Personal Task Manager API is running!',
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint - SIMPLIFIED
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is healthy',
    timestamp: new Date().toISOString()
  });
});

// Mount routers
app.use('/api/auth', require('./Routes/authRoutes'));     
app.use('/api/tasks', require('./Routes/taskRoutes'));

// Handle undefined routes
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

// Connect to database and THEN start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(` Server running on port ${PORT}`);
    console.log(` Database: taskmanager_db`);
    console.log(` Environment: ${process.env.NODE_ENV}`);
    console.log(` Health check: http://localhost:${PORT}/health`);
  });
}).catch(err => {
  console.error('Failed to connect to database:', err);
  process.exit(1);
});