const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Import models
const User = require('./models/User');
const Guest = require('./models/Guest');
const Accommodation = require('./models/Accommodation');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Set up MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/gastmanager')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Set up file upload
const upload = multer({ dest: 'uploads/' });

// Define routes

// User routes
app.use('/api/users', require('./routes/users'));

// Guest routes
app.use('/api/guests', require('./routes/guests'));

// Accommodation routes
app.use('/api/accommodations', require('./routes/accommodations'));

// CSV Import route
app.post('/api/import', upload.single('csvFile'), require('./routes/import'));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app; 