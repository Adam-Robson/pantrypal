/* eslint-disable no-unused-vars */
import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, DirectionsService, DirectionsRenderer, Marker, Autocomplete, OverlayView } from '@react-google-maps/api';
import { useGoogleContext } from '../context/GoogleContext';
import OrganizationCard from './OrganizationCard';
const containerStyle = {
  width: '1280px',
  height: '720px'
};

const center = {
  lat: 44,
  lng: -80
};

export default function Map() {
  const {
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
    myPosition,
    setMyPosition,
    activeMarker,
    // setActiveMarker,
    activeIndex,
    setActiveIndex,
    showOverlay,
    setShowOverlay,
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

  function centerMarker() {
    let marker = new window.google.maps.Marker({
      position: location.latLng(),
      map: map
    });
    map.setCenter(location.latitude, location.longitude);
  }

  function recenterMap(map) {
    const bounds = new window.google.maps.LatLngBounds();
    bounds.extend(center);
    setMap(map);
  }

  function clearInputs() {
    setOrigin('');
    setDestination('');
    setDistance('');
    setDuration('');
    setDirections('');
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
  function handleMarkerClick(index) {
    setActiveIndex(index);
    setShowOverlay(true);
  }

  function handleSwipe(direction) {
    const newIndex = direction === 'next' ? activeIndex + 1 : activeIndex - 1;
    if (newIndex >= 0 && newIndex < organizations.length) {
      setActiveIndex(newIndex);
      // setActiveMarker(map.markers[newIndex]);
    }
  }

  function handleCloseOverlay() {
    setShowOverlay(false);
  }

  return (
    <div>
      {
        isLoaded ? <GoogleMap
          mapContainerStyle={containerStyle}
          zoom={7}
          center={myPosition}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {
            organizations.map((org, index) => (
              <>
                <Marker onClick={ (e) => handleMarkerClick(index) } key={ org.name } position={ org.position } label={ org.name } />
              </>
            ))
          }
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap> : <>There was an error loading the map!</>
      }
      <input
        type="text"
        value={origin}
        onChange={(e) => setOrigin(e.target.value)}
        placeholder="Origin"
        className="p-2 m-4"
      />

      <input
        type="text"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        placeholder="Destination"
        className="p-2 m-4"
      />

      <button onClick={ clearInputs } className="p-2 m-4" >Clear</button>
      <button onClick={ recenterMap } className="p-2 m-4">Recenter</button>
      <button onClick={ handleRoute } className="p-2 m-4">Route</button>
      {origin && destination && (
        <DirectionsService
          options={{
            destination,
            origin,
            travelMode: 'DRIVING',
          }}
        />
      )}

      <p>{distance && `Distance: ${ distance }`}</p>
      <p>{duration && `Duration: ${ duration }`}</p>
     
    </div>
  );
}
