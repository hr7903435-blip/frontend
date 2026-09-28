import { useState } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";

import L from "leaflet";

import "leaflet/dist/leaflet.css";

// ================= MARKER ICON =================

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// ================= MAP CLICK =================

function MapClick({ position, setPosition }) {
  const map = useMap();

  useMapEvents({
    click(event) {
      const newPosition = [
        event.latlng.lat,
        event.latlng.lng,
      ];

      setPosition(newPosition);
    },
  });

  return position ? (
    <Marker position={position} />
  ) : null;
}

// ================= MAP CENTER =================

function ChangeMapView({ position }) {
  const map = useMap();

  map.setView(position, 14);

  return null;
}

// ================= DELIVERY MAP =================

export default function DeliveryMap({ onLocationSelect }) {
  const [position, setPosition] = useState([
    28.5355,
    77.391,
  ]);

  const [loading, setLoading] = useState(false);

  const [selected, setSelected] = useState(false);

  // ================= CURRENT LOCATION =================

  function getCurrentLocation() {
    if (!navigator.geolocation) {
      alert("Your browser does not support location.");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (location) => {
        const newPosition = [
          location.coords.latitude,
          location.coords.longitude,
        ];

        setPosition(newPosition);
        setSelected(false);

        setLoading(false);
      },

      (error) => {
        alert(
          "Unable to access location. Please allow location permission."
        );

        setLoading(false);
      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    );
  }

  // ================= CONFIRM LOCATION =================

  function confirmLocation() {
    onLocationSelect({
      latitude: position[0],
      longitude: position[1],
    });

    setSelected(true);
  }

  return (
    <div className="delivery-map">

      <h3>📍 Delivery Location</h3>

      <button
        type="button"
        className="location-button"
        onClick={getCurrentLocation}
        disabled={loading}
      >
        {loading
          ? "Getting Location..."
          : "📍 Use My Current Location"}
      </button>

      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={true}
        className="map-container"
      >

        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ChangeMapView position={position} />

        <MapClick
          position={position}
          setPosition={(newPosition) => {
            setPosition(newPosition);
            setSelected(false);
          }}
        />

      </MapContainer>

      <p className="map-help">
        Click on the map to select your delivery location.
      </p>

      <button
        type="button"
        className="location-button confirm-location"
        onClick={confirmLocation}
      >
        Confirm Delivery Location
      </button>

      {selected && (
        <p className="location-success">
          ✓ Delivery location selected successfully!
        </p>
      )}

    </div>
  );
}