export const calculateSafetyScore = (alerts, mode = 'car') => {

    let baseScore = 100;

    const weather = alerts.weather?.[0]?.main?.toLowerCase() || '';

    if(weather.includes('rain') || weather.includes('storm') || weather.includes('thunder')) {
        baseScore -= 30;
    } else if (weather.includes('snow')) {
        baseScore -= 20;
    } else if (weather.includes('fog')) {
        baseScore -= 15;
    } else if (weather.includes('clear')) {
        baseScore -= 0;
    } else {
        baseScore -= 10
    }

    switch (mode) {
        case 'car':
        baseScore -= 5;
        break;
        case 'bicycle':
        baseScore -= 10;
        break;
        case 'pedestrain':
        baseScore -= 15;
        break;
        default:
        baseScore -= 0;
    }

    if (baseScore < 0) baseScore = 0;
    if(baseScore > 100) baseScore = 100;

return Math.round(baseScore);
}