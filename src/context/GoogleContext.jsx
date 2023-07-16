import { createContext, useContext, useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';

const GoogleContext = createContext();

const placesLibrary = ['places'];

export function GoogleProvider({ children }) {
  const [map, setMap] = useState(null);
  const [search, setSearch] = useState('');
  const [directions, setDirections] = useState(false);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [duration, setDuration] = useState(null);
  const [distance, setDistance] = useState(null);
  const [myLatLng, setMyLatLng] = useState({ lat: 0, lng: 0 });
  const [userCityState, setUserCityState] = useState(null);
  const [organizations, setOrganizations] = useState([]);
  const [activeMarkerId, setActiveMarkerId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [tutorial, setTutorial] = useState(false);
  const [isDetailsPage, setIsDetailsPage] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [floatCard, setFloatCard] = useState(false);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(null);

  const { isLoaded, loadError } = useLoadScript({
    id: 'google-maps-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: placesLibrary,
  });

  return (
    <GoogleContext.Provider
      value={{
        map,
        setMap,
        search,
        setSearch,
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
        isOpen,
        setIsOpen,
        tutorial,
        userCityState,
        setUserCityState,
        setTutorial,
        isDetailsPage,
        setIsDetailsPage,
        currentPage,
        setCurrentPage,
        isMounted,
        setIsMounted,
        floatCard,
        setFloatCard,
        loader,
        setLoader,
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
