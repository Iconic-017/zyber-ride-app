const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const {validationResult} = require('express-validator');
const BlacklistToken = require('../models/BlacklistToken.model');


module.exports.register = async (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const { fullname, email, password } = req.body;

    // Check if user already exists based on email
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "User with this email already exists" });
    }
    const hashedPassword = await userModel.hashPassword(password);

    try{
        const user = await userService.createUser({
            firstname:fullname.firstname,
            lastname:fullname.lastname,
            email,
            password:hashedPassword});
        const token = user.generateAuthToken();
        res.status(201).json({message:"User registered successfully",user,token});
    }catch(error){
        next(error);
    }
    
}


module.exports.login = async (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {email,password} = req.body;

    try{
        const user = await userModel.findOne({email}).select('+password');
        if(!user){
            return res.status(401).json({message:"Invalid email or password"});
        }
        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            return res.status(401).json({message:"Invalid email or password"});
        }
        const token = user.generateAuthToken();

        res.cookie('token', token);

        // res.cookie('token', token, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === 'production',
        //     maxAge: 24 * 60 * 60 * 1000, // 1 day
        //     // sameSite: 'strict',
        // });

        res.status(200).json({message:"Login successful",user,token});
    } catch(error){
        next(error);
    }

}


module.exports.GetProfile = async (req,res,next)=>{
    try{
        // const user = await userModel.findById(req.user._id).select('-password');
        res.status(200).json(req.user);
    }catch(error){
        next(error);
    }
}


module.exports.logout = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(400).json({ message: 'No token provided' });
        }

        // Add token to blacklist
        await BlacklistToken.create({ token });

        // Clear cookie if present
        res.clearCookie('token');
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        next(error);
    }
}

