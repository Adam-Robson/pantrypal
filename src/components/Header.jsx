import React from 'react';
import { useGoogleContext } from '../context/GoogleContext';
import flat from '../assets/logo/flat_logo.svg';
import { FiMenu, FiSearch } from 'react-icons/fi';
import { LuLocate } from 'react-icons/lu';
import Portal from './Portal';
import Menu from './Menu';
import useFetchUtils from '../hooks/useFetchUtils';
import Autocomplete from 'react-google-autocomplete';




export default function Header() {
  const { isOpen, setIsOpen, search, setSearch } = useGoogleContext();
  const { geoCodeLocation, fetchLocalOrgs, getCityAndState } = useFetchUtils();


  function handleSearch(){
    geoCodeLocation('address', search)
      .then((response) => {
        const userLocation = getCityAndState(response);
        fetchLocalOrgs(userLocation);
      });
  }

  function onPlaceSelected(place) {
    setSearch(place);
  }

  return (
    <>
      <header
        className="header min-w-full min-h-fit h-1/4 flex flex-col justify-evenly items-center mx-auto p-4"
      >
        <div className="hamburger absolute top-4 right-4 md:absolute md:top-8 md:right-8">
          {
            isOpen ?
              <Menu isOpen={ isOpen } setIsOpen={ setIsOpen } />
              :
              <button 
                className="hamburger cursor-pointer" 
                onClick={ () => setIsOpen(true) } 
              >
                <FiMenu className="hamburger" size={24} />
              </button>
          }
        </div>
        <div className="max-w-sm mx-auto md:max-w-md">
          <img
            src={flat}
            alt="pantry pals logo"
            className="aspect-auto mx-auto max-w-xs mt-4 md:max-w-md"
          />
          <div
            className="w-full flex justify-evenly relative top-4"
          >
           
            <Autocomplete
              style={ {
                height: '2.5em',
              } }
              onPlaceSelected={ onPlaceSelected }
              types={ ['(regions)'] }
              className="search p-4 m-2 w-1/2"
              placeholder="enter address"
            />
            {/* <input
                id="search"
                name="search"
                value={ search }
                type="text"
                className="search rounded-md w-72 h-14 pl-10 mr-2"
                placeholder="Enter address"
                onChange={ (e) => setSearch(e.target.value) }
              /></Autocomplete> */}
            <button
              className="location-btn rounded-md w-14 h-14 flex justify-center items-center"
              onClick={ handleSearch }
            >
              <div><FiSearch size={ 22 } /></div>
            </button>

            <button
              className="location-btn rounded-md w-14 h-14 flex justify-center items-center">
              <div><LuLocate size={22} /></div>
            </button>
          </div>
          <Portal />
        </div>
      </header>
    </>
  );
}

