import React from 'react';
import { useGoogleContext } from '../context/GoogleContext';
import flat from '../assets/flat_logo_pal.svg';
import { FiMapPin, FiSearch } from 'react-icons/fi';

export default function Header() {
  const {
    zip,
    setZip
  } = useGoogleContext();

  return (
    <header 
      className="header min-w-full min-h-fit h-1/3 w-1/4 flex flex-col justify-center"
    >
      <div 
        className="svg-container h-1/3 md:w-1/2 mx-auto relative top-6"
      >
        <img 
          src={ flat } 
          alt="pantry pals logo" 
          className="w-3/5 h-auto mx-auto" 
        />
      </div>
      
      <div 
        className="flex flex-col md:w-1/3 md:mx-auto"
      >
        <label 
          htmlFor="zip" 
          className="flex flex-1 justify-center"
        >
          <input
            id="zip"
            name="zip"
            value={ zip }
            type="text"
            className="w-full px-10 py-4 mx-8 rounded-full text-sm"
            placeholder="Enter address"
            onChange={ e => setZip(e.target.value) }
          />
        </label>
        <button 
          className="location-btn flex text-sm justify-start items-baseline w-5/6 px-2 py-4 mx-auto my-2 rounded-md" 
          onClick={ '#' }
        >
          <div 
            className="mx-2"
          >
            <FiMapPin 
              size={ 14 } 
            />
          </div>
          Use current location
        </button> 
      </div>
    </header>
  );
}
