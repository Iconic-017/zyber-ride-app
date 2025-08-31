const mongoose = require('mongoose');


const rideSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Captain',
        default: null
    },
    pickup: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    fare: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'in_progress', 'completed', 'cancelled'],
        default: 'pending'
    },
    distance: {
        type: Number,
        default: 0
    },
    duration: {
        type: Number,
        default: 0
    },
    paymentID:{
        type:String
    },
    orderID: {
        type:String
    },
    signature:{
        type:String
    },
    otp:{
        type:String,
        select:false,
        required:true,
    },
}, {
    timestamps: true
});


module.exports = mongoose.model('ride' , rideSchema);