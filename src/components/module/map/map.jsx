import React, { useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker /*, MarkerClusterer */,
} from "@react-google-maps/api";
// import { MarkerClusterer } from "@googlemaps/markerclusterer";
import "../../../stylesheet/map.css";
import { faLocationPin } from "@fortawesome/free-solid-svg-icons";
import sampleLocations from "./sampleLocations";
import { setCustomGoogleMapMarkers } from "./setCustomGoogleMapMarkers";

const Map = () => {
  const [map, _setMap] = useState({ map: "map not setup" });
  const [zoomLevel, setZoomLevel] = useState(11);
  const [center, setCenter] = useState({ lat: 22.483364, lng: 114.139587 });
  const [markerMessage, setMarkerMessage] = useState("");
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
    fitBoundByLocations(map, sampleLocations.homeLocations);
    setMap(map);
    setCustomGoogleMapMarkers(
      map,
      sampleLocations.ausLocations,
      onClickDisplayMarkerInfo
    );
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const fitBoundByLocations = (map, locations) => {
    const bounds = new window.google.maps.LatLngBounds();
    locations.forEach((home) => bounds.extend(home));
    map.fitBounds(bounds);
  };

  const onClickDisplayMarkerInfo = (position, message) => {
    let rand = Math.random() * 0.00001;
    setCenter({
      lat: position.lat + rand,
      lng: position.lng + rand,
    });

    setZoomLevel(18 + rand);
    setMarkerMessage(message);
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
        {sampleLocations.homeLocations.map((home) => (
          <Marker
            key={home.id}
            position={home}
            icon={{
              path: faLocationPin.icon[4],
              fillColor: "#0000ff",
              fillOpacity: 1,
              strokeWeight: 1,
              strokeColor: "#ffffff",
              scale: 0.075,
            }}
            label={home.id}
            onClick={() => {
              onClickDisplayMarkerInfo(
                home,
                `This is my home in ${home.description} !`
              );
            }}
          />
        ))}
      </GoogleMap>
    </React.Fragment>
  );
};

export default Map;
