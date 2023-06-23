import { useState, useEffect } from 'react';
import { useGoogleContext } from '../context/GoogleContext';
import { GoogleMap } from '@react-google-maps/api';
import { Marker } from '@react-google-maps/api';
import mapStyles from '../assets/styles/map';

import pin from '../assets/images/icons/org-pin.svg';

export default function OrgDetailsPage({ organization }) {
  const [isMounted, setIsMounted] = useState(false);
  const {
    onLoad,
    isLoaded,
    onUnmount,
  } = useGoogleContext();

  useEffect(() => {
    setIsMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isLoaded && (
        <GoogleMap
          mapContainerClassName="map"
          mapContainerStyle={{ height: '325px', width: '100%' }}
          zoom={15}
          options={{
            styles: mapStyles,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
            zoomControl: false
          }}
          center={organization.position}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {isMounted && <Marker position={organization.position} options={{ icon: pin }} />}
        </GoogleMap>
      )}
    </>
  );
}
