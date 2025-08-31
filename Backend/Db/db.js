const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;