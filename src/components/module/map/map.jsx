import React, { useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Circle,
} from "@react-google-maps/api";
import "../../../stylesheet/map.css";
import sampleLocations from "./sampleLocations";
import { setCustomGoogleMapMarkers } from "./setCustomGoogleMapMarkers";

const Map = () => {
  const [map, _setMap] = useState({ map: "map not setup" });
  const [zoomLevel, setZoomLevel] = useState(11);
  const [center, setCenter] = useState({ lat: 22.483364, lng: 114.139587 });
  const [markerMessage, setMarkerMessage] = useState("");
  const [infoWindow, setInfoWindow] = useState();
  const mapRef = React.useRef(map);
  const setMap = (map) => {
    mapRef.current = map;
    _setMap(map);
  };

  //Load google map script hook
  const { isLoaded } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_APIKEY,
  });

  const onLoad = React.useCallback(function callback(map) {
    const infoWindow = new window.google.maps.InfoWindow();
    setInfoWindow(infoWindow);
    setMap(map);
    setCustomGoogleMapMarkers(
      map,
      sampleLocations.ausLocations,
      infoWindow,
      mapCenterAndZoom
    );
    setCustomGoogleMapMarkers(
      map,
      sampleLocations.homeLocations,
      infoWindow,
      mapCenterAndZoom
    );
    fitBoundByLocations(map, sampleLocations.homeLocations);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const fitBoundByLocations = (map, locations) => {
    infoWindow && infoWindow.close(); //close the infoWindow before fitBounds, otherwise map will pan to the infoWindow after fitBounds.
    const bounds = new window.google.maps.LatLngBounds();
    locations.forEach((home) => bounds.extend(home));
    map.fitBounds(bounds);
  };

  const mapCenterAndZoom = (position) => {
    let rand = Math.random() * 0.0000001;
    setCenter({
      lat: position.lat + rand,
      lng: position.lng + rand,
    });

    setZoomLevel(18 + rand);
  };

  if (!isLoaded) return <p>Loading...</p>;

  return (
    <React.Fragment>
      <h1>{markerMessage}</h1>
      <button
        onClick={() => fitBoundByLocations(map, sampleLocations.homeLocations)}
      >
        Home Area
      </button>
      <button
        onClick={() => fitBoundByLocations(map, sampleLocations.ausLocations)}
      >
        Australia Area
      </button>
      <GoogleMap
        zoom={zoomLevel}
        center={center}
        mapContainerClassName="map-container"
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <Circle
          center={sampleLocations.homeLocations.find(
            (location) => location.id === "HK"
          )}
          radius={800000}
          options={{
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.35,
          }}
        />
      </GoogleMap>
    </React.Fragment>
  );
};

export default Map;
