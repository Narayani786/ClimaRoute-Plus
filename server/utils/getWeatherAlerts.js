import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

export default async function getWeatherAlerts(coords) {
    let lat, lon;

    if(typeof coords === 'string') {
        [lat, lon] = coords.split(',').map(Number);
    } else if(Array.isArray(coords)) {
        [lat, lon] = coords;
    } else if (typeof coords === 'object') {
        lat = coords.lat;
        lon = coords.lng;
    }
    if(!lat || !lon) {
        throw new Error('Invalid coordinates for weather alerts');
    }
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    console.log('Fetching weather data from:', apiUrl);

    const response = await fetch(apiUrl);
    const data = await response.json();

    console.log('Weather alerts data:', data);

    const mainCondition = data.weather?.[0]?.main || 'unknown';
    const description = data.weather?.[0]?.description || '';
    
    return {
        weather: [
            {
                main: mainCondition,
                description: description
            }
        ]
    };
};
