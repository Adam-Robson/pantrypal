/* eslint-disable no-unused-vars */
import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import Query from './Query';

const containerStyle = {
  width: '1280px',
  height: '720px'
};

const center = {
  lat: 44,
  lng: -80
};

export default function Map({ organizations, myPosition }) {
  const [map, setMap] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  });

  const onLoad = useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds();
    bounds.extend(center);
    setMap(map);
  }, [setMap]);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, [setMap]);

  return (
    <div>
      {
        isLoaded ? <GoogleMap
          mapContainerStyle={containerStyle}
          center={myPosition}
          zoom={7}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {organizations.map((org) => (
            <Marker key={org.name} position={org.position} />
          ))}

        </GoogleMap> : <>There was an error loading the map!</>
      }
    </div>
  );
}
