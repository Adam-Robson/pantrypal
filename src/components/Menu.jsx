import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import Portal from './Portal';
import MenuList from './MenuList';
import '../styles/menu.css';

import { useGoogleContext } from '../context/GoogleContext';

export default function Menu() {
  const { isOpen, setIsOpen } = useGoogleContext();
  const [textVisible, setTextVisible] = useState(false);

  function toggleMenu() {
    setIsOpen(!isOpen);
    setTextVisible(!textVisible);
  }

  return (
    <>
      <section className="container w-screen p-2">
        <button className="absolute top-4 right-4" onClick={toggleMenu}>
          <FiMenu size={24} className={ textVisible ? 'rotated' : '' } />
        </button>
        <MenuList textVisible={textVisible}/>
      </section>
      <div className="portal h-full w-full">
        <Portal />
      </div>
    </>
  );
}
