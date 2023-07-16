import React from 'react';
import { Link } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import Portal from './Portal';
import '../styles/menu.css';

import { useGoogleContext } from '../context/GoogleContext';

export default function Menu() {
  const { isOpen, setIsOpen } = useGoogleContext();

  return (
    <>
      <section className="container w-screen p-2">
        {
          isOpen ?
            <>
              <button 
                className="icon absolute top-4 right-4"
                onClick={ () => setIsOpen(false) }
              >
                <FiMenu size={ 24 } className={ ({ rotated }) => rotated ? 'rotated' : ''
                } />
              </button>
              <ul className="w-full floating-in flex justify-around">
                <li className="text-sm md:text-lg subpixel-antialiased">
                  <Link className="menu-link subpixel-antialiased" to="/tutorial">tutorial</Link>
                </li>
                <li className="text-sm md:text-lg subpixel-antialiased">
                  <Link className="menu-link subpixel-antialiased" to="/resources">resources</Link>
                </li>
                <li className="text-sm md:text-lg subpixel-antialiased">
                  <Link className="menu-link subpixel-antialiased" to="/about">about</Link>
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
