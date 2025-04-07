const mapService = require('../services/maps.service');
const { validationResult } = require('express-validator');

// Get coordinates from Ola Maps
module.exports.getCoordinates = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { address } = req.query;

    if (!address) {
        return res.status(400).json({ message: 'Address query parameter is required' });
    }

    try {
        const coordinates = await mapService.getAddressCoordinate(address);
        res.status(200).json(coordinates);
    } catch (error) {
        console.error('Error fetching coordinates:', error.message);
        res.status(404).json({ message: 'Coordinate not found' });
    }
};

// Get distance and time using Ola Maps API
module.exports.getDistanceTime = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { origin, destination } = req.query;

    try {
        const distanceTime = await mapService.getDistanceTime(origin, destination);
        res.status(200).json(distanceTime);
    } catch (err) {
        console.error('Error fetching distance/time:', err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get auto-complete suggestions from Ola Maps API
module.exports.getAutoCompleteSuggestions = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { input } = req.query;

    try {
        const suggestions = await mapService.getAutoCompleteSuggestions(input);
        res.status(200).json(suggestions);
    } catch (err) {
        console.error('Error fetching suggestions:', err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Optional: Nearby drivers suggestion if needed
module.exports.getCaptainsInTheRadius = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { ltd, lng, radius = 5 } = req.query;

    try {
        const captains = await mapService.getCaptainsInTheRadius(parseFloat(ltd), parseFloat(lng), parseFloat(radius));
        res.status(200).json(captains);
    } catch (err) {
        console.error('Error fetching nearby captains:', err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};
