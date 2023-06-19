import React from 'react';
import { Link } from 'react-router-dom';
import { FiX } from 'react-icons/fi';

export default function Menu({ isOpen, setIsOpen }) {

  return (
    <>
      <section className="menu w-screen p-2">
        { isOpen ? <button 
          className="x-icon absolute top-0 right-0 cursor-pointer" 
          onClick={ () => setIsOpen(false) 
          }
        >
          <FiX size={ 24 } className="x-icon" />
        </button> : null
        }
        <ul className="floating-in flex justify-evenly w-full">
          <li className="text-lg subpixel-antialiased">
            <Link className="menu-link" to="/about">About</Link>
          </li>
          <li className="text-lg subpixel-antialiased">
            <Link className="menu-link" to="/resources">Resources</Link>
          </li>
          <li className="text-lg subpixel-antialiased">
            <Link className="menu-link" to="/contact">Contact</Link>
          </li>
        </ul>
      </section>
    </>
  );
}
