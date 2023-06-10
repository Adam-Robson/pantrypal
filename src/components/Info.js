import React from 'react';
import { Link } from 'react-router-dom';
import { useGoogleContext } from '../context/GoogleContext';
import { useSwipeable } from 'react-swipeable';

export default function Info() {
  const {
    activeMarkerId,
    setActiveMarkerId,
    organizations,
    setSwipeState,
  } = useGoogleContext();

  const organization = organizations[activeMarkerId];

  const handlers = useSwipeable({
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
    swipeDirection: 'horizontal',
    passive: false,
    onSwipe: (direction) => setSwipeState({ isDragging: false, direction }),
  });

  function handleNextClick() {
    if (activeMarkerId === organizations.length - 1) {
      setActiveMarkerId(0);
    } else {
      setActiveMarkerId(activeMarkerId + 1);
    }
  }

  function handlePreviousClick() {
    if (activeMarkerId === 0) {
      setActiveMarkerId(organizations.length - 1);
    } else {
      setActiveMarkerId(activeMarkerId - 1);
    }
  }

  return (
    <article {...handlers} className="info w-full mx-auto my-0 h-1/3 flex flex-col justify-around items-center">
      <div className="inner-info">
        <h1>{organization.name}</h1>
        <h2>{organization.address}</h2>
        <h3>{organization.city}</h3>
        <h4>{organization.state}</h4>
        <h5>{organization.zip_code}</h5>
        <h6>{organization.phone_num}</h6>
        <Link to="#">Details</Link>

        {organizations.length > 1 && (
          <>
            <button onClick={handlePreviousClick} className="p-2 m-4 md:text-xl">
              Previous
            </button>

            <button onClick={handleNextClick} className="p-2 m-4 md:text-xl">
              Next
            </button>
          </>
        )}

      </div>
    </article>
  );
}
