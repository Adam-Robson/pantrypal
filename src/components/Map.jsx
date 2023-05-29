/* eslint-disable no-unused-vars */
import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, DirectionsService, DirectionsRenderer, Marker, InfoWindow } from '@react-google-maps/api';
import { useGoogleContext } from '../context/GoogleContext';

const mapContainerStyle = {
  height: '100%',
  width: '100%'
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
    setActiveMarker,
    activeIndex,
    setActiveIndex,
    infoWindow,
    setInfoWindow,
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

  function handleMarkerClick(marker) {
    setActiveMarker(marker);
  }

  function handleCloseInfoWindow() {
    setActiveMarker(null);
  }

  return (
    <div className="h-screen w-screen">
      <div className="h-3/4 w-4/5 mx-auto border-2 border-blue-950">
        {
          isLoaded ? <GoogleMap
            mapContainerClassName="themap"
            mapContainerStyle={ mapContainerStyle }
            zoom={10}
            center={myPosition}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            {
              organizations.map((org) => (
                <Marker 
                  key={ org.name } 
                  position={ org.position }
                  onClick={ (e) => handleMarkerClick(org) }  
                  label={ org.name } 
                >
            
          
          
                  {
                    activeMarker === org && (
                      <InfoWindow
                        anchor={ activeMarker }
                        onCloseClick={ handleCloseInfoWindow }
                      >
                        <div>
                          <h3>{ activeMarker.name }</h3>
                          <p>{ activeMarker.address }</p>
                          <p>{ activeMarker.city }</p>
                          <p>{ activeMarker.state }</p>
                          <p>{ activeMarker.zip_code }</p>
                          <p>{ activeMarker.phone_num }</p>
                          <p>{ activeMarker.desc }</p>
                        </div>
                      </InfoWindow>
                    )}
          
                </Marker>
              ))}

            {
              directions && <DirectionsRenderer directions={directions} />
            }

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
        {
          origin && destination && (
            <DirectionsService
              options={{
                destination,
                origin,
                travelMode: 'DRIVING',
              }}
            />
          )
        }

        <p>{distance && `Distance: ${ distance }`}</p>
        <p>{duration && `Duration: ${ duration }`}</p>
      </div>
    </div>
  );
}
