const { validationResult } = require('express-validator');
const rideService = require('../services/ride.service');

module.exports.createRide = async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { userId, pickup, destination, vehicleType } = req.body;
        const ride = await rideService.createRide({
            user: req.user._id,
            pickup,
            destination,
            vehicleType
        });
        return res.status(201).json({ ride });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


module.exports.getFare = async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { pickup, destination } = req.query;
        const fareDetails = await rideService.getFare(pickup, destination);
        return res.status(200).json(fareDetails);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}