const express = require('express')
const authMiddleware = require('../middleware/auth.middleware');
const router = express.Router();
const mapController = require('../controllers/map.controller')
const { query } = require('express-validator')

router.get('/get-coordinates',
    query('address')
      .isString()
      .notEmpty()
      .isLength({min : 3})
      .withMessage('Address query parameter is required.')
    ,
        authMiddleware.authUser,
        mapController.getcorrdinates
);


router.get('/get-distance-time',
    query('origin').isString().isLength({ min: 3}),
    query('destination').isString().isLength({ min: 3}),
    authMiddleware.authUser,
    mapController.getDistanceTime
);


router.get('/get-suggestions',
    query('input').isString().isLength({min:3}),
    authMiddleware.authUser,
    mapController.getAutoCompleteSuggetion
)




module.exports = router;
