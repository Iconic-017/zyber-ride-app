const { validationResult } = require('express-validator');
const mapService = require('../services/map.service');

module.exports.getcorrdinates = async (req, res, next) => {
    // Check validation result
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { address } = req.query;
        if (!address) {
            return res.status(400).json({ message: 'Address query parameter is required.' });
        }
        const coordinates = await mapService.getAddressCoordinate(address);
        return res.status(200).json({ coordinates });
    } catch (error) {
        return res.status(404).json({ message: 'coordinate not found' });
    }
};


module.exports.getDistanceTime = async (req , res , next) => {
    try{
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }
        
        const { origin, destination} = req.query;
        const distanceTime = await mapService.getDistanceTime(origin, destination);
        
        res.status(200).json(distanceTime);
    }catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}


module.exports.getAutoCompleteSuggetion = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { input } = req.query;
        if (!input) {
            return res.status(400).json({ message: 'Input query parameter is required.' });
        }

        const suggestions = await mapService.getAutoCompleteSuggestion(input);
        return res.status(200).json({ suggestions });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error fetching autocomplete suggestions' });
    }
}
