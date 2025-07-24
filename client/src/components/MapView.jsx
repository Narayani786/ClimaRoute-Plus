import { useEffect, useRef, useState } from "react";
import tt from "@tomtom-international/web-sdk-maps";
import "@tomtom-international/web-sdk-maps/dist/maps.css";

const MapView = () => {
  const mapRef = useRef(null); // map instance
  const [mode, setMode] = useState("car");
  const [score, setScore] = useState(null);
  const [reason, setReason] = useState('');
  const startRef = useRef(null); // start marker
  const endRef = useRef(null);   // end marker
  const coordsRef = useRef({ start: null, end: null }); // store points between renders

  const fetchSafetyScore = async (start, end, mode) => {
    try {
      const startStr = `${start.lat},${start.lng}`;
      const endStr = `${end.lat},${end.lng}`;

      const res = await fetch(
        `http://localhost:5000/api/route?start=${startStr}&end=${endStr}&mode=${mode}`
      );

      const data = await res.json();
      console.log("Fetched safety score:", data);

      setScore(data.score);
      setReason(data.reason);

      if (data.route && mapRef.current) {
        const geoJson = {
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: data.route,
          },
        };

        if (mapRef.current.getSource("route")) {
          mapRef.current.getSource("route").setData(geoJson);
        } else {
          mapRef.current.addSource("route", {
            type: "geojson",
            data: geoJson,
          });
          mapRef.current.addLayer({
            id: "route",
            type: "line",
            source: "route",
            paint: {
              "line-color": "#007bff",
              "line-width": 4,
            },
          });
        }
      }
    } catch (err) {
      console.error("Error fetching safety score:", err);
    }
  };

  useEffect(() => {
    const map = tt.map({
      key: import.meta.env.VITE_TOMTOM_API_KEY,
      container: "map",
      center: [76.8, 28.7],
      zoom: 10,
    });

    mapRef.current = map;

    map.on("click", (e) => {
      const { lat, lng } = e.lngLat;

      if (!coordsRef.current.start) {
        coordsRef.current.start = { lat, lng };
        if (startRef.current) startRef.current.remove();

        const marker = new tt.Marker({ color: "green" })
          .setLngLat([lng, lat])
          .addTo(map);
        startRef.current = marker;
      } else if (!coordsRef.current.end) {
        coordsRef.current.end = { lat, lng };
        if (endRef.current) endRef.current.remove();

        const marker = new tt.Marker({ color: "red" })
          .setLngLat([lng, lat])
          .addTo(map);
        endRef.current = marker;

        // Call backend
        fetchSafetyScore(coordsRef.current.start, coordsRef.current.end, mode);
      } else {
        // Reset all
        if (startRef.current) startRef.current.remove();
        if (endRef.current) endRef.current.remove();
        if (map.getLayer("route")) map.removeLayer("route");
        if (map.getSource("route")) map.removeSource("route");
        setScore(null);

        coordsRef.current.start = { lat, lng };
        coordsRef.current.end = null;

        const marker = new tt.Marker({ color: "green" })
          .setLngLat([lng, lat])
          .addTo(map);
        startRef.current = marker;
      }
    });
  }, [mode]);
  

  useEffect(() => {
    if (coordsRef.current.start && coordsRef.current.end) {
      fetchSafetyScore(coordsRef.current.start, coordsRef.current.end, mode);
    }
  }, [mode]);

  return (
    <div>
      <div id="map" style={{ height: "100vh" }} />

      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          background: "white",
          padding: "10px",
          borderRadius: "10px",
        }}
      >
        <p>Mode: <strong>{mode}</strong></p>
        <p>Score: <strong>{score?.score}</strong></p>
        <p>Reason: <strong>{score?.reason}</strong></p>

        <button onClick={() => setMode("car")}>Car</button>
        <button onClick={() => setMode("bicycle")}>Bicycle</button>
        <button onClick={() => setMode("pedestrian")}>Pedestrian</button>
      </div>
    </div>
  );
};

export default MapView;
