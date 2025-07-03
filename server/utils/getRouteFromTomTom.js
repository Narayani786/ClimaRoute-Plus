import fetch from 'node-fetch';

export default async function getRouteFromTomTom (startCoord, endCoord) {
    const startStr = `${startCoord.lng}, ${startCoord.lat}`;
    const endStr = `${endCoord.lng}, ${endCoord.lat}`;

    const url = `https://api.tomtom.com/routing/1/calculateRoute/${startStr}:${endStr}/JSON?key=${process.env.TOMTOM_API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();
    return data;
}