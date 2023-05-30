/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useGoogleContext } from '../context/GoogleContext';
import { NavLink } from 'react-router-dom';
import Map from './Map';
import logo from '../assets/logo.png';
export default function Home() {
  const {
    organizations,
    setOrganizations,
    myPosition,
    setMyPosition,
    setError,
  } = useGoogleContext();

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

            // TODO: Get our user's current city (thought: we started with it above when we loop through the organizations list);
            fetchLocalOrgs('San Francisco');
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
      <Map organizations={ organizations } myPosition={ myPosition } />
    </>
  );
}
