import React, { useState } from 'react';
import logo from '../assets/logo.png';

export default function Modale({ onClose }) {

  const [currentPage, setCurrentPage] = useState(0);
  const pages = [
    <Page1 key={ Page1 }/>,
    <Page2 key={ Page2 } />,
    <Page3 key={ Page3 }/>,
    // Add more page components here
  ];

  function nextPage() {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  }

  function previousPage() {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  }

  return (
   
    <div className="modal h-full w-full">
      <img src={ logo } alt="logo" />
      { pages[currentPage] }
      <div className="modal-actions">
        <button className="prenext previous round" onClick={ previousPage } disabled={ currentPage === 0 }>
            Previous
        </button>
        <button className="prenext next round" onClick={ nextPage } disabled={ currentPage === pages.length - 1 }>
            Next
        </button>
      </div>
      <button onClick={ onClose }>Skip tour</button>
    </div>
  );
}

function Page1() {
  return (
    <div className="h-1/3 flex flex-col justify-around">
      <h2 className="text-2xl text-black font-semibold">Welcome!</h2>
      <p className="mx-8 text-black">Find free or affordable food options in your area so you can fully concentrate on your education.</p>
    </div>
  );
}

function Page2() {
  return (
    <div className="h-1/3 flex flex-col justify-around">
      <h2 className="text-2xl font-semibold text-black">First things First</h2>;
      <p className="mx-8 text-black">To find food pantries in your local area, please enable location sharing services.</p>
    </div>
  );
}

function Page3() {
  return (
    <div className="h-1/3 flex flex-col justify-around">
      <h2 className="text-2xl font-semibold text-black">How it Works</h2>
      <p className="mx-8 text-black">Find your location, view pantry details, and choose the right one for your needs.</p>
    </div>
  );
}
