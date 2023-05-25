/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, DirectionsService, DirectionsRenderer, Marker, Autocomplete } from '@react-google-maps/api';
import { trees } from './data.js';
import { useGoogleContext } from '../context/GoogleContext';

const containerStyle = {
  width: '1280px',
  height: '720px'
};

let center = {
  lat: 44,
  lng: -80
};

let location;

export default function Map() {

  const {
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
  } = useGoogleContext();
  
  const onLoad = useCallback(
    function onLoad(map) {
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend(center);
      setMap(map);
    }, [setMap]);
  
  const onUnmount = useCallback(() => {
    setMap(null);
  }, [setMap]);

  useEffect(() => {
    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            location = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };


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
    }
    getLocation();
  }, [setError, setLatitude, setLongitude]);

  function centerMarker() {
    let marker = new window.google.maps.Marker({
      position: location.latLng(),
      map: map
    });
    map.setCenter(location.latitude, location.longitude);
  }

  // function onMapLoad(map) {
  //   setMap(map);
  // }

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
      setSearchResult(response.data.results);
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

  function clearInputs() {
    setOrigin('');
    setDestination('');
    setDistance('');
    setDuration('');
    setDirections('');
  }

  function recenterMap(map) {
    console.log('recenter clicked!');
    const bounds = new window.google.maps.LatLngBounds();
    bounds.extend(center);
    setMap(map);
  }

  /* handleRoute() services any route request */
  function handleRoute() {
    if (origin && destination && map) {
      // eslint-disable-next-line no-undef
      const directionsService = new google.maps.DirectionsService();
      directionsService.route({
        origin,
        destination,
        travelMode: 'DRIVING',
      },
      (response, status) => {
        if (status === 'OK') {
          setDirections(response);
          setDistance(response.routes[0].legs[0].distance.text);
          setDuration(response.routes[0].legs[0].duration.text);
        } else {
          console.error('Error fetching directions:', status);
        }
      });
    }
  }
  
  console.log('location', location);
  console.log('map', map);
  console.log('position', position);
  console.log('markers', markers);
  console.log('latitude', latitude);
  console.log('longitude', longitude);
  console.log('searchResults', searchResult);

  

  return (
    <div>
      
      {
        isLoaded ? <GoogleMap
          mapContainerStyle={ containerStyle }
          zoom={ 7 }
          center={ { lat: latitude, lng: longitude } }
          onLoad={ onLoad }
          onClick={ onMapClick }
          onUnmount={ onUnmount }
        >
          { position && <Marker position={ location } /> }

          {/* <Marker position={{ lat: 44, lng: -80 }} /> */}
          {
            markers.map((marker) => (
              <Marker
                key={ `${marker.lat}-${marker.lng}` }
                position={ { lat: latitude, lng: longitude } }
                onClick={ () => {
                  setActiveMarker(marker);
                } } />
            ))
          }
          { directions && <DirectionsRenderer directions={ directions } /> }
          { markers.map((marker, index) => (
            <Marker key={ index } position={ marker } />
          )) }

        </GoogleMap> : <>There was an error loading the map!</>
      }
      <input
        type="text"
        value={ origin }
        onChange={ (e) => setOrigin(e.target.value) }
        placeholder="Origin"
        className="p-2 m-4"
      />

      <input
        type="text"
        value={ destination }
        onChange={ (e) => setDestination(e.target.value) }
        placeholder="Destination"
        className="p-2 m-4"
      />


      <button onClick={ clearInputs } className="p-2 m-4" >Clear</button>
      <button onClick={ recenterMap } className="p-2 m-4">Recenter</button>
      <button onClick={ handleRoute } className="p-2 m-4">Route</button>
      { origin && destination && (
        <DirectionsService
          options={ {
            destination,
            origin,
            travelMode: 'DRIVING',
          } }
          // callback={ (res) => {
          //   if (res !== null) {
          //     handleRoute();
          //   }
          // } }
        />
      ) }

      <p>{ distance && `Distance: ${distance}` }</p>
      <p>{ duration && `Duration: ${duration}` }</p>
    </div>
  );
}