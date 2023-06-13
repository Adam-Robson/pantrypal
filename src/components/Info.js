import React from 'react';
import { Link } from 'react-router-dom';
import { useGoogleContext } from '../context/GoogleContext';
import { useSwipeable } from 'react-swipeable';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

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
    <article {...handlers} className="info min-w-min w-2/3 max-w-sm mx-auto h-1/4 rounded-md p-2 absolute left-0 right-0 bottom-10">
      <div className="w-full p-2 min-h-full">
        <p className="flex items-end w-3/4 text-xs sm:text-sm lg:text-lg text-left font-semibold h-20">{ organization.name }</p>
        <p className="text-left text-xs sm:text-sm lg:text-lg mt-2">
          {organization.address}
        </p>
        <p className="flex text-left text-xs md:text-sm min-h-full">
          { organization.city + ' ' + organization.state + ' ' + organization.zip_code }
        </p> 
        <div className="flex justify-between items-baseline min-h-full">
          <p className="text-left text-xs sm:text-sm lg:text-lg">{organization.phone_num}</p>
          <Link className="text-xs sm:text-sm lg:text-lg pr-4" to={ `/${activeMarkerId }` }>Details</Link>
        </div>
        {organizations.length > 1 && (
          <>
            <div className="w-full flex justify-center items-baseline">
              <div onClick={ handlePreviousClick } className="mx-4 mt-2 text-xs sm:text-sm lg:text-lg hover:cursor-pointer">
                <FiChevronLeft />
              </div>
              <button className="float-btn px-8 py-2 m-2 ">Directions</button>
              <button className="float-btn px-8 py-2 m-2">Call</button>
              <div onClick={ handleNextClick } className="mx-4 mt-2 text-xs sm:text-sm lg:text-lg hover:cursor-pointer">
                <FiChevronRight />
              </div>
            </div>
          </>
        )}

      </div>
    </article>
  );
}
