/* eslint-disable no-unused-vars */
import React, { useCallback } from 'react';
import { useGoogleContext } from '../context/GoogleContext';
import { GoogleMap, DirectionsService, DirectionsRenderer, Marker } from '@react-google-maps/api';
import Float from './Float';

/**
 * The map must be generated with a height and a width.
 * The default styling that follows will fill up the space
 * of the containing element.
 */

const mapContainerStyle = {
  height: '100%',
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
    function onLoad(map) {
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend(center);
      setMap(map);
    }, [setMap]);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, [setMap]);

  function setFocus(position) {
    map.setZoom(17);
    map.setCenter(position);
  }

  function setRecenter() {
    map.setCenter(myLatLng);
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

  /**
   * The following functions will be passed down to the Info
   * component, through Float, so that clicking through
   * the list of locations is possible.
   */


  return (
    <div className="h-full">
      <div className="h-3/5 w-3/4 mx-auto">
        {
          isLoaded ? <GoogleMap
            mapContainerClassName="map"
            mapContainerStyle={mapContainerStyle}
            zoom={10}
            center={center}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            {
              organizations.map((org, id) => (
                <Marker
                  key={org.name}
                  position={org.position}
                  onClick={() => {
                    setFocus(org.position);
                    setActiveMarkerId(id);
                  }
                  }
                ></Marker>
              ))
            }
            {
              organizations.length > 0 && <Float />
            }
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
          className="m-2 rounded-md"
        />

        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Destination"
          className="m-2 rounded-md"
        />
        <p>{distance && `Distance: ${distance}`}</p>
        <p>{duration && `Duration: ${duration}`}</p>
        <div className="mx-auto">
          <button onClick={clearInputs} className="p-2 m-4 md:text-xl" >Clear</button>
          <button onClick={setRecenter} className="p-2 m-4 md:text-xl">Center</button>
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
