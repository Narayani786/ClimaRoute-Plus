import fetch from 'node-fetch';

export const getWeatherAlerts = async (start) => {
    const [lat, lon] = start.split(',');
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    const res = await fetch(url);
    const data = await res.json();
    
    return data.alerts || [];
};
