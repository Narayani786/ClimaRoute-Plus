export const calculateSafetyScore = (alerts, mode = 'car') => {
    if(!alerts || !alerts.weather || alerts.weather.length === 0) {
        return {
            score: 90, reason: 'No weather data available'
        };
    }
        const main = alerts.weather[0].main.toLowerCase();
        const description = alerts.weather[0].description || '';
        const condition = `${main} - ${description}`;
    let baseScore = 100;
    let reason = `Weather: ${condition}`;

    switch (main) {
        case 'thunderstorm':
        baseScore = 40;
        reason = 'Thunderstorm - High risk';
        break;
        case 'snow':
        baseScore = 55;
        reason = 'Snow - Low traction';
        break;
        case 'rain':
        case 'drizzle':
        baseScore = 60;
        reason = 'Rainy conditions - Drive carefully';
        break;
        case 'fog':
        case 'mist':
        baseScore = 65;
        reason = 'Foggy - Reduced visibility';
        break;
        case 'clouds':
        baseScore = 85;
        reason = 'Cloudy - Generally safe';
        break;
        case 'clear':
        baseScore = 95;
        reason = 'Clear weather - Safe to travel';
        break;
        default:
        baseScore = 80;
        reason = `Weather condition: ${main}`;
    }

    if(mode === 'bicycle') {
        baseScore -= 15;
        reason += '- Extra caution for Cyclists';
    } else if (mode === 'pedestrian'){
        baseScore -= 20;
        reason += '- Extra caution for Pedestrians';
    }

    const score = Math.max(20, Math.min(100, baseScore));
    return { score, reason };
}
