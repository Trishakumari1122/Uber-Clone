const axios = require('axios');
require('dotenv').config();
const captainModel = require('../models/captain.model');

module.exports.getAddressCoordinate = async (address) => {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1&countrycodes=in`;

    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'UberCloneApp/1.0' // Nominatim requires a user-agent
            }
        });
        if (response.data && response.data.length > 0) {
            const location = response.data[0];
            return {
                ltd: parseFloat(location.lat),
                lng: parseFloat(location.lon)
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error("Map Service Error:", error.message);
        throw error;
    }
};

module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    try {
        // 1. Get coordinates for origin and destination
        const originCoords = await module.exports.getAddressCoordinate(origin);
        const destCoords = await module.exports.getAddressCoordinate(destination);

        // 2. Calculate distance using OSRM
        const osrmUrl = `http://router.project-osrm.org/route/v1/driving/${originCoords.lng},${originCoords.ltd};${destCoords.lng},${destCoords.ltd}?overview=false`;

        const response = await axios.get(osrmUrl);

        if (response.data.routes && response.data.routes.length > 0) {
            const route = response.data.routes[0];
            return {
                distance: {
                    text: (route.distance / 1000).toFixed(1) + " km",
                    value: route.distance // in meters
                },
                duration: {
                    text: Math.round(route.duration / 60) + " mins",
                    value: route.duration // in seconds
                }
            };
        } else {
            throw new Error('No route found');
        }

    } catch (err) {
        console.error("Map Service Error in getDistanceTime:", err);
        throw err;
    }
};

module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error('Query is required');
    }

    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(input)}&format=json&limit=10&countrycodes=in&addressdetails=1`;

    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'UberCloneApp/1.0'
            }
        });
        if (response.data) {
            return response.data.map(item => ({
                description: item.display_name
            }));
        } else {
            throw new Error('Unable to fetch suggestions');
        }
    } catch (err) {
        console.error("Map Service Error:", err.message);
        throw err;
    }
};

module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {

    // radius in km


    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [[lng, ltd], radius / 6371]
            }
        }
    });

    return captains;


}
