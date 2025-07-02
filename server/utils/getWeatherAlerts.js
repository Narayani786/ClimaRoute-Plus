import fetch from 'node-fetch';

export default async function getWeatherAlerts(coords) {
    const [lat, lon] = coords;
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    const res = await fetch(url);
    const data = await res.json();

    console.log('Weather alerts data:', data);
    
    return data;
};
