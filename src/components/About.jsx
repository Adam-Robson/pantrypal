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
      <p className="about text-4xl sm:text-5xl my-10 md:my-20 subpixel-antialiased">About</p>
      <article className="flex flex-col sm:flex-row justify-start sm:justify-evenly items-center sm:items-center">
        <Link className="animate__fadeIn p-2" to="https://www.linkedin.com/in/robertladkins/">
          <img className="h-40 rounded-full" src={ robert } alt="image of robert adkins" />
        
          <label className="label text-2xl subpixel-antialiased">Robert Adkins</label>
        </Link>
        <Link className="animate__fadeIn p-2" to="https://www.linkedin.com/in/george-ceja/">
          <img className="img_ h-40 rounded-full" src={ george } alt="image of george ceja" />
        
          <label className="label text-2xl subpixel-antialiased">George Ceja</label>
        </Link>
        <Link className="animate__fadeIn p-2" to="https://www.linkedin.com/in/adamrayrobson/">
          <img className="img_ h-40 rounded-full" src={ adam } alt="image of adam robson" />
          <label className="label text-2xl subpixel-antialiased">Adam Robson</label>
        </Link>
        <Link className="animate__fadeIn p-2" to="https://www.linkedin.com/in/yapjoel/">
          <img className="img_ h-40 rounded-full" src={ joel } alt="image of joel yap" />
          <label className="label text-2xl subpixel-antialiased">Joel Yap</label>
        </Link>
      </article>
    </section>
  );
}
