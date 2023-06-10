import React, { useState } from 'react';
import logo from '../assets/stack_logo_pal.svg';
import { FiX } from 'react-icons/fi';

export default function Modale({ onClose }) {

  const [currentPage, setCurrentPage] = useState(0);
  const pages = [
    <Page1 key={ Page1 }/>,
    <Page2 key={ Page2 } />,
    <Page3 key={ Page3 }/>,
    // Add more page components here
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
      <div className="modal absolute top-0 left-0 w-full mx-auto my-0 flex flex-col justify-around items-center">
        <div className="absolute right-0 top-0" onClick={ onClose }>
          <FiX size={ 22 } />
        </div>
        <img src={ logo } alt="logo" className="w-3/5 md:w-2/5 max-w-sm h-auto" />
        { pages[currentPage] }
        <div className="modal-actions">
          <button className="rounded-full p-2 md:p-4 mx-6 md:mx-12" onClick={ pageOne }></button>
          <button className="rounded-full p-2 md:p-4 mx-6 md:mx-12" onClick={ pageTwo }></button>
          <button className="rounded-full p-2 md:p-4 mx-6 md:mx-12" onClick={ pageThree }></button>
        </div>
      </div>
    </>
  );
}

function Page1() {
  return (
    <div className="h-1/3">      
      <h2 className="text-2xl text-black font-semibold mt-20 mb-20">Welcome!</h2>
      <p className="mx-20 text-black">Find free food options in your area so you can concentrate on your education.</p>
    </div>
  );
}

function Page2() {
  return (
    <div className="h-1/3">
      <h2 className="text-2xl text-black font-semibold mt-20 mb-20">First things First</h2>
      <p className="mx-20 text-black">To find food pantries in your local area, please enable location sharing services.</p>
    </div>
  );
}

function Page3() {
  return (
    <div className="h-1/3">
      <h2 className="text-2xl text-black font-semibold mt-20 mb-20">How it Works</h2>
      <p className="mx-20 text-black">Find your location, view pantry details, and choose the right one for your needs.</p>
    </div>
  );
}
