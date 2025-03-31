const express = require('express');
const router = express.Router();
const Guest = require('../models/Guest');
const User = require('../models/User');
const Accommodation = require('../models/Accommodation');

// Authentication middleware
const auth = (req, res, next) => {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'defaultsecret');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Check admin rights or access to accommodation
const checkAccommodationAccess = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.role === 'admin') {
      return next();
    }
    
    const accommodationId = req.params.accommodationId || req.body.accommodation;
    if (!accommodationId) {
      return res.status(400).json({ message: 'Accommodation ID is required' });
    }
    
    const accommodation = await Accommodation.findById(accommodationId);
    if (!accommodation) {
      return res.status(404).json({ message: 'Accommodation not found' });
    }
    
    if (accommodation.administrators.includes(req.user.id)) {
      return next();
    }
    
    return res.status(403).json({ message: 'Access denied to this accommodation' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// @route   GET /api/guests
// @desc    Get all guests (admins) or guests from accommodations user has access to
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    // Filter by accommodation if specified
    const accommodationId = req.query.accommodation;
    const filter = accommodationId ? { accommodation: accommodationId } : {};
    
    // Admin sees all guests (possibly filtered by accommodation)
    if (user.role === 'admin') {
      const guests = await Guest.find(filter).populate('accommodation', 'name');
      return res.json(guests);
    }
    
    // Regular user sees only guests from accommodations they have access to
    const accommodations = await Accommodation.find({ administrators: req.user.id });
    const accommodationIds = accommodations.map(acc => acc._id);
    
    const guests = await Guest.find({
      ...filter,
      accommodation: { $in: accommodationIds }
    }).populate('accommodation', 'name');
    
    res.json(guests);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/guests/:id
// @desc    Get guest by ID
// @access  Private with accommodation access check
router.get('/:id', auth, async (req, res) => {
  try {
    const guest = await Guest.findById(req.params.id).populate('accommodation', 'name');
    if (!guest) {
      return res.status(404).json({ message: 'Guest not found' });
    }
    
    // Check if user has access to this guest's accommodation
    const user = await User.findById(req.user.id);
    if (user.role !== 'admin') {
      const accommodation = await Accommodation.findById(guest.accommodation);
      if (!accommodation.administrators.includes(req.user.id)) {
        return res.status(403).json({ message: 'Access denied to this guest' });
      }
    }
    
    res.json(guest);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   POST /api/guests
// @desc    Create a guest
// @access  Private with accommodation access check
router.post('/', auth, checkAccommodationAccess, async (req, res) => {
  const {
    firstName,
    lastName,
    roomNumber,
    roomKey,
    deposit,
    additionalBookings,
    skiPassCategory,
    customFields,
    accommodation,
    checkInDate,
    checkOutDate,
    notes
  } = req.body;

  try {
    const newGuest = new Guest({
      firstName,
      lastName,
      roomNumber,
      roomKey,
      deposit,
      additionalBookings,
      skiPassCategory,
      customFields: customFields || {},
      accommodation,
      checkInDate,
      checkOutDate,
      notes
    });

    const guest = await newGuest.save();
    res.json(guest);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT /api/guests/:id
// @desc    Update a guest
// @access  Private with accommodation access check
router.put('/:id', auth, async (req, res) => {
  try {
    let guest = await Guest.findById(req.params.id);
    if (!guest) {
      return res.status(404).json({ message: 'Guest not found' });
    }
    
    // Check if user has access to modify this guest
    const user = await User.findById(req.user.id);
    if (user.role !== 'admin') {
      const accommodation = await Accommodation.findById(guest.accommodation);
      if (!accommodation.administrators.includes(req.user.id)) {
        return res.status(403).json({ message: 'Access denied to modify this guest' });
      }
    }
    
    // Update fields
    const updateFields = {};
    for (const [key, value] of Object.entries(req.body)) {
      if (key !== '_id' && key !== '__v' && key !== 'createdAt') {
        updateFields[key] = value;
      }
    }
    
    guest = await Guest.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true }
    );
    
    res.json(guest);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE /api/guests/:id
// @desc    Delete a guest
// @access  Private with accommodation access check (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const guest = await Guest.findById(req.params.id);
    if (!guest) {
      return res.status(404).json({ message: 'Guest not found' });
    }
    
    // Only admin can delete guests
    const user = await User.findById(req.user.id);
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Only admins can delete guests.' });
    }
    
    await Guest.findByIdAndRemove(req.params.id);
    res.json({ message: 'Guest removed' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT /api/guests/:id/status
// @desc    Update guest status (paid, key returned, checked out)
// @access  Private with accommodation access
router.put('/:id/status', auth, async (req, res) => {
  try {
    const { paymentCompleted, keyReturned, checkedOut } = req.body;
    
    let guest = await Guest.findById(req.params.id);
    if (!guest) {
      return res.status(404).json({ message: 'Guest not found' });
    }
    
    // Check if user has access to modify this guest
    const user = await User.findById(req.user.id);
    if (user.role !== 'admin') {
      const accommodation = await Accommodation.findById(guest.accommodation);
      if (!accommodation.administrators.includes(req.user.id)) {
        return res.status(403).json({ message: 'Access denied to modify this guest' });
      }
    }
    
    // Update status fields
    const updateFields = {};
    if (paymentCompleted !== undefined) updateFields.paymentCompleted = paymentCompleted;
    if (keyReturned !== undefined) updateFields.keyReturned = keyReturned;
    if (checkedOut !== undefined) updateFields.checkedOut = checkedOut;
    
    guest = await Guest.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true }
    );
    
    res.json(guest);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router; 