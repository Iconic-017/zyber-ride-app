const rideModel = require('../models/ride.model')
const mapService = require('./map.service')
const crypto = require('crypto');

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
      
    
    return ride;
}