import React from 'react';
import { useGoogleMapsContext } from '../context/GoogleContext';
import { useCurrentLocation } from '../hooks/useCurrentLocation';
import {
  GoogleMap,
  DirectionsService,
  DirectionsRenderer,
  Autocomplete,
  Marker
} from '@react-google-maps/api';


export default function Map() {
  const {
    map,
    setMap,
    directions,
    setDirections,
    origin,
    setOrigin,
    destination,
    setDestination,
    distance,
    setDistance,
    duration,
    setDuration,
    center,
    isLoaded: isScriptLoaded

  } = useGoogleMapsContext();

  /* the following hook is for bringing in geolocation */
  useCurrentLocation();

  function handleMapLoad(map) {
    setMap(map);
  }

  function handleDirectionsService(response) {
    setDirections(response);
  }

  function handleDirectionsError(error) {
    console.error('Error fetching directions:', error);
  }

  function clearInputs() {
    setOrigin('');
    setDestination('');
  }

  function recenterMap() {
    if (map) {
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend(new window.google.maps.LatLng(center));
      map.fitBounds(bounds);
    }
  }
 
  /* handleRoute() services any route request */
  function handleRoute() {
    if (origin && destination && map) {
      const directionsService = new window.google.maps.DirectionsService();
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

  /**  TODO: Need to build out a better loader */
  if (!isScriptLoaded) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <section className="min-w-screen mx-auto" style={ { height: '100vh', width: '100vw' } } >
        <div className="mx-auto" style={ { height: '75%', width: '75%' } }>
          <GoogleMap
            mapContainerStyle={ { height: '100%', width: '100%', border: '5px solid var(--atomic-tangerine)' } }
            zoom={ 10 }
            center={ center }
            onLoad={ handleMapLoad }
            className="w-full mx-auto"
          >
            <Marker position={ center } />
            { directions && <DirectionsRenderer directions={ directions } /> }
          </GoogleMap>
        </div>
        <Autocomplete>
          <input
            type="text"
            value={ origin }
            onChange={ (e) => setOrigin(e.target.value) }
            placeholder="Origin"
            className="p-2 m-4"
          />
        </Autocomplete>

        <Autocomplete>
          <input
            type="text"
            value={ destination }
            onChange={ (e) => setDestination(e.target.value) }
            placeholder="Destination"
            className="p-2 m-4"
          />
        </Autocomplete>

             
        <button onClick={ clearInputs } className="p-2 m-4" >Clear</button>
        <button onClick={ recenterMap } className="p-2 m-4">Recenter</button>
        <button onClick={ handleRoute } className="p-2 m-4">Route</button>

        <DirectionsService
          options={ {
            origin,
            destination,
            travelMode: 'DRIVING',
          } }
          callback={ () => handleDirectionsService }
          onError={ () => handleDirectionsError }
        />
        <p>{ distance && `Distance: ${distance}` }</p>
        <p>{ duration && `Duration: ${duration}` }</p>
      </section>
    </>
  );
}