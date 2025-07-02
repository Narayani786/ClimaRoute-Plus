import fetch from 'node-fetch';

export const getRouteFromTomTom = async (req, res) => {
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
