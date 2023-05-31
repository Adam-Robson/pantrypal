/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useGoogleContext } from '../context/GoogleContext';
import { NavLink } from 'react-router-dom';
import Map from './Map';
import logo from '../assets/logo.png';

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

  async function fetchLocalOrgs(cityName) {
    const proxyResponse = await fetch('api/organizations/city/' + cityName);
    const localOrgs = await proxyResponse.json();

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
              const currentCity = response.results[0].address_components[2].short_name;

              // console.log('current city', currentCity);
              fetchLocalOrgs(currentCity);
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <header className="min-h-fit w-full mx-auto">
        <div className="flex justify-end m-6">
          <NavLink to='/'>
            <img src={ logo } alt="pantry pals logo" className="h-28 rounded-full"/>
          </NavLink>
        </div>
        <nav className="flex flex-col justify-evenly subpixel-antialiased">
          <div className="flex justify-evenly">
            <NavLink to='/about'>About</NavLink>
            <NavLink to='/contact'>Contact</NavLink>
          </div>
        </nav>
      </header>
      <Map organizations={ organizations } myPosition={ myLatLng } />
    </>
  );
}
