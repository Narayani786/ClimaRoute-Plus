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
        reason = 'Thunderstorm - high risk';
        break;
        case 'snow':
        baseScore = 55;
        reason = 'Snow - low traction';
        break;
        case 'rain':
        case 'drizzle':
        baseScore = 60;
        reason = 'Rainy conditions - drive carefully';
        break;
        case 'fog':
        case 'mist':
        baseScore = 65;
        reason = 'Foggy - reduced visibility';
        break;
        case 'clouds':
        baseScore = 85;
        reason = 'Cloudy - generally safe';
        break;
        case 'clear':
        baseScore = 95;
        reason = 'Clear weather - safe to travel';
        break;
        default:
        baseScore = 80;
        reason = `Weather condition: ${main}`;
    }

    if(mode === 'bicycle') {
        baseScore -= 10;
        reason += '- extra caution for cyclists';
    } else if (mode === 'pedestrian'){
        baseScore -= 10;
        reason += '- extra caution for pedestrians';
    }

    const score = Math.max(20, Math.min(100, baseScore));
    return { score, reason };
}
