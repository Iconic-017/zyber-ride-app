const express = require('express')
const router = express.Router();
const {body} = require("express-validator")
const captainController = require('../controllers/captain.controller');
const { authCaptain } = require('../middleware/auth.middleware');

router.post( '/register', [
    body('fullname.firstname')
      .isString()
      .isLength({ min: 3, max: 50 })
      .withMessage('First name must be between 3 and 50 characters'),
    body('fullname.lastname')
      .optional()
      .isString(),
    body('email')
      .isEmail()
      .withMessage('Please provide a valid email'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
    body('vehicle.color')
      .isString()
      .isLength({ min: 3 })
      .withMessage('Vehicle color must be at least 3 characters long'),
    body('vehicle.plate')
      .isString()
      .isLength({ min: 3 })
      .withMessage('Vehicle plate must be at least 3 characters long'),
    body('vehicle.capacity')
      .isInt({ min: 1 })
      .withMessage('Vehicle capacity must be at least 1'),
    body('vehicle.vehicleType')
      .isIn(['car', 'motorcycle', 'auto'])
      .withMessage('Vehicle type must be car, motorcycle, or auto'),
    // Optionally validate vehicle.location.lat and vehicle.location.long if required
  ], captainController.registerCaptain
);


router.post('/login',
  [
    body('email')
      .isEmail()
      .withMessage('Please provide a valid email'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
  ],
  captainController.loginCaptain
);

router.get('/profile' , authCaptain , captainController.getCaptainProfile);

router.get('/logout' , authCaptain , captainController.logoutCaptain);

router.put('/status' , authCaptain , captainController.updateCaptainStatus);



module.exports = router;