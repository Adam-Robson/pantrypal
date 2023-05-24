import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '1280px',
  height: '720px'
};
const center = {
  lat: 20.5937,
  lng: -78.9629
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
  
  const onUnmount = useCallback((map) => {
    setMap(null);
  }, []);

  return (
    <>
      <div style={ { position: 'relative' } }>
        <div style={ { position: 'absolute', top: 10, left: 10, backgroundColor: 'orange', padding: 25 } }>
          <h1>Hellow World</h1>
        </div>{

          isLoaded ? <GoogleMap
            mapContainerStyle={ containerStyle }
            center={ center }
            zoom={ 7 }
            onLoad={ onLoad }
            onUnmount={ onUnmount }
          >
        
          </GoogleMap> : <></>
        }</div>
    </>
  );
}