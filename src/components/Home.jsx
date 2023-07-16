/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useGoogleContext } from '../context/GoogleContext';
import Header from './Header';
import DetailsPage from './DetailsPage';
import Map from './Map';
import Loader from './Loader';
import useUserLocation from '../hooks/useUserLocation';

export default function Home() {
  const { isDetailsPage, loader, setLoader } = useGoogleContext();

  const { populateOrgs } = useUserLocation();

  useEffect(() => {
    populateOrgs();
    setLoader(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>{
      loader ?
        <Loader /> : 
        isDetailsPage ?
          <DetailsPage /> :
          <>
            <Header />
            <Map />
          </>
    }</>
  );
}
