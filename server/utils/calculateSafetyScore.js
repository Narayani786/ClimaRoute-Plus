export const calculateSafetyScore = (weather, mode = 'car') => {

    let score = 100;

    if(weatherData.visibility && weatherData.visibility < 5000) {
        score -=20;
    }
    if(weatherData.wind && weatherData.wind.speed > 8) {
        score -= 15;
    }
    if(weatherData.weather && weatherData.weather.length > 0 && ['Rain', 'Storm', 'Thunderstorm', 'Snow'].includes(weatherData.weather[0].main)
    ) {
score -= 25;
}

return Math.max(0, score);
}