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


module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const blacklisted = await BlacklistToken.findOne({ token: token });
    if (blacklisted) {
        return res.status(401).json({ message: 'Token is blacklisted' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await CaptainModel.findById(decoded._id);
        if (!captain) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.captain = captain;
        return next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}