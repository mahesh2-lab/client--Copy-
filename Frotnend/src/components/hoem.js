
import L from 'leaflet';

export const customIcon = L.icon({
<<<<<<< HEAD
  iconUrl: "https://w7.pngwing.com/pngs/457/630/png-transparent-location-logo-location-computer-icons-symbol-location-miscellaneous-angle-heart.png",
=======
  iconUrl: "icon.png",
>>>>>>> 7ac991d (uy)
  iconSize: [32, 32], // Size of the icon
  iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
  popupAnchor: [0, -32], // Point from which the popup should open relative to the iconAnchor
});



export const seachicon = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
<<<<<<< HEAD
  iconUrl: "https://w7.pngwing.com/pngs/457/630/png-transparent-location-logo-location-computer-icons-symbol-location-miscellaneous-angle-heart.png",
=======
  iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
>>>>>>> 7ac991d (uy)
  shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
});
