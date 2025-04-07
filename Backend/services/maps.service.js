const axios = require('axios');
require('dotenv').config();
const captainModel = require('../models/captain.model');

const OLA_API_KEY = process.env.OLA_API_KEY;
const OLA_BASE_URL = process.env.OLA_MAPS_API;

module.exports.getAddressCoordinate = async (address) => {
    const url = `${OLA_BASE_URL}/geocode?address=${encodeURIComponent(address)}&key=${OLA_API_KEY}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            return {
                ltd: location.lat,
                lng: location.lng
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    const url = `${OLA_BASE_URL}/distance?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&key=${OLA_API_KEY}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            return response.data.rows[0].elements[0];
        } else {
            throw new Error('Unable to fetch distance and time');
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
};

module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error('Query is required');
    }

    const url = `${OLA_BASE_URL}/autocomplete?input=${encodeURIComponent(input)}&key=${OLA_API_KEY}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            return response.data.predictions;
        } else {
            throw new Error('Unable to fetch suggestions');
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
};

// Ride Suggestions based on location
module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {
    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [[ltd, lng], radius / 6371]
            }
        }
    });

    return captains;
};
