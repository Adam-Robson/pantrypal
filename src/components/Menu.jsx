import React from 'react';
import { Link } from 'react-router-dom';
import { FiX, FiMenu } from 'react-icons/fi';
import Portal from './Portal';
import './stylesheets/menu.css';

import { useGoogleContext } from '../context/GoogleContext';

export default function Menu() {
  const { isOpen, setIsOpen } = useGoogleContext();

  return (
    <>
      <section className="w-screen p-2">
        {
          isOpen ?
            <>
              <button 
                className="x-icon absolute top-0 right-0 cursor-pointer"
                onClick={ () => setIsOpen(false) }
              >
                <FiX size={ 20 } />
              </button>
              <ul className="flex justify-around items-start">
                <li className="text-sm md:text-lg subpixel-antialiased">
                  <Link className="menu-link" to="/tutorial">tutorial</Link>
                </li>
                <li className="text-sm md:text-lg subpixel-antialiased">
                  <Link className="menu-link" to="/resources">resources</Link>
                </li>
                <li className="text-sm md:text-lg subpixel-antialiased">
                  <Link className="menu-link" to="/about">about</Link>
                </li>
              </ul>
            </>
            :
            <button
              className="menu-link cursor-pointer"
              onClick={ () => setIsOpen(true) }
            >
              <FiMenu className="menu-link absolute top-0 right-2" size={ 24 } />
            </button>
        }
      </section>
      <div className="portal h-full w-full">
        <Portal />
      </div>
    </>
  );
}
