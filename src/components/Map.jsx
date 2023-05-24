/* eslint-disable no-unused-vars */
import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '1280px',
  height: '720px'
};
const center = {
  lat: 44,
  lng: -80
};

export default function Map() {

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);
  
  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  return (
    <>
      <div style={ { position: 'relative' } }>
        <div style={ { position: 'absolute', bottom: 10, left: 10, backgroundColor: 'orange' } }>
          <h1>Hellow World</h1>
        </div>{

          isLoaded ? <GoogleMap
            mapContainerStyle={ containerStyle }
            center={ center }
            zoom={ 7 }
            onLoad={ onLoad }
            onUnmount={ onUnmount }
          >
            <Marker position={{ lat: 44, lng: -80 }}/>
          </GoogleMap> : <></>
        }</div>
    </>
  );
}