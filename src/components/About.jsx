import React from 'react';
import { Link } from 'react-router-dom';
import robert from '../assets/images/robert.png';
import george from '../assets/images/george.png';
import adam from '../assets/images/adam.png';

export default function About() {
  return (
    <section>
      <Link className="menu-link relative right-96 top-10" to='/'>home</Link>
      <h1 className="text-2xl md:text-4xl my-20 subpixel-antialiased">About</h1>
      <article className="flex justify-around">
        <Link to="">
          <img className="h-40 rounded-full" src={ robert } alt="image of robert adkins" />
        </Link>
        <Link to="">
          <img className="h-40 rounded-full" src={ george } alt="image of george ceja" />
        </Link>
        <Link to="">
          <img className="h-40 rounded-full" src={ adam } alt="image of adam robson" />
        </Link>
        <Link>
      Joel Yap
        </Link>
      </article>
    </section>
  );
}
