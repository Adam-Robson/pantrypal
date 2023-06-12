import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo/stacked_logo.svg';
import { FiX } from 'react-icons/fi';
import page1 from '../assets/images/icons/icon1.png';
import page2 from '../assets/images/icons/icon2.png';
import page3 from '../assets/images/icons/icon3.png';

export default function Tutorial() {

  let navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(0);
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
      <section className="tutorial h-screen flex flex-col justify-evenly">
        <div className="cursor-pointer absolute right-0 top-0 m-4" onClick={ () => navigate('/') }>
          <FiX size={ 22 } />
        </div>
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
    <div className="h-1/3">
      <img className="max-w-xs max-h-40 mx-auto" src={ page1 } alt="icon" />

      <h2 className="text-2xl text-black font-semibold mt-4 mb-8">Welcome!</h2>
      <p className="mx-20 text-black">Find free food options in your area so you can concentrate on your education.</p>
    </div>
  );
}

function Page2() {
  return (
    <div className="h-1/3">
      <img className="max-w-xs max-h-40 mx-auto" src={ page2 } alt="icon" />
      <h2 className="text-2xl text-black font-semibold mt-4 mb-8">First things First</h2>
      <p className="mx-20 text-black">To find food pantries in your local area, please enable location sharing services.</p>
    </div>
  );
}

function Page3() {
  return (
    <div className="h-1/3">
      <img className="max-w-xs max-h-40 mx-auto" src={ page3 } alt="icon" />

      <h2 className="text-2xl text-black font-semibold mt-4 mb-8">How it Works</h2>

      <p className="mx-20 text-black">Find your location, view pantry details, and choose the right one for your needs.</p>
    </div>
  );
}
