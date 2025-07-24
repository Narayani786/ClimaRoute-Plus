import fetch from 'node-fetch';

export default async function getRouteFromTomTom (startCoord, endCoord, mode = 'car') {
    const startLat = Number(startCoord.lat).toFixed(6);
    const startLng = Number(startCoord.lng).toFixed(6);
    const endLat = Number(endCoord.lat).toFixed(6);
    const endLng = Number(endCoord.lng).toFixed(6);


    const startStr = `${startLat}, ${startLng}`;
    const endStr = `${endLat}, ${endLng}`;

    const url = `https://api.tomtom.com/routing/1/calculateRoute/${startStr}:${endStr}/json?key=${process.env.TOMTOM_API_KEY}`;

    console.log('TomTom URL:', url);

    const response = await fetch(url);
    const data = await response.json();
    return data;

}