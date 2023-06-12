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
    <article {...handlers} className="info w-3/4 md:w-1/5 mx-auto h-1/4 rounded-md p-2 relative bottom-10">
      <div className="w-full p-2 min-h-full">
        <p className="flex items-center w-3/4 text-lg md:text-xl text-left font-semibold h-20">{ organization.name }</p>
        <p className="text-left text-xs md:text-sm mt-2">
          {organization.address}
        </p>
        <p className="flex text-left text-xs md:text-sm min-h-full">
          { organization.city + ' ' + organization.state + ' ' + organization.zip_code }
        </p> 
        <div className="flex justify-between items-baseline min-h-full">
          <p className="text-left text-xs md:text-sm">{organization.phone_num}</p>
          <Link className="text-sm md:text-lg pr-4" to={ `/${activeMarkerId }` }>Details</Link>
        </div>
        {organizations.length > 1 && (
          <>
            <div className="w-full flex justify-center items-baseline">
              <div onClick={handlePreviousClick} className="p-2 m-4 text-lg md:text-xl hover:cursor-pointer">
                <FiChevronLeft />
              </div>
              <div onClick={ handleNextClick } className="p-2 m-4 text-lg md:text-xl hover:cursor-pointer">
                <FiChevronRight />
              </div>
            </div>
          </>
        )}

      </div>
    </article>
  );
}
