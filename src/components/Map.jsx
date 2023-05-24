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

export default function Map() {

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  });

  const [map, setMap] = useState(null);
  const [position, setPosition] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);
  
  const onLoad = useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);
  
  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
            setError(null);
          },
          (error) => {
            setError(error.message);
            console.error('Error getting geolocation:', error);
          }
        );
      } else {
        setError('Geolocation is not supported by this browser.');
        console.error('Geolocation is not supported by this browser.');
      }
    };
    getLocation();
  }, []);

  function onMapLoad(map) {
    setMap(map);
  }

  function onMapClick(e) {
    const newMarker = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    };
    setMarkers([...markers, newMarker]);
  }

  async function searchPlaces(query) {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=` + process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
      setSearchResults(response.data.results);
      setMarkers(
        response.data.results.map(result => ({
          lat: result.geometry.location.lat,
          lng: result.geometry.location.lng
        }))
      );
    } catch (error) {
      console.error('Error searching for places:', error);
    }
  }

  // console.log('map', map);
  // console.log('position', position);
  // console.log('markers', markers);
  // console.log('latitude', latitude);
  // console.log('longitude', longitude);
  // console.log('searchResults', searchResults);

  return (
    <div>
      <div style={ { position: 'absolute', bottom: 10, left: 10, backgroundColor: 'orange' } }>
        <h1>Hellow World</h1>
      </div>
      {
        isLoaded ? <GoogleMap
          mapContainerStyle={ containerStyle }
          center={ center }
          zoom={ 7 }
          onLoad={ onMapLoad }
          onClick={ onMapClick}
          onUnmount={ onUnmount }
        >
          { position && <Marker position={ position } /> }

          <Marker position={{ lat: 44, lng: -80 }} />

          { markers.map((marker, index) => (
            <Marker key={ index } position={ marker } />
          )) }

        </GoogleMap> : <></>
      }
      <Query />
    </div>
  );
}