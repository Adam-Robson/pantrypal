/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useGoogleContext } from '../context/GoogleContext';
import { NavLink } from 'react-router-dom';
import Map from './Map';
import Header from './Header';
export default function Home() {
  const {
    organizations,
    setOrganizations,
    myLatLng,
    setMyLatLng,
    setError,
  } = useGoogleContext();

  async function geoCodeLocation(locationType, location) {
    let geocoder = new window.google.maps.Geocoder();

    const query = {};
    query[locationType] = location;
    return await geocoder.geocode(query, function(result, status) {
      if (status === window.google.maps.GeocoderStatus.OK) {
        return result;
      } else { return; }
    });
  }

  async function fetchLocalOrgs(userLocation) {
    const url = process.env.REACT_APP_FLY_API_URL + '/organizations?' + new URLSearchParams({
      cityName  : userLocation.city,
      stateAbrv : userLocation.state,
    }).toString();

    const apiResponse = await fetch(url);
    const localOrgs = await apiResponse.json();

    const updatedLocalOrgs = [];
    await Promise.all(localOrgs.map(async (org) => {
      await geoCodeLocation('address', org.address).then((response) => {
        org['position'] = {
          'lat': response.results[0].geometry.location.lat(),
          'lng': response.results[0].geometry.location.lng(),
        };
        updatedLocalOrgs.push(org);
      }).catch(error => { return; });
    }));

    setOrganizations(updatedLocalOrgs);
  }

  function getCityAndState(data) {
    const addressComponent = data.results[0].address_components;

    let city, state;
    for (let i = 0; i < addressComponent.length; i++) {
      const addressPortion = addressComponent[i];
      if (addressPortion.types.includes('locality')) {
        city = addressPortion.short_name;
      } else if (addressPortion.types.includes('administrative_area_level_1')) {
        state = addressPortion.short_name;
      }
    }

    return { city, state };
  }

  useEffect(() => {
    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setMyLatLng({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            });

            geoCodeLocation('location', {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }).then((response)=> {
              const usersCurrentLocation = getCityAndState(response);
              fetchLocalOrgs(usersCurrentLocation);
            });
            setError(null);
          },
          (error) => {
            setError(error.message);
          }
        );
      } else {
        setError('Geolocation is not supported by this browser.');
      }
    }
    getLocation();
  }, []);
  return (
    <>
      <Header />
      <Map 
        organizations={ organizations } 
        myPosition={ myLatLng } 
      />
    </>
  );
}
