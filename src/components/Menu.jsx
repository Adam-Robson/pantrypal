import React from 'react';
import { Link } from 'react-router-dom';
import { FiX } from 'react-icons/fi';
import Portal from './Portal';
import './stylesheets/menu.css';

export default function Menu({ isOpen, setIsOpen }) {

  return (
    <>
      <section className="menu w-screen p-2">
        { isOpen ? <button 
          className="x-icon absolute top-0 right-0 cursor-pointer" 
          onClick={ () => setIsOpen(false) 
          }
        >
          <FiX size={ 20 } className="x-icon" />
        </button> : null
        }
        <ul className="floating-in flex justify-evenly w-full">
          <li className="text-sm md:text-lg subpixel-antialiased">
            <Link className="menu-link" to="/about">About</Link>
          </li>
          <li className="text-sm md:text-lg subpixel-antialiased">
            <Link className="menu-link" to="/resources">Resources</Link>
          </li>
          <li className="text-sm md:text-lg subpixel-antialiased">
            <Link className="menu-link" to="/tutorial">
                Tutorial
            </Link>
          </li>
        </ul>
        <div className="portal h-full w-full">
          <Portal />
        </div>
      </section>
    </>
  );
}
