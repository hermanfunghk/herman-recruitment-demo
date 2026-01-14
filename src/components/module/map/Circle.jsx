import { useEffect, useRef } from 'react';
import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps';

/**
 * Custom Circle component for @vis.gl/react-google-maps
 */
export function Circle({ center, radius, options = {} }) {
  const map = useMap();
  const mapsLibrary = useMapsLibrary('maps');
  const circleRef = useRef(null);

  useEffect(() => {
    if (!map || !mapsLibrary) return;

    circleRef.current = new window.google.maps.Circle({
      map,
      center,
      radius,
      ...options,
    });

    return () => {
      if (circleRef.current) {
        circleRef.current.setMap(null);
        circleRef.current = null;
      }
    };
  }, [map, mapsLibrary]);

  useEffect(() => {
    if (!circleRef.current) return;
    circleRef.current.setOptions({
      center,
      radius,
      ...options,
    });
  }, [center, radius, options]);

  return null;
}
