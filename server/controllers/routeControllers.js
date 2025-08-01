import getRouteFromTomTom from '../utils/getRouteFromTomTom.js';
import getWeatherAlerts from '../utils/getWeatherAlerts.js';
import { calculateSafetyScore } from '../utils/calculateSafetyScore.js';

export const getRoute = async (req, res) => {
    try {
        const { start, end, mode } = req.body;

    if(!start || !end || !mode) {
        return res.status(400).json({ message: 'Missing start, end, or mode in request body.'});
    }
    console.log('Received request for safety score:');
    console.log('Start:', start);
    console.log('End:', end, 'mode:', mode);

    const routeData = await getRouteFromTomTom(start, end, mode);
    if(!routeData || !routeData.routes || routeData.routes.length === 0) {
        return res.status(400).json({ score: 'N/A', reason: 'No valid route found.'});
    }

    const weatherData = await getWeatherAlerts(start, end);
    if(!weatherData) {
        return res.status(500).json({ score: 'N/A', reason: 'Weather data unavailable.'});
    }

    const { score, reason } = calculateSafetyScore(weatherData);

    console.log('Score:', score);
    console.log('Reason:', reason);
    res.json({ score, reason });
    } catch (err) {
        console.error('Backend error:', err);
        res.status(500).json({ error: err.message });
    }
};
