/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useGoogleContext } from '../context/GoogleContext';
import { NavLink } from 'react-router-dom';
import Map from './Map';
import flat from '../assets/flat_pal_logo.svg';
import Portal from './Portal';
import { FiMapPin } from 'react-icons/fi';
import { FiSearch } from 'react-icons/fi';


export default function Home() {
  const {
    zip, 
    setZip,
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
    const proxyResponse = await fetch(process.env.REACT_APP_FLY_API_URL + '/organizations/city/' + cityName);
    
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
              const currentCity = response.results[0].address_components.filter((obj) => {
                return obj.types.includes('locality');
              })[0].long_name;

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
      <header className="header w-full mx-auto h-56">
        <div className="svg-container flex justify-center w-10/12">
          <img src={ flat } alt="pantry pals logo" className="svg h-40" />
        </div>
        <div className="min-w-xs flex flex-col items-center">
          <label htmlFor="zip" className="w-full mx-auto mt-8 mb-4">
            <input 
              id="zip" 
              name="zip" 
              value={ zip } 
              type="text"
              className="w-11/12 mx-auto text-xs input relative bottom-44 rounded-full p-4"
              placeholder="Enter zip code or address"
              onChange={ e => setZip(e.target.value) } 
            />
          </label>
          <button className="w-11/12 mx-auto text-sm flex items-center p-2 text-left location-btn relative bottom-44 rounded-lg" onClick={ '#' }>
            <div className="m-2 px-2">
              <FiMapPin size={ 20 } />
            </div>
              Use current location
          </button>
        </div>
      </header>
      <Map 
        organizations={ organizations } 
        myPosition={ myLatLng } 
      />
      <Portal />
    </>
  );
}
