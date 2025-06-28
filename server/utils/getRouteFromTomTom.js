import fetch from 'node-fetch';

export const getRouteFromTomTom = async (start, end) => {
    const apiKey = process.env.TOMTOM_API_KEY;
    const url = `https://api.tomtom.com/routing/1/calculateRoute/${start}:${end}/json?key=${apiKey}`;

    const res = await fetch(url);
    const data = await res.json();
    return data;
};
