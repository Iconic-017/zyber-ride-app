const { validationResult } = require('express-validator');
const rideService = require('../services/ride.service');

const mapService = require('../services/map.service.js');
const {sendMessageToSocketid} = require('../socket.js');

module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "Unauthorized - user not found in request" });
    }

    const { pickup, destination, vehicleType } = req.body;

    // 1️⃣ Get pickup coordinates
    const pickupCoords = await mapService.getAddressCoordinate(pickup);

    // 2️⃣ Find nearby captains
    const captainsInRadius = await mapService.getCaptainsInTheRadius(
      pickupCoords.lat ?? pickupCoords.ltd,
      pickupCoords.lng,
      2 // radius in km
    );
    console.log("🚗 Captains in the radius:", captainsInRadius);

    // 3️⃣ Create the ride
    const ride = await rideService.createRide({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
    });

    // 4️⃣ Populate user details
    const populatedRide = await ride.populate("user", "fullname email phone");

    // 5️⃣ Remove OTP before sending to captain
    const rideForCaptain = {
      ...populatedRide._doc,
      otp: null,
    };

    // console.log("📤 Sending ride to captains:", captainsInRadius.map(c => c.socketId));

    // 6️⃣ Send ride info to all captains in the radius
    captainsInRadius.forEach(captain => {
      console.log(`🚀 Emitting new-ride to captain: ${captain.socketId}`);
      sendMessageToSocketid(captain.socketId, {
        event: "new-ride",
        data: rideForCaptain
      });
    });


    // 7️⃣ Send full ride (with OTP) back to user
    return res.status(201).json({ ride: populatedRide });

  } catch (error) {
    console.error("❌ Error creating ride:", error);
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



module.exports.confirmRide = async (req , res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
  }

  const {rideId} = req.body;

  try{
    const ride =  await rideService.confirmRide(rideId , req.captain._id)
    // .populate('captain','fullname email vehicle');

    const rideForUser = {
      _id: ride._id,
      pickup: ride.pickup,
      destination: ride.destination,
      fare: ride.fare,
      status: ride.status,
      otp: ride.otp,
      captain: ride.captain
        ? {
            _id: ride.captain._id,
            fullname: ride.captain.fullname,
            email: ride.captain.email,
            vehicle: ride.captain.vehicle,
          }
        : null,
    };

    if (ride.user?.socketId) {
      sendMessageToSocketid(ride.user.socketId, {
        event: "ride-confirmed",
        data: rideForUser,
      });
    }

    return res.status(200).json({ride: rideForUser});
  } catch(error){
    return res.status(500).json({message: error.message});
  }
}


module.exports.startRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId, otp } = req.query;

  try {
    const ride = await rideService.startRide(rideId, otp, req.captain._id);

    const rideForUser = {
      _id: ride._id,
      pickup: ride.pickup,
      destination: ride.destination,
      fare: ride.fare,
      status: ride.status,
      captain: ride.captain
        ? {
            _id: ride.captain._id,
            fullname: ride.captain.fullname,
            email: ride.captain.email,
            vehicle: ride.captain.vehicle,
          }
        : null,
    };

    // Notify user if socketId exists
    if (ride.user?.socketId) {
      sendMessageToSocketid(ride.user.socketId, {
        event: "ride-started",
        data: rideForUser,
      });
    }

    return res.status(200).json({
      message: "Ride started successfully",
      ride: rideForUser,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}