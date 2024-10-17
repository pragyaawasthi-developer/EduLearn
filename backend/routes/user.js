// routes/user.js
const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcrypt'); 

// Registration API
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body; // Destructure fields from request body

  // Check if all fields are provided
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const newUser = new User({
      name,
      email,
      password, // Store password as plain text (not recommended for production)
    });

    await newUser.save(); // Save the new user to the database
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error("Error registering user:", error); // Log the error to the console
    res.status(500).json({ message: 'Error registering user' });
  }
});

module.exports = router;
