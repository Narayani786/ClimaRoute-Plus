import getRouteFromTomTom from '../utils/getRouteFromTomTom.js';
import getWeatherAlerts from '../utils/getWeatherAlerts.js';
import { calculateSafetyScore } from '../utils/calculateSafetyScore.js';

export const getRoute = async (req, res) => {
    
    try {
        const query = req.query || {};
        console.log('Incoming req.query:', query);

        const { start, end, mode } = query;
        if(!start || !end || !mode) {
        return res.status(400).json({ error: 'Missing start, end or mode query' });
    }

    const [startLat, startLng] = start.split(',').map(Number);
    const [endLat, endLng] = end.split(',').map(Number);

    const startCoord = {lat: startLat, lng: startLng};
    const endCoord = {lat: endLat, lng: endLng};

        const routeData = await getRouteFromTomTom(startCoord, endCoord, mode);
        const alerts = await getWeatherAlerts(startCoord);
        const score = calculateSafetyScore(alerts, mode);

        res.json({ routeData, alerts, score });

    } catch (err) {
        console.error('Backend error:', err);
        res.status(500).json({ error: err.message });
    }
};
