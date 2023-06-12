/* eslint-disable no-unused-vars */
import React, { useCallback } from 'react';
import { useGoogleContext } from '../context/GoogleContext';
import FloatCard from './FloatCard';
import { GoogleMap, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import mapStyles from '../assets/styles/map';
import Markers from './Markers';
import useMarkerClick from '../hooks/useMarkerClick';
import useRecenterMap from '../hooks/useRecenterMap';
/**
 * The map must be generated with a height and a width.
 * The default styling that follows will fill up the space
 * of the containing element.
 */

const mapContainerStyle = {
  height: '75%',
  width: '100%'
};

const center = {
  lat: 37.773972,
  lng: -122.431297
};

/**
 * The map is fed the props from the Home component that
 * carry all of the location information (In organizations
 * and the geolocated position of the user.
 */

export default function Map() {
  const { recenterMap } = useRecenterMap();
  const {
    map,
    setMap,
    organizations,
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
    myLatLng,
    setActiveMarkerId,
    isLoaded,
  } = useGoogleContext();

  const onLoad = useCallback(
    function onLoad() {
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend(center);
      setMap(map);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setMap]);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, [setMap]);

  

  // function markerClick(org, id){
  //   setFocus(org.position);
  //   setActiveMarkerId(id);
  // }

  // function setFocus(position) {
  //   map.setZoom(17);
  //   recenterMap(position);
  // }

  // function recenterMap(position) {
  //   map.setCenter(position);
  // }

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
      }, (response, status) => {
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

  function handleCloseInfoWindow() {
    setActiveMarkerId(null);
  }

  return (
    <div className="h-full">
      <div className="h-full w-full mx-auto">
        {
          isLoaded ? <GoogleMap
            mapContainerClassName="map"
            mapContainerStyle={mapContainerStyle}
            zoom={12}
            options={{ styles: mapStyles }}
            center={myLatLng}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >

            <Markers organizations={ organizations } map={ map }/>

            {/* Show active card for selected organization */}
            { organizations.length > 0 && <FloatCard />}

            {
              directions && <DirectionsRenderer directions={directions} />
            }
          </GoogleMap> : <>There was an error loading the map!</>
        }

        <input
          value={ origin }
          onChange={ (e) => setOrigin(e.target.value) }
          placeholder="Origin"
          className="m-4 py-2 px-6 rounded-md text-lg"
        />
       
        <input
          value={ destination }
          onChange={ (e) => setDestination(e.target.value) }
          placeholder="Destination"
          className="m-4 py-2 px-6 rounded-md text-lg"
        />

        <p>{ distance && `Distance: ${distance}` }</p>
        <p>{ duration && `Duration: ${duration}` }</p>
        
        <div className="mx-auto">
          <button onClick={clearInputs} className="p-2 m-4 md:text-xl" >Clear</button>
          <button onClick={ () => recenterMap(myLatLng) } className="p-2 m-4 md:text-xl">Center</button>
          <button onClick={handleRoute} className="p-2 m-4 md:text-xl">Route</button>
        </div>
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
      </div>
    </div>
  );
}
