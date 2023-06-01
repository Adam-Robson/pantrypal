import React from 'react';
import logo from '../assets/logo.png';

export default function Modal({ onClose }) {
  return (
    <section className="modal h-full w-full">
      <img src={ logo } alt="logo" />
      <h2 className="text-2xl font-semibold">Welcome!</h2>
      <p className="mx-8">Find free or affordable food options in your area so you can fully concentrate on your education.</p>
      <div>
        <a href="#" className="prenext previous round">&#8249;</a>
        <a href="#" className="prenext next round">&#8250;</a>
      </div>
      <button onClick={ onClose }>Skip tour</button>
    </section>
  );
}

