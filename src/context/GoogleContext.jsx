import { createContext, useContext, useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';

const GoogleContext = createContext();

const libraries = ['places'];

export function GoogleProvider({ children }) {

  const [map, setMap] = useState(null);
  const [places, setPlaces] = useState([]);
  const [directions, setDirections] = useState(null);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [duration, setDuration] = useState(null);
  const [distance, setDistance] = useState(null);
  const [marker, setMarker] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [activeMarker, setActiveMarker] = useState(null);
  const [position, setPosition] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);


  const { isLoaded, loadError } = useLoadScript({
    id: 'google-maps-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  return (
    <GoogleContext.Provider
      value={ {
        map,
        setMap,
        places,
        setPlaces,
        directions,
        setDirections,
        origin,
        setOrigin,
        destination,
        setDestination,
        duration,
        setDuration,
        distance,
        setDistance,
        activeMarker,
        setActiveMarker,
        marker,
        setMarker,
        markers,
        setMarkers,
        position,
        setPosition,
        latitude,
        setLatitude,
        longitude,
        setLongitude,
        searchResult,
        setSearchResult,
        error,
        setError,
        isLoaded,
        loadError
      } }>
      { children }
    </GoogleContext.Provider>
  );
}

export function useGoogleContext() {
  const context = useContext(GoogleContext);
  if (context === undefined) {
    throw new Error('useGoogleMapsContext must be used within a provider');
  }
  return context;
}
