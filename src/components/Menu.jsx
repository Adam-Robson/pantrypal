import React from 'react';
import { Link } from 'react-router-dom';
import { FiX } from 'react-icons/fi';
import { useGoogleContext } from '../context/GoogleContext';

export default function Menu() {

  const { setIsOpen } = useGoogleContext();

  return (
    <>
      <div className="menu w-screen p-2">
        <div className="absolute top-0 right-0">
          <button className="cursor-pointer" onClick={ () => setIsOpen(false) }>
            <div><FiX /></div>
          </button>
        </div>
        <ul className="floating-in flex justify-evenly w-full">
          <li className="text-lg subpixel-antialiased">
            <Link to="/about">About</Link>
          </li>
          <li className="text-lg subpixel-antialiased">
            <Link to="/resources">Resources</Link>
          </li>
          <li className="text-lg subpixel-antialiased">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </div>
    </>
  );
}
