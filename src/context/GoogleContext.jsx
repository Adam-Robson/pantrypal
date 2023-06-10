import { createContext, useContext, useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';

const GoogleContext = createContext();

const libraries = ['places'];

export function GoogleProvider({ children }) {

  const [map, setMap] = useState(null);
  const [zip, setZip] = useState();
  const [directions, setDirections] = useState(null);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [duration, setDuration] = useState(null);
  const [distance, setDistance] = useState(null);
  const [myLatLng, setMyLatLng] = useState({});
  const [organizations, setOrganizations] = useState([]);
  const [error, setError] = useState(null);
  const [activeMarkerId, setActiveMarkerId] = useState(0);
  const [activeLocationIndex, setActiveLocationIndex] = useState(0);

  const [swipeState, setSwipeState] = useState({
    isDragging: false,
    direction: null,
  });

  const { isLoaded, loadError } = useLoadScript({
    id: 'google-maps-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  return (
    <GoogleContext.Provider
      value={{
        map,
        setMap,
        zip,
        setZip,
        organizations,
        setOrganizations,
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
        myLatLng,
        setMyLatLng,
        activeMarkerId,
        setActiveMarkerId,
        activeLocationIndex,
        setActiveLocationIndex,
        swipeState,
        setSwipeState,
        error,
        setError,
        isLoaded,
        loadError
      }}>
      {children}
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
