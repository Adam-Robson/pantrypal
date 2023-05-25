import React from 'react';
import Map from './Map';
import { NavLink } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <div>
        <h1>P A N T R Y  P A L S</h1>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <NavLink to='/about'>About</NavLink>
        <NavLink to='/contact'>Contact</NavLink>
      </div>
      <Map />
    </>
  );
}
