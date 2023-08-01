import React from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { useGoogleContext } from '../context/GoogleContext';
import flat from '../assets/logo/flat_logo.svg';
import { FiSearch, FiMenu } from 'react-icons/fi';
import useFetchUtils from '../hooks/useFetchUtils';
import Menu from './Menu';
import '../styles/header.css';
import useMapUtils from '../hooks/useMapUtils';

export default function Header() {
  const { isOpen, setIsOpen, search, setSearch, setActiveMarkerId, setOrganizations, isLoaded } = useGoogleContext();
  const { geoCodeLocation, fetchLocalOrgs, getCityAndState } = useFetchUtils();
  const { recenterMap } = useMapUtils();

  async function handleSearch() {
    setActiveMarkerId(null);
    setOrganizations([]);
    const response = await geoCodeLocation('address', search.formatted_address);
    recenterMap({ lat: search.geometry.location.lat(), lng: search.geometry.location.lng() });
    const userLocation = getCityAndState(response);
    await fetchLocalOrgs(userLocation);
  }

  function onPlaceSelected(place) {
    setSearch(place);
  }

  return (
    <>
      <header className="container h-1/3 header max-w-full flex flex-col justify-center items-center">
        {
          isOpen ?
            <Menu isOpen={isOpen} setIsOpen={setIsOpen} />
            :
            <button
              className="icon absolute top-4 right-4"
              onClick={() => setIsOpen(true)}
            >
              <FiMenu size={22} />
            </button>
        }
        <section className="container fixed flex flex-col items-center p-2">
          
          <img
            src={flat}
            alt="pantry pals logo"
            className="max-w-sm w-72 sm:w-80 md:w-96 m-2"
          />
          <div className="container flex justify-center">{
            isLoaded && <>
              <Autocomplete
                onPlaceSelected={onPlaceSelected}
                types={['(cities)']}
              >
                <input
                  className="search mx-6 p-2"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)} 
                  autoComplete='on'
                  placeholder="Enter city"
                />
              </Autocomplete>
              <button
                className="location-btn rounded-md w-10 h-10 flex justify-center items-center"
                onClick={handleSearch}
              >
                <FiSearch size={20} />
              </button>
            </>
          }
          </div>
        </section>
      </header>
    </>
  );
}
