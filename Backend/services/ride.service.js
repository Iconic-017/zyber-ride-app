const rideModel = require('../models/ride.model')
const mapService = require('./map.service')
const crypto = require('crypto');
const {sendMessageToSocketid} = require('../socket.js');

async function getFare(pickup, destination) {
    if (!pickup || !destination) {
      throw new Error('Pickup and destination are required');
    }
  
    const distanceTime = await mapService.getDistanceTime(pickup, destination);
  
    // Convert meters to kilometers
    const distanceKm = distanceTime.distance / 1000;
  
    // Convert seconds to minutes
    const durationMin = Math.ceil(distanceTime.duration / 60);
  
    const rates = {
      car: { base: 50, perKm: 15 },
      bike: { base: 20, perKm: 7 },
      auto: { base: 30, perKm: 10 },
    };
  
    const fares = {};
    for (const type in rates) {
      fares[type] = Math.round(rates[type].base + (distanceKm * rates[type].perKm));
    }
  
    // console.log(`Distance: ${distanceKm.toFixed(1)} km`);
    // console.log(`Duration: ${durationMin} min`);
  
    return {
      distance: distanceKm.toFixed(1),  // in km
      duration: durationMin,            // in minutes
      fares
    };
}

module.exports.getFare = getFare;

function getOtp(num) {
    // Generate a random numeric OTP of length 'num' using crypto
    const bytes = crypto.randomBytes(num);
    let otp = '';
    for (let i = 0; i < num; i++) {
        otp += (bytes[i] % 10).toString();
    }
    // Hash the OTP using crypto (SHA-256)
    const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');
    return otp ;
}

module.exports.createRide =async ({
    user, pickup, destination, vehicleType
    }) => {
    
    if (!user || !pickup || ! destination || ! vehicleType) {
        throw new Error('All fields are required');
    }

    const fare =  await getFare (pickup, destination);
    // console.log(fare)
    
    const ride = await rideModel.create({
        user,
        pickup,
        destination,
        otp:getOtp(4),
        fare: fare.fares[vehicleType],
        distance: fare.distance,        // add this
        duration: fare.duration         // and this
    });

    console.log("ride created : ", ride);
      
    
    return ride;
}

module.exports.confirmRide = async (rideId, captainId) => {
  if (!rideId || !captainId) {
    throw new Error('ride id and captain id is required');
  }

  const rideQuery = rideModel
    .findOneAndUpdate(
      { _id: rideId },
      { status: 'accepted', captain: captainId },
      { new: true }
    )
    .select('+otp')
    .populate('user', 'fullname email socketId')
    .populate('captain', 'fullname email vehicle socketId');

  const ride = await rideQuery;

  if (!ride) {
    throw new Error('ride not found');
  }

  return ride;
};


module.exports.startRide = async (rideId, otp, captainId) => {
  if (!rideId || !otp || !captainId) {
    throw new Error('rideId, otp, and captainId are required');
  }

  // Find the ride and validate OTP and captain assignment
  const ride = await rideModel
    .findOne({ _id: rideId })
    .select('+otp')
    .populate('user', 'fullname email socketId')
    .populate('captain', 'fullname email vehicle socketId');

  if (!ride) {
    throw new Error('Ride not found');
  }
  if (ride.captain?._id.toString() !== captainId.toString()) {
    throw new Error('You are not assigned to this ride');
  }
  if (ride.status !== 'accepted') {
    throw new Error('Ride is not in accepted status');
  }
  if (ride.otp !== otp) {
    throw new Error('Invalid OTP');
  }

  // Update the ride's status to "ongoing"
  ride.status = 'ongoing';
  // Optionally, you may want to remove the OTP for security reasons
  // ride.otp = null;
  await ride.save();

  // Send message to user's socketId if available
  if (ride.user?.socketId) {
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

    sendMessageToSocketid(ride.user.socketId, {
      event: "ride-started",
      data: rideForUser,
    });
  }

  return ride;
}