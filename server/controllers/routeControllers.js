import { getRouteFromTomTom } from '../utils/getRouteFromTomTom.js';
import { getWeatherAlerts } from '../utils/getWeatherAlerts.js';
import { calculateSafetyScore } from '../utils/calculateSafetyScore.js';

export const getRoute = async (req, res) => {
    const { start, end } = req.query;

    try {
        const routeData = await getRouteFromTomTom(start, end);
        const alerts = await getWeatherAlerts(start);
        const score = calculateSafetyScore(alerts);

        res.json({ routeData, alerts, score });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
