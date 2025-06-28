import { getRouteFromTomTom } from '../utils/getRouteFromTomTom';
import { getWeatherAlerts } from '../utils/getWeatherAlerts';
import { calculateSafetyScore } from '../utils/calculateSafetyScore';

export const getRoute = async (req, res) => {
    const { start, end } = req.query;

    try {
        const routeData = await getRouteFromTomTom(start, end);
        const alerts = await getWeatherAlerts(start);
        const score = calculateSafetyScore(alerts);

        res.json({ routeData, alerts, score });
    } catch (err) {
        res.status().json({ error: err.message });
    }
};
