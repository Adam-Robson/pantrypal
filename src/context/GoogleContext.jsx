import { useState, createContext, useContext } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';

const GoogleMapsContext = createContext();
const libraries = ['places'];
export function GoogleMapsProvider({ children }) {
  const [map, setMap] = useState(/** @type google.maps.Map */(null));
  const [directions, setDirections] = useState(null);
  const [destination, setDestination] = useState('');
  const [origin, setOrigin] = useState('');
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const center = { lat: 37.8199, lng: -122.4783 };

  return (
    <GoogleMapsContext.Provider
      value={ {
        map,
        setMap,
        directions,
        setDirections,
        destination,
        setDestination,
        distance,
        setDistance,
        duration,
        setDuration,
        origin,
        setOrigin,
        center,
        isLoaded,
        loadError
      } }>
      { children }
    </GoogleMapsContext.Provider>
  );
}

export function useGoogleMapsContext() {

  const context = useContext(GoogleMapsContext);

  if (context === undefined) {
    throw new Error('useGoogleMapsContext must be used within a provider');
  }

  return context;

}
