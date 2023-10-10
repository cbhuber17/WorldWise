// import { useNavigate, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";

import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Button from "./Button";

function Map() {
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([51, -114]); // Lat/lon
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();
  const [mapLat, mapLng] = useUrlPosition();

  // Sync lat and lon states (react and URL) whenever one changes
  // useEffect is a synchronization mechanism
  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );

  // Sync map with geolocation (user clicks button to get their location)
  useEffect(
    function () {
      if (geolocationPosition)
        setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    },
    [geolocationPosition]
  );

  let scrollWheelZoom = true;

  if (window.innerWidth < 975) scrollWheelZoom = false;

  return (
    <div className={styles.mapContainer}>
      {/* Get user's current position when clicking button */}
      {!geolocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use your position"}
        </Button>
      )}

      {/* Leaflet library components */}
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={scrollWheelZoom}
        className={styles.map}
        zoomControl={!scrollWheelZoom}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          // <Link
          //   to={`cities/${city.id}?lat=${city.position.lat}&lng=${city.position.lng}`}
          //   key={city.id}
          // >
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
            eventHandlers={{
              click: () =>
                (window.location = `#/app/cities/${city.id}?lat=${city.position.lat}&lng=${city.position.lng}`),
            }}
          >
            <Popup>
              <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
          // </Link>
        ))}

        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

/* eslint react/prop-types: 0 */
function ChangeCenter({ position }) {
  const map = useMap(); // Leaflet library hook
  map.setView(position);
  return null;
}

// Detect click on map to change lat/lon
function DetectClick() {
  const navigate = useNavigate();

  // React leaflet library custom hook
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}

export default Map;
