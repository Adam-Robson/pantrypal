import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Map from './Map';

export default function Home() {
  const [error, setError] = useState(null);
  const [myPosition, setMyPosition] = useState({});
  const [organizations, setOrganizations] = useState([]); // { name: 'san fran' }

  async function geoCodeLocation(orgAddress) {
    let geocoder;
    geocoder = new window.google.maps.Geocoder();

    return await geocoder.geocode({ 'address': orgAddress }, function(results, status) {
      if (status === window.google.maps.GeocoderStatus.OK) {
        return results;
      } else {
        // console.log('Geocoder failed on converting an address.');
        return results;
      }
    });
  }

  async function fetchLocalOrgs(cityName) {
    const proxyResponse = await fetch('api/organizations/city/' + cityName);
    const orgData = await proxyResponse.json();

    let orgs = [];
    await Promise.all(orgData.map(async (org) => {
      await geoCodeLocation(org.address).then((response) => {
        org['position'] = {
          'lat': response.results[0].geometry.location.lat(),
          'lng': response.results[0].geometry.location.lng(),
        };
        if (org['position']['lat']) {
          orgs.push(org);
        }
      }).catch(error => { return; });
    }));
    setOrganizations(orgs);
  }

  useEffect(() => {
    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setMyPosition({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });

            fetchLocalOrgs('Richmond');  // TODO: Get our user's current city
            setError(null);
          },
          (error) => {
            setError(error.message);
            // console.error('Error getting geolocation:', error);
          }
        );
      } else {
        setError('Geolocation is not supported by this browser.');
        // console.error('Geolocation is not supported by this browser.');
      }
    }
    getLocation();
  }, []);

  return (
    <>
      <div>
        <h1>P A N T R Y  P A L S</h1>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <NavLink to='/about'>About</NavLink>
        <NavLink to='/contact'>Contact</NavLink>
      </div>

      <Map organizations={organizations} myPosition={myPosition} />
    </>
  );
}
