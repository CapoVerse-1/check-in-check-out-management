const express = require('express');
const router = express.Router();
const Accommodation = require('../models/Accommodation');
const User = require('../models/User');

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

// Middleware to check if user is admin
const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @route   GET /api/accommodations
// @desc    Get all accommodations (admins) or accommodations user has access to
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    // Admin sees all accommodations
    if (user.role === 'admin') {
      const accommodations = await Accommodation.find();
      return res.json(accommodations);
    }
    
    // Regular user sees only accommodations they have access to
    const accommodations = await Accommodation.find({ administrators: req.user.id });
    res.json(accommodations);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/accommodations/:id
// @desc    Get accommodation by ID
// @access  Private with access check
router.get('/:id', auth, async (req, res) => {
  try {
    const accommodation = await Accommodation.findById(req.params.id);
    if (!accommodation) {
      return res.status(404).json({ message: 'Accommodation not found' });
    }
    
    // Check if user has access to this accommodation
    const user = await User.findById(req.user.id);
    if (user.role !== 'admin' && !accommodation.administrators.includes(req.user.id)) {
      return res.status(403).json({ message: 'Access denied to this accommodation' });
    }
    
    res.json(accommodation);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   POST /api/accommodations
// @desc    Create a new accommodation
// @access  Admin only
router.post('/', auth, isAdmin, async (req, res) => {
  const {
    name,
    address,
    capacity,
    customFields,
    administrators
  } = req.body;

  try {
    // Check if accommodation name already exists
    let accommodation = await Accommodation.findOne({ name });
    if (accommodation) {
      return res.status(400).json({ message: 'Accommodation with this name already exists' });
    }
    
    // Create new accommodation
    accommodation = new Accommodation({
      name,
      address,
      capacity,
      customFields: customFields || [],
      administrators: administrators || [],
      createdBy: req.user.id
    });
    
    await accommodation.save();
    res.json(accommodation);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT /api/accommodations/:id
// @desc    Update an accommodation
// @access  Admin only
router.put('/:id', auth, isAdmin, async (req, res) => {
  try {
    let accommodation = await Accommodation.findById(req.params.id);
    if (!accommodation) {
      return res.status(404).json({ message: 'Accommodation not found' });
    }
    
    // Update fields
    const updateFields = {};
    for (const [key, value] of Object.entries(req.body)) {
      if (key !== '_id' && key !== '__v' && key !== 'createdAt' && key !== 'createdBy') {
        updateFields[key] = value;
      }
    }
    
    accommodation = await Accommodation.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true }
    );
    
    res.json(accommodation);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE /api/accommodations/:id
// @desc    Delete an accommodation
// @access  Admin only
router.delete('/:id', auth, isAdmin, async (req, res) => {
  try {
    const accommodation = await Accommodation.findById(req.params.id);
    if (!accommodation) {
      return res.status(404).json({ message: 'Accommodation not found' });
    }
    
    await Accommodation.findByIdAndRemove(req.params.id);
    res.json({ message: 'Accommodation removed' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT /api/accommodations/:id/administrators
// @desc    Add or remove administrators for an accommodation
// @access  Admin only
router.put('/:id/administrators', auth, isAdmin, async (req, res) => {
  try {
    const { administrators, action } = req.body;
    
    if (!administrators || !Array.isArray(administrators) || !action) {
      return res.status(400).json({ message: 'Please provide administrators array and action (add/remove)' });
    }
    
    let accommodation = await Accommodation.findById(req.params.id);
    if (!accommodation) {
      return res.status(404).json({ message: 'Accommodation not found' });
    }
    
    if (action === 'add') {
      // Add administrators
      accommodation = await Accommodation.findByIdAndUpdate(
        req.params.id,
        { $addToSet: { administrators: { $each: administrators } } },
        { new: true }
      );
    } else if (action === 'remove') {
      // Remove administrators
      accommodation = await Accommodation.findByIdAndUpdate(
        req.params.id,
        { $pullAll: { administrators: administrators } },
        { new: true }
      );
    } else {
      return res.status(400).json({ message: 'Invalid action. Use "add" or "remove".' });
    }
    
    res.json(accommodation);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT /api/accommodations/:id/custom-fields
// @desc    Update custom fields for an accommodation
// @access  Admin only
router.put('/:id/custom-fields', auth, isAdmin, async (req, res) => {
  try {
    const { customFields } = req.body;
    
    if (!customFields || !Array.isArray(customFields)) {
      return res.status(400).json({ message: 'Please provide customFields array' });
    }
    
    let accommodation = await Accommodation.findById(req.params.id);
    if (!accommodation) {
      return res.status(404).json({ message: 'Accommodation not found' });
    }
    
    accommodation = await Accommodation.findByIdAndUpdate(
      req.params.id,
      { $set: { customFields } },
      { new: true }
    );
    
    res.json(accommodation);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router; 