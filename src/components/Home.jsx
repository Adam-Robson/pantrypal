/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useGoogleContext } from '../context/GoogleContext';
import { NavLink } from 'react-router-dom';
import Map from './Map';

export default function Home() {
  const {
    organizations,
    setOrganizations,
    myPosition,
    setMyPosition,
    setError,
  } = useGoogleContext();

  // const [error, setError] = useState(null);
  // const [myPosition, setMyPosition] = useState({});
  // const [organizations, setOrganizations] = useState([]); // { name: 'san fran' }

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

            // TODO: Get our user's current city
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
