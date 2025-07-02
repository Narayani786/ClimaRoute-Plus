import { getRouteFromTomTom } from '../utils/getRouteFromTomTom.js';
import getWeatherAlerts from '../utils/getWeatherAlerts.js';
import { calculateSafetyScore } from '../utils/calculateSafetyScore.js';

export const getRoute = async (req, res) => {

    const {query} = req;

    if(!query || !query.start || !end.query || mode.query) {
        return res.status(400).json({ error: 'Missing start, end, or mode in query' });
    }

    const { start, end, mode } = query;

    try {
        const [startLat, startLng] = start.split(',');
        const [endLat, endLng] = end.split(',');

        const routeData = await getRouteFromTomTom([startLat, startLng], [endLat, endLng]);
        const weather = await getWeatherAlerts([startLat, startLng]);
        const score = calculateSafetyScore(weather, mode);

        res.json({ routeData, weather, score });
    } catch (err) {
        console.error('Backend error:', err);
        res.status(500).json({ error: err.message });
    }
};
