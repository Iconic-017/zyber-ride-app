const captainModel = require("../models/Captain.model")


module.exports.createCaptain = async ({
    fullname,
    email,
    password,
    vehicle
}) => {

    if (
        !fullname?.firstname || 
        !email || 
        !password || 
        !vehicle?.color || 
        !vehicle?.plate || 
        !vehicle?.capacity || 
        !vehicle?.vehicleType
      ) {
        throw new Error('ALL fields are required');
      }
      

    // Hash the password using the static method from the model
    const hashedPassword = await captainModel.hashPassword(password);

    // Prepare the captain data
    const captainData = {
        fullname: {
            firstname: fullname.firstname,
            lastname: fullname.lastname
        },
        email,
        password: hashedPassword,
        vehicle: {
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType,
            location: vehicle.location // optional, can be undefined    
        }
    };

    // Create the captain in the database
    const captain = await captainModel.create(captainData);

    return captain;
};