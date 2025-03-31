const mongoose = require('mongoose');

const GuestSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  roomNumber: {
    type: String,
    required: true
  },
  roomKey: {
    type: String,
    default: ''
  },
  deposit: {
    type: Number,
    default: 0
  },
  additionalBookings: {
    type: String,
    default: ''
  },
  skiPassCategory: {
    type: String,
    default: ''
  },
  // Additional fields for ski pass categories or other info
  customFields: {
    type: Map,
    of: String,
    default: {}
  },
  // Status tracking
  keyReturned: {
    type: Boolean,
    default: false
  },
  paymentCompleted: {
    type: Boolean,
    default: false
  },
  checkedOut: {
    type: Boolean,
    default: false
  },
  // Reference to the accommodation this guest is staying at
  accommodation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Accommodation',
    required: true
  },
  checkInDate: {
    type: Date,
    default: Date.now
  },
  checkOutDate: {
    type: Date
  },
  notes: {
    type: String,
    default: ''
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

module.exports = mongoose.model('Guest', GuestSchema); 