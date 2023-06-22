import React from 'react';
import { Link } from 'react-router-dom';
import robert from '../assets/images/robert.png';
import george from '../assets/images/george.png';
import adam from '../assets/images/adam.png';
import joel from '../assets/images/joel.png';

export default function About() {
  return (
    <section className="h-full w-full">
      <Link className="menu-link text-sm md:text-lg font-semibold absolute right-10 top-4" to='/'>home</Link>
      <p className="about text-4xl sm:text-5xl my-12 md:my-20 subpixel-antialiased">About</p>
      <article className="flex flex-col sm:flex-row justify-start sm:justify-evenly items-center sm:items-center">
        <div className="">
          <Link to="">
            <img className="h-40 rounded-full" src={ robert } alt="image of robert adkins" />
          </Link>
          <h2 className="subpixel-antialiased">Robert Adkins</h2>
        </div>
        <div>
          <Link to="https://github.com/GeorgeCloud">
            <img className="h-40 rounded-full" src={ george } alt="image of george ceja" />
          </Link>
          <h2>George Ceja</h2>
        </div>
        <div>
          <Link to="https://github.com/Adam-Robson">
            <img className="h-40 rounded-full" src={ adam } alt="image of adam robson" />
          </Link>
          <h2>Adam Robson</h2>
        </div>
        <div>
          <Link to="">
            <img className="h-40 rounded-full" src={ joel } alt="image of joel yap" />
          </Link>
          <h2>Joel Yap</h2>
        </div>
      </article>
    </section>
  );
}
