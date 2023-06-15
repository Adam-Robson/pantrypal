import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div>
      <Link className="menu-link relative right-96 top-10" to='/'>home</Link>
      <h1 className="text-2xl md:text-4xl my-20 subpixel-antialiased">About</h1>
    </div>
  );
}
