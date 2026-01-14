import React, { useState, useCallback } from 'react';
import { APIProvider, Map, useMap } from '@vis.gl/react-google-maps';
import '../../../stylesheet/map.css';
import sampleLocations from './sampleLocations';
import { ClusteredMarkers } from './ClusteredMarkers';
import { Circle } from './Circle';

function MapContent({ onMapReady }) {
  const map = useMap();

  React.useEffect(() => {
    if (map && onMapReady) {
      onMapReady(map);
      const bounds = new window.google.maps.LatLngBounds();
      sampleLocations.homeLocations.forEach((loc) =>
        bounds.extend({ lat: loc.lat, lng: loc.lng })
      );
      map.fitBounds(bounds);
    }
  }, [map, onMapReady]);

  const handleMarkerClick = useCallback((location) => {
    if (!map) return;
    map.panTo({ lat: location.lat, lng: location.lng });
    map.setZoom(18);
  }, [map]);

  const allLocations = [
    ...sampleLocations.ausLocations.map((loc) => ({ ...loc, count: 1 })),
    ...sampleLocations.homeLocations.map((loc) => ({ ...loc, count: 1 })),
  ];

  const circleCenter = sampleLocations.homeLocations.find(
    (location) => location.id === 'HK'
  );

  return (
    <>
      <ClusteredMarkers
        locations={allLocations}
        onMarkerClick={handleMarkerClick}
      />
      {circleCenter && (
        <Circle
          center={{ lat: circleCenter.lat, lng: circleCenter.lng }}
          radius={800000}
          options={{
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
          }}
        />
      )}
    </>
  );
}

const MapComponent = () => {
  const [mapInstance, setMapInstance] = useState(null);

  const fitBoundByLocations = useCallback((locations) => {
    if (!mapInstance) return;
    const bounds = new window.google.maps.LatLngBounds();
    locations.forEach((loc) => bounds.extend({ lat: loc.lat, lng: loc.lng }));
    mapInstance.fitBounds(bounds);
  }, [mapInstance]);

  return (
    <React.Fragment>
      <h1></h1>
      <button onClick={() => fitBoundByLocations(sampleLocations.homeLocations)}>
        Home Area
      </button>
      <button onClick={() => fitBoundByLocations(sampleLocations.ausLocations)}>
        Australia Area
      </button>
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAP_APIKEY}>
        <Map
          defaultZoom={11}
          defaultCenter={{ lat: 22.483364, lng: 114.139587 }}
          mapId="DEMO_MAP_ID"
          className="map-container"
        >
          <MapContent onMapReady={setMapInstance} />
        </Map>
      </APIProvider>
    </React.Fragment>
  );
};

export default MapComponent;
