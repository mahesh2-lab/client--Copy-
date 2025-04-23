import React, { useState, useCallback } from "react";
import { useMap } from "react-leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import L from "leaflet";
import FloatingNavBar from "./FloatingNavBar";
import { customIcon } from "./hoem";

function LeafletGeoSearch({ onSearchResult }) {
  const map = useMap();
  const provider = new OpenStreetMapProvider({
    params: {
      "accept-language": "en", // Prioritize English suggestions
    },
  });
  const [marker, setMarker] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  // Function to check if a string contains only English characters
  const isEnglish = (str) => /^[A-Za-z0-9\s,.'-]*$/.test(str);

  const handleSearch = useCallback(
    async (query) => {
      try {
        const results = await provider.search({ query });
        if (results.length) {
          const validResult = results.find(
            (result) => result.x && result.y && isEnglish(result.label)
          );

          if (validResult) {
            const newCenter = [validResult.y, validResult.x];
            console.log(newCenter);
            
            map.flyTo(newCenter, 13);

            if (marker) {
              map.removeLayer(marker);
            }

            const newMarker = L.marker(newCenter, {
              icon: customIcon,
            }).addTo(map);
            newMarker.bindPopup(validResult.label).openPopup();
            setMarker(newMarker);

            onSearchResult(newCenter);
          } else {
            alert(
              "No valid results found for the specified location. Please try again."
            );
          }
        } else {
          alert(
            "No results found for the specified location. Please try again."
          );
        }
      } catch (error) {
        alert("An error occurred during the search. Please try again.");
      }
    },
    [map, marker, provider, onSearchResult]
  );

  const fetchSuggestions = useCallback(
    async (query) => {
      if (query.trim() === "") {
        setSuggestions([]);
        return;
      }
      try {
        const results = await provider.search({ query });
        // Filter and map to English suggestions
        const englishSuggestions = results
          .filter((result) => isEnglish(result.label))
          .map((result) => result.label);
        setSuggestions(englishSuggestions);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    },
    [provider]
  );

  return (
    <FloatingNavBar
      onSearch={handleSearch}
      suggestions={suggestions}
      fetchSuggestions={fetchSuggestions}
    />
  );
}

export default LeafletGeoSearch;
