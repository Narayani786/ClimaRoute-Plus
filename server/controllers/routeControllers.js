import { getRouteFromTomTom } from '../utils/getRouteFromTomTom.js';
import getWeatherAlerts from '../utils/getWeatherAlerts.js';
import { calculateSafetyScore } from '../utils/calculateSafetyScore.js';

export const getRoute = async (req, res) => {
    const { start, end, mode } = req.query;

    try {
        const routeData = await getRouteFromTomTom(start, end);
        const weather = await getWeatherAlerts(start);
        const score = calculateSafetyScore(weather, mode);

        res.json({ routeData, weather, score });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
