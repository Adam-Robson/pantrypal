/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useGoogleContext } from '../context/GoogleContext';
import Header from './Header';
import DetailsPage from './DetailsPage';
import Map from './Map';
import useFetchUtils from '../hooks/useFetchUtils';

export default function Home() {
  const {
    isDetailsPage,
    setMyLatLng,
  } = useGoogleContext();

  const { geoCodeLocation, fetchLocalOrgs, getCityAndState } = useFetchUtils();

  useEffect(() => {
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
          }).then((response) => {
            const userLocation = getCityAndState(response);
            fetchLocalOrgs(userLocation);
          });
        }
      );
    }
  }, []);

  return (
    <>
      {
        isDetailsPage ?
          <DetailsPage /> :
          <>
            <Header />
            <Map />
          </>
      }
    </>
  );
}
