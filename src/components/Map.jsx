/* eslint-disable no-unused-vars */
import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

import Query from './Query';

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
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  });

  const [map, setMap] = useState(null);
  const [myPosition, setMyPosition] = useState({});
  const [markers, setMarkers] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const onLoad = useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  useEffect(() => {
    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setMyPosition({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });

            // TODO: Get our current location zipcode
            fetchLocalOrgs(94115);
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
  }, []);

  async function geoCodeLocation(orgAddress) {
    let geocoder;
    geocoder = new window.google.maps.Geocoder();

    return await geocoder.geocode({ 'address': orgAddress }, function(results, status) {
      if (status === window.google.maps.GeocoderStatus.OK) {
        return results;
      } else {
        // alert('broke on organization with the address:', orgAddress);
      }
    });
  }

  function setMarker(organization) {
    const newMarker = {
      lat: organization.lat,
      lng: organization.lng,
    };
    setMarkers([...markers, newMarker]);
  }

  async function fetchLocalOrgs(zipcode) {
    const proxyResponse = await fetch('api/organizations/' + zipcode);

    const organizations = await proxyResponse.json();
    console.log(`organizations in zipcode(${zipcode}):`, organizations);

    organizations.forEach((org, i) => {
      geoCodeLocation(org.address).then((response) => {
        org['lat'] = response.results[0].geometry.location.lat();
        org['lng'] = response.results[0].geometry.location.lng();
        setMarker(org);
      });
    });
  }

  function onMapLoad(map) {
    setMap(map);
  }

  function centerMarker() {
    let marker = new window.google.maps.Marker({
      position: location.latLng(),
      icon: './map_marker.png',
      animation: window.google.maps.Animation.DROP,
      map: map
    });
    map.setCenter(location.latitude, location.longitude);
  }

  async function searchPlaces(query) {
    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=` + process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
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

  return (
    <div>
      {
        isLoaded ? <GoogleMap
          mapContainerStyle={containerStyle}
          center={myPosition}
          zoom={7}
          onLoad={onMapLoad}
          onUnmount={onUnmount}
        >
          {/* {position && <Marker position={position} />}

          {/* <Marker position={{ lat: 44, lng: -80 }} /> */}

          {markers.map((marker, index) => (
            <Marker key={index} position={marker} />
          ))}

        </GoogleMap> : <>There was an error loading the map!</>
      }
      <Query />
    </div>
  );
}
