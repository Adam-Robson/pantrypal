import { createContext, useContext, useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';

const GoogleContext = createContext();

const libraries = ['places'];

export function GoogleProvider({ children }) {

  const [map, setMap] = useState(null);
  const [directions, setDirections] = useState(null);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [duration, setDuration] = useState(null);
  const [distance, setDistance] = useState(null);
  const [myLatLng, setMyLatLng] = useState({});
  const [organizations, setOrganizations] = useState([]);
  const [error, setError] = useState(null);
  const [activeMarkerId, setActiveMarkerId] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [infoWindow, setInfoWindow] = useState({});
  const [showInfoWindow, setShowInfoWindow] = useState(false);
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
        activeIndex,
        setActiveIndex,
        activeMarkerId,
        setActiveMarkerId,
        infoWindow,
        setInfoWindow,
        showInfoWindow,
        setShowInfoWindow,
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
