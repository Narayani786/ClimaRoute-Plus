import getRouteFromTomTom from '../utils/getRouteFromTomTom.js';
import getWeatherAlerts from '../utils/getWeatherAlerts.js';
import { calculateSafetyScore } from '../utils/calculateSafetyScore.js';

export const getRoute = async (req, res) => {
    try {
        console.log('req body:', req.body);
        
        const { start, end, mode } = req.body;

    const [startLat, startLng] = start.split(',').map(Number);
    const [endLat, endLng] = end.split(',').map(Number);

    const startCoord = {lat: startLat, lng: startLng};
    const endCoord = {lat: endLat, lng: endLng};

    console.log('start lat:', startCoord.lat, 'start lng:', startCoord.lng);
    console.log('End lat:', endCoord.lat, 'End lng:', endCoord.lng);

    const testUrl = `https://api.tomtom.com/routing/1/calculateRoute/${startCoord.lat},${startCoord.lng}:${endCoord.lat},${endCoord.lng}/json?travelMode=${mode}&key=${process.env.TOMTOM_API_KEY}`;
    console.log('TomTom Url:', testUrl);

    const response = await fetch(testUrl);
    const data = await response.json();

    if(!response.ok) {
        console.error('TomTom error:', data);
        return res.status(400).json({ error: 'TomTom API error', details: data});
    }
    return res.status(200).json(data);
    } catch (err) {
        console.error('Backend error:', err);
        res.status(500).json({ error: err.message });
    }
};
