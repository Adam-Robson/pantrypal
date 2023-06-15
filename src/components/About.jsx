import React from 'react';
import { Link } from 'react-router-dom';
import robert from '../assets/images/robert.png';
import george from '../assets/images/george.png';
import adam from '../assets/images/adam.png';
import joel from '../assets/images/joel.png';
export default function About() {
  return (
    <section className="w-3/4 mx-auto">
      <Link className="menu-link absolute top-6 left-8" to='/'>home</Link>
      <h1 className="text-2xl md:text-4xl my-20 subpixel-antialiased">About</h1>
      <article className="flex justify-around">
        <div>
          <Link to="">
            <img className="h-60 rounded-full" src={ robert } alt="image of robert adkins" />
          </Link>
          <h2 className="subpixel-antialiased">Robert Adkins</h2>
        </div>
        <div>
          <Link to="">
            <img className="h-60 rounded-full" src={ george } alt="image of george ceja" />
          </Link>
          <h2>George Ceja</h2>
        </div>
        <div>
          <Link to="">
            <img className="h-60 rounded-full" src={ adam } alt="image of adam robson" />
          </Link>
          <h2>Adam Robson</h2>
        </div>
        <div>
          <Link to="">
            <img className="h-60 rounded-full" src={ joel } alt="image of joel yap" />
          </Link>
          <h2>Joel Yap</h2>
        </div>
      </article>
    </section>
  );
}
