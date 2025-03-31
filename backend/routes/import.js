const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const router = express.Router();
const Guest = require('../models/Guest');
const User = require('../models/User');
const Accommodation = require('../models/Accommodation');

// CSV file import processing
module.exports = async (req, res) => {
  try {
    // Get the uploaded file
    const csvFile = req.file;
    if (!csvFile) {
      return res.status(400).json({ message: 'No CSV file uploaded' });
    }

    // Get the accommodation ID from request
    const { accommodationId } = req.body;
    if (!accommodationId) {
      return res.status(400).json({ message: 'Accommodation ID is required' });
    }

    // Check if accommodation exists
    const accommodation = await Accommodation.findById(accommodationId);
    if (!accommodation) {
      return res.status(404).json({ message: 'Accommodation not found' });
    }

    // Check if user has permission
    const user = await User.findById(req.user.id);
    if (user.role !== 'admin' && !accommodation.administrators.includes(req.user.id)) {
      return res.status(403).json({ message: 'Access denied to this accommodation' });
    }

    // Process CSV file
    const results = [];
    const errors = [];
    let processedRows = 0;
    
    fs.createReadStream(csvFile.path)
      .pipe(csv())
      .on('data', (data) => {
        processedRows++;
        
        // Map CSV columns to guest model
        // Assuming standard column names matching the model fields
        // This can be customized based on the CSV structure
        const guestData = {
          firstName: data['firstName'] || data['FirstName'] || data['Vorname'],
          lastName: data['lastName'] || data['LastName'] || data['Name'],
          roomNumber: data['roomNumber'] || data['RoomNumber'] || data['Zimmernummer'] || '',
          roomKey: data['roomKey'] || data['RoomKey'] || data['Zimmerschlüssel'] || '',
          deposit: parseFloat(data['deposit'] || data['Deposit'] || data['Kaution'] || 0),
          additionalBookings: data['additionalBookings'] || data['AdditionalBookings'] || data['Nachbuchungen'] || '',
          skiPassCategory: data['skiPassCategory'] || data['SkiPassCategory'] || data['Skipass'] || '',
          accommodation: accommodationId
        };

        // Add custom fields
        const customFields = new Map();
        for (const field of accommodation.customFields) {
          if (data[field.name]) {
            customFields.set(field.name, data[field.name]);
          }
        }
        guestData.customFields = customFields;

        results.push(guestData);
      })
      .on('end', async () => {
        try {
          // Bulk insert guests
          if (results.length > 0) {
            await Guest.insertMany(results);
          }
          
          // Delete temporary file
          fs.unlinkSync(csvFile.path);
          
          // Return success response
          res.json({
            message: 'CSV import completed successfully',
            processed: processedRows,
            imported: results.length,
            errors: errors
          });
        } catch (error) {
          console.error('Error saving guests:', error);
          res.status(500).json({ message: 'Error saving guests', error: error.message });
        }
      })
      .on('error', (error) => {
        console.error('Error processing CSV:', error);
        res.status(500).json({ message: 'Error processing CSV file', error: error.message });
      });
  } catch (error) {
    console.error('CSV import error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}; 