import React, { useEffect, useState, useRef, useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { HeatmapLayer } from "react-leaflet-heatmap-layer-v3";
import "leaflet/dist/leaflet.css";
import useGeoLocation from "../hooks/useGeolocation";
import LeafletGeoSearch from "./LeafletGeoSearch";
import ReportLocationForm from "./ReportLocationForm";
import CenterButton from "./CenterBtn";
import usereport from "../hooks/useReport";
import useGetHeatmap from "../hooks/useGetHeatmap";
import toast from "react-hot-toast";
import customIcon from "./icon";  
import icon from "./icon"
import LocationMarker from "./LocationMarker";
import { Spinner } from "@material-tailwind/react";

const defaultCenter = [20.536846, 76.18087]; // Fallback coordinates

const getStatus = (intensity) => {
  if (intensity <= 1) return "Very Safe";
  if (intensity <= 2) return "Safe";
  if (intensity <= 3) return "Moderate";
  if (intensity <= 4) return "Unsafe";
  return "Very Unsafe";
};

const Map = () => {
  const [reportedLocations, setReportedLocations] = useState([]);
  const [formLocation, setFormLocation] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [position, setPosition] = useState(null);
  const [reporting, setReporting] = useState(false);
  const { load, SendReport } = usereport();
  const { loading, heatdata } = useGetHeatmap();
  const location = useGeoLocation(); // Custom hook to get user's current location
  const mapRef = useRef(null);

  // Memoize the user's initial location to prevent recalculations
  const initialCenter = useMemo(() => {
    return location.loaded && location.coordinates
      ? [location.coordinates.lat, location.coordinates.lng]
      : defaultCenter;
  }, [location]);

  const toggleReporting = () => {
    setReporting((prev) => !prev);
    setPosition(null);
  };

  const saveMapState = () => {
    if (mapRef.current) {
      const map = mapRef.current;
      const mapCenter = map.getCenter();
      const mapZoom = map.getZoom();
      sessionStorage.setItem(
        "mapState",
        JSON.stringify({
          center: [mapCenter.lat, mapCenter.lng],
          zoom: 20,
        })
      );
    }
  };

  const getSavedMapState = () => {
    const savedState = sessionStorage.getItem("mapState");
    if (savedState) {
      return JSON.parse(savedState);
    }
    return { center: defaultCenter, zoom: 20 }; // Fallback to default values
  };

  useEffect(() => {
    window.addEventListener("beforeunload", saveMapState);
    return () => {
      window.removeEventListener("beforeunload", saveMapState);
    };
  }, []);

  useEffect(() => {
    if (!loading && Array.isArray(heatdata)) {
      const storedRatings = JSON.parse(localStorage.getItem("ratings")) || {};
      setReportedLocations(
        heatdata.map((data) => ({
          lat: data.lat,
          lng: data.lng,
          intensity: data.intensity,
          name: data.name,
          type: data.type,
          description: data.description,
          ratings: storedRatings[`${data.lat},${data.lng}`] || [],
        }))
      );
    } else {
      setReportedLocations([]);
    }
  }, [loading, heatdata]);

  const handleFormSubmit = async (formData) => {
    await SendReport([
      { lat: formLocation.lat, lng: formLocation.lng, ...formData },
    ]);
    setReportedLocations((prev) => [
      ...prev,
      { lat: formLocation.lat, lng: formLocation.lng, ...formData, ratings: [] },
    ]);
    setFormLocation(null);
    setIsDialogOpen(false);
    setReporting(false);
  };

  const handleRatingSubmit = (index, rating) => {
    setReportedLocations((prev) => {
      const updatedLocations = [...prev];
      updatedLocations[index].ratings.push(rating);

      const storedRatings = JSON.parse(localStorage.getItem("ratings")) || {};
      const locationKey = `${updatedLocations[index].lat},${updatedLocations[index].lng}`;
      storedRatings[locationKey] = updatedLocations[index].ratings;
      localStorage.setItem("ratings", JSON.stringify(storedRatings));

      return updatedLocations;
    });
    toast.success("Rating submitted!");
  };

  const calculateAverageRating = (ratings) => {
    if (!Array.isArray(ratings)) return "No ratings yet";
    if (ratings.length === 0) return "No ratings yet";
    const sum = ratings.reduce((acc, curr) => acc + curr, 0);
    return (sum / ratings.length).toFixed(1);
  };

  const savedState = getSavedMapState();

  const MapClickHandler = () => {
    if (reporting) {
      useMapEvents({
        click: (e) => {
          setFormLocation(e.latlng);
          setIsDialogOpen(true);
          setPosition(e.latlng);
        },
      });
    }
    return null;
  };

  return (
    <div className="relative w-full h-screen">
      <MapContainer
        center={savedState.center || initialCenter}
        zoom={savedState.zoom || 2}
        minZoom={0}
        className="w-full h-full"
        zoomControl={true}
        preferCanvas={true}
        whenCreated={(map) => (mapRef.current = map)}
      >
        <LeafletGeoSearch
          onSearchResult={(newCenter) => {}}
          onReportLocation={toggleReporting}
        />
        {loading ? (
          <div className="flex justify-center h-full items-center">
            <Spinner color="blue" size="large" className="h-14 w-14" />
          </div>
        ) : (
          <>
            <TileLayer
              url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
              maxZoom={99}
            />
            {reportedLocations.length > 0 && (
              <HeatmapLayer
                points={reportedLocations}
                latitudeExtractor={(point) => point.lat}
                longitudeExtractor={(point) => point.lng}
                intensityExtractor={(point) => point.intensity / 5}
                radius={20}
                blur={15}
                maxZoom={19}
              />
            )}
            <MapClickHandler />
            {reportedLocations.map((location, index) => (
              <Marker key={index} position={[location.lat, location.lng]} icon={icon}>
                <Popup>
                  <strong>{location.name}</strong>
                  <br />
                  Type: {location.type}
                  <br />
                  Description: {location.description}
                  <br />
                  Status: {getStatus(location.intensity)}
                  <br />
                  Average Rating: {calculateAverageRating(location.ratings)}
                  <br />
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const rating = parseInt(e.target.rating.value, 10);
                      if (rating >= 1 && rating <= 5) {
                        handleRatingSubmit(index, rating);
                        e.target.reset();
                      } else {
                        toast.error("Please enter a rating between 1 and 5.");
                      }
                    }}
                  >
                    <label>
                      Rate (1-5):{" "}
                      <input
                        type="number"
                        name="rating"
                        min="1"
                        max="5"
                        required
                      />
                    </label>
                    <button type="submit">Submit</button>
                  </form>
                </Popup>
              </Marker>
            ))}
            <LocationMarker />
          </>
        )}
        <CenterButton
          center={initialCenter}
          zoom={15}
          tooglereport={toggleReporting}
          bgColor={reporting}
        />
      </MapContainer>

      {formLocation && (
        <ReportLocationForm
          open={isDialogOpen}
          onClose={() => {
            setIsDialogOpen(false);
            setReporting(false);
          }}
          onSubmit={handleFormSubmit}
          position={position}
        />
      )}
    </div>
  );
};

export default Map;
