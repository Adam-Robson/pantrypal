/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useGoogleContext } from '../context/GoogleContext';
import Header from './Header';
import DetailsPage from './DetailsPage';
import Map from './Map';
import useFetchUtils from '../hooks/useFetchUtils';
import useUserLocation from '../hooks/useUserLocation';

export default function Home() {
  const { isDetailsPage } = useGoogleContext();

  const { geoCodeLocation, fetchLocalOrgs, getCityAndState } = useFetchUtils();

  const { populateOrgs } = useUserLocation();

  useEffect(() => {
    populateOrgs();
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
