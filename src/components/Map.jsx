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
      <section className="map-container-map-component">
        <div style={ { height: '50vh', width: '50vw' } }>
          
          <GoogleMap
            mapContainerStyle={ { height: '100%', width: '100%' } }
            zoom={ 10 }
            center={ center }
            onLoad={ handleMapLoad }
          >
            <Marker position={ center } />
            { directions && <DirectionsRenderer directions={ directions } /> }
          </GoogleMap>
         
          <Autocomplete>
            <input
              type="text"
              value={ origin }
              onChange={ (e) => setOrigin(e.target.value) }
              placeholder="Origin"
            />
          </Autocomplete>

          <Autocomplete>
            <input
              type="text"
              value={ destination }
              onChange={ (e) => setDestination(e.target.value) }
              placeholder="Destination"
            />
          </Autocomplete>

          <button onClick={ clearInputs }>Clear</button>
          <button onClick={ recenterMap }>Recenter</button>
          <button onClick={ handleRoute }>Route</button>

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
        </div>
      </section>
    </>
  );
}