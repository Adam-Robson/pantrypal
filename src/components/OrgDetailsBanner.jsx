import { useGoogleContext } from '../context/GoogleContext';
import { useState, useEffect } from 'react';
import { GoogleMap } from '@react-google-maps/api';
import { Marker } from '@react-google-maps/api';
import pin from '../assets/images/icons/org-pin.svg';
import mapStyles from '../assets/styles/map';

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
          mapContainerStyle={{ height: '500px', width: '1000px' }}
          zoom={15}
          options={{
            styles: mapStyles,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,

          }}
          center={organization.position}
          onLoad={onLoad}
          onUnmount={onUnmount}
          className="min-w-full"
        >
          {isMounted && <Marker position={organization.position} options={{ icon: pin }} />}
        </GoogleMap>
      )}
    </>
  );
}
