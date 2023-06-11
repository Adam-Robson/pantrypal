import React from 'react';
import { Link } from 'react-router-dom';
import { useGoogleContext } from '../context/GoogleContext';
import { useSwipeable } from 'react-swipeable';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
/**
 *
 *
 *  
 */
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
/**
 * The following functions provide the logic
 * to 
 * 
 *
 */
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
    <article {...handlers} className="info w-3/4 mx-auto h-1/4 rounded-md p-2 ">
      <div className="w-full p-2">
        <p className="w-2/3 text-sm text-left font-semibold">{organization.name}</p>
        <p className="text-left text-xs mt-2">
          {organization.address}
        </p>
        <p className="flex text-left text-xs">
          { organization.city + ' ' + organization.state + ' ' + organization.zip_code }
        </p> 
        <div className="flex justify-between items-baseline">
          <p className="text-left text-xs">{organization.phone_num}</p>
          <Link className="text-xs pr-4" to={ organization.activeMarkerId }>Details</Link>
        </div>
        {organizations.length > 1 && (
          <>
            <div className="w-full flex justify-between items-baseline">
              <div onClick={handlePreviousClick} className="p-2 m-4 text-sm">
                <FiChevronLeft />
              </div>
                
              <div onClick={handleNextClick} className="p-2 m-4 text-sm">
                <FiChevronRight />
              </div>
            </div>
          </>
        )}

      </div>
    </article>
  );
}
