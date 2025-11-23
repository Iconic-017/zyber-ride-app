const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const BlacklistToken = require('../models/BlacklistToken.model');
const CaptainModel = require('../models/Captain.model');


module.exports.authUser = async (req,res,next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    
    if(!token){
        return res.status(401).json({message : 'Unauthorized'});
    }

    const blacklisted = await BlacklistToken.findOne({token : token });
    if (blacklisted) {
        return res.status(401).json({ message: 'Token is blacklisted' });
    }

    try{        
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await UserModel.findById(decoded._id);
        req.user = user;
        return next();
    }catch(error){
        return res.status(401).json({message : 'Unauthorized'});
    }
}


// module.exports.authCaptain = async (req, res, next) => {
//     const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

//     if (!token) {
//         return res.status(401).json({ message: 'Unauthorized' });
//     }

//     const blacklisted = await BlacklistToken.findOne({ token: token });
//     if (blacklisted) {
//         return res.status(401).json({ message: 'Token is blacklisted' });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const captain = await CaptainModel.findById(decoded._id);
//         if (!captain) {
//             return res.status(401).json({ message: 'Unauthorized' });
//         }
//         req.captain = captain;
//         return next();
//     } catch (error) {
//         return res.status(401).json({ message: 'Unauthorized' });
//     }
// }














module.exports.authCaptain = async (req, res, next) => {
  try {
    // 1️⃣ Extract token from headers or cookies
    let token = null;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies?.token) {
      token = req.cookies.token;
    }

    if (!token) {
      console.log("❌ No token provided");
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    // 2️⃣ Check if token is blacklisted
    const blacklisted = await BlacklistToken.findOne({ token });
    if (blacklisted) {
      console.log("❌ Token is blacklisted");
      return res.status(401).json({ message: "Unauthorized: Token is blacklisted" });
    }

    // 3️⃣ Verify JWT
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      console.log("❌ Token verification failed:", err.message);
      return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
    }

    // 4️⃣ Fetch captain from DB
    const captainId = decoded._id || decoded.id; // adjust based on your token payload
    const captain = await CaptainModel.findById(captainId);
    if (!captain) {
      console.log("❌ Captain not found in DB");
      return res.status(401).json({ message: "Unauthorized: Captain not found" });
    }

    // 5️⃣ Attach captain to request
    req.captain = captain;
    console.log("✅ Captain authenticated:", captain._id);
    next();
  } catch (error) {
    console.log("❌ authCaptain error:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};