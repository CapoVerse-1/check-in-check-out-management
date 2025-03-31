const mongoose = require('mongoose');

const AccommodationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    street: String,
    city: String,
    postalCode: String,
    country: String
  },
  capacity: {
    type: Number,
    required: true
  },
  // Custom field definitions for this accommodation
  customFields: [{
    name: String,
    type: {
      type: String,
      enum: ['text', 'number', 'boolean', 'date'],
      default: 'text'
    },
    defaultValue: mongoose.Schema.Types.Mixed
  }],
  // Users who have access to this accommodation
  administrators: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Accommodation', AccommodationSchema); 