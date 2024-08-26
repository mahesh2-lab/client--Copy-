
import L from 'leaflet';

export const customIcon = L.icon({
  iconUrl: "icon.png",
  iconSize: [32, 32], // Size of the icon
  iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
  popupAnchor: [0, -32], // Point from which the popup should open relative to the iconAnchor
});



