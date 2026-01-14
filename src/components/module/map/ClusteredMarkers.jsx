import { useEffect, useRef, useState, useCallback } from 'react';
import { AdvancedMarker, useMap, InfoWindow } from '@vis.gl/react-google-maps';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import { CustomPin } from './CustomPin';

const SVG_PATH = "M13.5796046,38.8603699 L14.5,40 L14.5,40 L15.4203954,38.8603699 L15.4203954,38.8603699 L16.3106139,37.7414157 C16.456469,37.5566463 16.6010666,37.3727384 16.7444069,37.1896919 L17.58936,36.1017514 L17.58936,36.1017514 L18.4041363,35.0344866 L18.4041363,35.0344866 L19.1887357,33.9878976 L19.1887357,33.9878976 L19.9431582,32.9619844 C20.0663805,32.7927219 20.1883455,32.6243208 20.3090531,32.4567813 L21.0182102,31.4618818 L21.0182102,31.4618818 L21.6971904,30.4876581 L21.6971904,30.4876581 L22.3459938,29.5341102 C23.1909469,28.2764969 23.9554284,27.0740191 24.6394381,25.9266767 L25.1373569,25.0765078 C27.7124523,20.5974092 29,17.000478 29,14.2857143 C29,6.39593215 22.5081289,0 14.5,0 C6.49187113,0 0,6.39593215 0,14.2857143 C0,16.5762962 0.916623309,19.4949055 2.74986993,23.0415422 L3.17234651,23.8400216 C3.39112903,24.2444302 3.62122789,24.6565923 3.86264308,25.0765078 L4.36056191,25.9266767 C5.04457163,27.0740191 5.80905307,28.2764969 6.65400624,29.5341102 L7.30280957,30.4876581 L7.30280957,30.4876581 L7.9817898,31.4618818 L7.9817898,31.4618818 L8.69094693,32.4567813 C8.81165453,32.6243208 8.93361949,32.7927219 9.05684183,32.9619844 L9.81126431,33.9878976 L9.81126431,33.9878976 L10.5958637,35.0344866 L10.5958637,35.0344866 L11.41064,36.1017514 L11.41064,36.1017514 L12.2555931,37.1896919 L12.2555931,37.1896919 L13.1307232,38.2983083 C13.279093,38.4848007 13.4287201,38.6721546 13.5796046,38.8603699 L13.5796046,38.8603699 Z";

/**
 * Renders clustered markers using AdvancedMarker and MarkerClusterer
 */
export function ClusteredMarkers({ locations, onMarkerClick }) {
  const map = useMap();
  const [markers, setMarkers] = useState({});
  const [selectedLocation, setSelectedLocation] = useState(null);
  const clustererRef = useRef(null);

  useEffect(() => {
    if (!map) return;
    if (!clustererRef.current) {
      clustererRef.current = new MarkerClusterer({
        map,
        renderer: {
          render: ({ position, markers: clusterMarkers }) => {
            const totalCount = clusterMarkers.reduce((sum, marker) => {
              return sum + (marker.count || 1);
            }, 0);

            const content = document.createElement('div');
            content.innerHTML = `
              <div style="position: relative; width: 26px; height: 36px; cursor: pointer;">
                <svg width="26" height="36" viewBox="0 0 29 40" fill="none" xmlns="http://www.w3.org/2000/svg" style="position: absolute; top: 0; left: 0;">
                  <path d="${SVG_PATH}" fill="#FFB71C"/>
                </svg>
                <span style="position: absolute; top: 8px; left: 50%; transform: translateX(-50%); color: #000; font-size: 12px; font-weight: bold;">${totalCount}</span>
              </div>
            `;

            return new google.maps.marker.AdvancedMarkerElement({
              position,
              content,
            });
          },
        },
      });
    }
  }, [map]);

  useEffect(() => {
    if (!clustererRef.current) return;
    clustererRef.current.clearMarkers();
    clustererRef.current.addMarkers(Object.values(markers));
  }, [markers]);

  useEffect(() => {
    return () => {
      if (clustererRef.current) {
        clustererRef.current.clearMarkers();
      }
    };
  }, []);

  const setMarkerRef = useCallback((marker, key) => {
    if (marker && markers[key]) return;
    if (!marker && !markers[key]) return;

    setMarkers((prev) => {
      if (marker) {
        marker.count = locations.find(
          (loc) => `${loc.lat}-${loc.lng}` === key
        )?.count || 1;
        return { ...prev, [key]: marker };
      } else {
        const { [key]: _, ...rest } = prev;
        return rest;
      }
    });
  }, [locations, markers]);

  const handleMarkerClick = (location) => {
    setSelectedLocation(location);
    if (onMarkerClick) {
      onMarkerClick(location);
    }
  };

  const handleInfoWindowClose = () => {
    setSelectedLocation(null);
  };

  return (
    <>
      {locations.map((location) => {
        const key = `${location.lat}-${location.lng}`;
        return (
          <AdvancedMarker
            key={key}
            position={{ lat: location.lat, lng: location.lng }}
            ref={(marker) => setMarkerRef(marker, key)}
            onClick={() => handleMarkerClick(location)}
            title={location.title || `Position: (lat:${location.lat}, lng:${location.lng})`}
          >
            <CustomPin
              label={location.label || String(location.count || 1)}
              fillColor="#0591E5"
              labelColor="#fff"
            />
          </AdvancedMarker>
        );
      })}

      {selectedLocation && (
        <InfoWindow
          position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
          onCloseClick={handleInfoWindowClose}
        >
          <div>
            {selectedLocation.title ||
              `Position: (lat:${selectedLocation.lat}, lng:${selectedLocation.lng})`}
          </div>
        </InfoWindow>
      )}
    </>
  );
}
