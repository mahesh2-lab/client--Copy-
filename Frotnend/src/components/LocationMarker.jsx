import { Marker, Popup, useMapEvents } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";
import {customIcon} from './hoem'

// Create a custom icon for the user's location marker
const userIcon = L.icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const LocationMarker = () => {
  const [position, setPosition] = useState(null);

  // Track map events to find the user's location
  const map = useMapEvents({
    locationfound(e) {
      setPosition(e.latlng); // Update the position state
      map.flyTo(e.latlng, map.getZoom()); // Fly to the current location with the current zoom level
    },
    locationerror() {
      console.error("Location access denied or unavailable.");
    },
  });

  // Request the user's location when the component mounts
  useEffect(() => {
    map.locate({ setView: true, maxZoom: 16 });
  }, [map]);

  // If the position is available, show the marker
  return position ? (
    <Marker position={position} icon={customIcon}>
      <Popup>You are here</Popup>
    </Marker>
  ) : null;
};

export default LocationMarker;
