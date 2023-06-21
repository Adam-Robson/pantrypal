import React from 'react';
import { useGoogleContext } from '../context/GoogleContext';
import flat from '../assets/logo/flat_logo.svg';
import { FiSearch, FiMenu } from 'react-icons/fi';
import useFetchUtils from '../hooks/useFetchUtils';
import Autocomplete from 'react-google-autocomplete';
import Menu from './Menu';
import './stylesheets/header.css';
import useMapUtils from '../hooks/useMapUtils'; 

export default function Header() {
  const { isOpen, setIsOpen, search, setSearch, setActiveMarkerId, setOrganizations } = useGoogleContext();
  const { geoCodeLocation, fetchLocalOrgs, getCityAndState } = useFetchUtils();
  const { recenterMap } = useMapUtils();

  function handleSearch() {
    setActiveMarkerId(null);
    setOrganizations([]);
    geoCodeLocation('address', search.formatted_address)
      .then((response) => {
        recenterMap({ lat: search.geometry.location.lat(), lng: search.geometry.location.lng() });
        const userLocation = getCityAndState(response);
        fetchLocalOrgs(userLocation);
      });
  }

  function onPlaceSelected(place) {
    setSearch(place);
  }

  return (
    <>
      <header className="header w-full min-h-fit h-52 flex flex-col justify-around items-center mx-auto p-4">
        {
          isOpen ?
            <Menu isOpen={ isOpen } setIsOpen={ setIsOpen } />
            :
            <button
              className="x-icon absolute top-4 right-4"
              onClick={ () => setIsOpen(true) }
            >
              <FiMenu size={ 24 } />
            </button>
        }
        <section className="min-w-full mx-auto fixed flex flex-col items-center">
          <img
            src={ flat }
            alt="pantry pals logo"
            className="max-w-xs sm:max-w-sm w-full m-4 sm:m-6"
          />
          <div className="w-5/6 min-h-fit flex justify-around">
            <Autocomplete
              apiKey={ process.env.REACT_APP_GOOGLE_MAPS_API_KEY }
              onPlaceSelected={ onPlaceSelected }
              types={ ['(cities)'] }
              className="search p-2 w-1/2"
              placeholder="enter city"
            />

            <button
              className="location-btn rounded-md w-10 h-10 flex justify-center items-center"
              onClick={ handleSearch }
            >
              <div><FiSearch size={ 20 } /></div>
            </button>
          </div>
        </section>
      </header>
    </>
  );
}

