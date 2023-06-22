import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoogleContext } from '../context/GoogleContext';
import logo from '../assets/logo/stacked_logo.svg';
import { FiX } from 'react-icons/fi';
import page1 from '../assets/images/icons/tut_1.png';
import page2 from '../assets/images/icons/tut_2.png';
import page3 from '../assets/images/icons/tut_3.png';
import './stylesheets/tutorial.css';

export default function Tutorial() {

  let navigate = useNavigate();

  const { currentPage, setCurrentPage } = useGoogleContext();
  const pages = [
    <Page1 key={ Page1 } />,
    <Page2 key={ Page2 } />,
    <Page3 key={ Page3 } />,
  ];
 
  function pageOne() {
    if (currentPage !== 0) {
      setCurrentPage(0);
    }
  }
  function pageTwo() {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  }
  function pageThree() {
    if (currentPage !== 2) {
      setCurrentPage(2);
    }
  }

  return (
    <>
      <section className="tutorial max-h-screen h-full max-w-md mx-auto flex flex-col justify-evenly">
        <button className="cursor-pointer absolute top-4 right-10 sm:right-40 md:right-52" onClick={ () => navigate('/') }>
          <FiX size={ 22 } />
        </button>
        <img src={ logo } alt="logo" className="mx-auto max-w-xs" />
        { pages[currentPage] }
        <div className="">
          <button className="tutorial-btn rounded-full p-2 md:p-4 mx-6 md:mx-12" onClick={ pageOne }></button>
          <button className="tutorial-btn rounded-full p-2 md:p-4 mx-6 md:mx-12" onClick={ pageTwo }></button>
          <button className="tutorial-btn rounded-full p-2 md:p-4 mx-6 md:mx-12" onClick={ pageThree }></button>
        </div>
        
      </section>
    </>
  );
}

function Page1() {
  return (
    <section className="h-1/3">
      <img className="max-w-xs max-h-40 mx-auto" src={ page1 } alt="icon" />
      <h2 className="text-2xl text-black font-semibold mt-4 mb-8 subpixel-antialiased">Welcome!</h2>
      <p className="mx-20 text-black subpixel-antialiased">Find free food options in your area so you can concentrate on your education.</p>
    </section>
  );
}

function Page2() {
  return (
    <section className="h-1/3">
      <img className="max-w-xs max-h-40 mx-auto" src={ page2 } alt="icon" />
      <h2 className="text-2xl text-black font-semibold mt-4 mb-8 subpixel-antialiased">First things First</h2>
      <p className="mx-20 text-black subpixel-antialiased">To find food pantries in your local area, please enable location sharing services.</p>
    </section>
  );
}

function Page3() {
  return (
    <section className="h-1/3">
      <img className="max-w-xs max-h-40 mx-auto" src={ page3 } alt="icon" />
      <h2 className="text-2xl text-black font-semibold mt-4 mb- subpixel-antialiased">How it Works</h2>
      <p className="mx-20 text-black subpixel-antialiased">Find your location, view pantry details, and choose the right one for your needs.</p>
    </section>
  );
}
