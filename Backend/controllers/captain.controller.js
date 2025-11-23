const captainModel = require('../models/Captain.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');
const BlacklistToken = require('../models/BlacklistToken.model');
const Ride = require('../models/ride.model.js')



module.exports.registerCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password, vehicle } = req.body;

  try {
    // Check if a captain with the given email already exists
    const existingCaptain = await captainModel.findOne({ email });
    if (existingCaptain) {
      return res.status(400).json({ message: "Captain with this email already exists" });
    }

    // Call service with proper structure
    const captain = await captainService.createCaptain({
      fullname, // contains firstname, lastname
      email,
      password,
      vehicle // contains color, plate, capacity, vehicleType, location
    });

    // Generate auth token
    const token = captain.generateAuthToken();

    res.status(201).json({ message: "Captain registered successfully", captain, token });
  } catch (error) {
    next(error);
  }
};


module.exports.loginCaptain = async (req, res, next) => { 
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const captain = await captainModel.findOne({ email }).select('+password');
    if (!captain) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = captain.generateAuthToken();

    // ✅ Set cookie here
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax', // or 'None' for cross-site requests
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.status(200).json({ message: "Login successful", captain , token });
  } catch (error) {
    next(error);
  }
};


module.exports.getCaptainProfile = async (req, res, next) => {
  res.status(200).json({ captain: req.captain });
};



module.exports.logoutCaptain = async (req, res, next) => {
  try {
    // Get token from cookie or Authorization header
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(400).json({ message: "No token provided" });
    }

    // Blacklist the token
    await BlacklistToken.create({ token });

    // Clear the cookie if present
    if (req.cookies.token) {
      res.clearCookie('token');
    }

    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}


module.exports.updateCaptainStatus = async (req , res , next ) => {
  try{

    const { status } = req.body;

    if (!['active', 'inactive'].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    req.captain.status = status;
    await req.captain.save();

    res.status(200).json({ message: "Status updated successfully", status: req.captain.status });

  } catch(error){
    console.log(error)
    next(error);
  }
}