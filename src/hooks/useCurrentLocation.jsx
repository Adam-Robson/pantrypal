import { useEffect } from 'react';
import { useGoogleMapsContext } from '../context/GoogleContext';

export function useCurrentLocation() {
  const { setOrigin } = useGoogleMapsContext();
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setOrigin(`${latitude}, ${longitude}`);
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, [setOrigin]);

}