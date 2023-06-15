import React from 'react';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useGoogleContext } from '../context/GoogleContext';
import useMapUtils from '../hooks/useMapUtils';

export default function Info() {
  const { handleRoute, setFocus } = useMapUtils();
  const {
    activeMarkerId,
    setActiveMarkerId,
    organizations,
  } = useGoogleContext();

  const organization = organizations[activeMarkerId];

  function handleNextClick() {
    let nextMarkerId = null;
    if (activeMarkerId === organizations.length - 1) {
      nextMarkerId = 0;
    } else {
      nextMarkerId = activeMarkerId + 1;
    }

    setActiveMarkerId(nextMarkerId);
    setFocus(organizations[nextMarkerId].position);
  }

  function handlePreviousClick() {
    let nextMarkerId = null;
    if (activeMarkerId === 0) {
      nextMarkerId = organizations.length - 1;
    } else {
      nextMarkerId = activeMarkerId - 1;
    }

    setActiveMarkerId(nextMarkerId);
    setFocus(organizations[nextMarkerId].position);
  }

  return (
    <article className="info min-w-max w-5/12 max-w-sm mx-auto h-1/4 rounded-md p-2 absolute left-0 right-0 bottom-10 mb-8">
      <div className="w-full p-2 min-h-full">
        <p className="flex items-end w-3/4 text-lg md:text-xl lg:text-2xl text-left font-semibold h-20">
          {organization.name}
        </p>
        <p className="text-left text-xs sm:text-sm lg:text-lg mt-2">
          {organization.address}
        </p>
        <p className="flex text-left text-xs md:text-sm min-h-full">
          {organization.city + ' ' + organization.state + ' ' + organization.zip_code}
        </p>
        <div className="flex justify-between items-baseline min-h-full">
          <p className="text-left text-xs sm:text-sm lg:text-lg">
            {organization.phone_num}
          </p>
          <Link className="details-link text-xs sm:text-sm lg:text-lg pr-4" to={`/${activeMarkerId}`}>
            Details
          </Link>
        </div>

        {organizations.length > 1 && (
          <>
            <div className="w-full flex justify-center items-baseline">
              <div onClick={handlePreviousClick} className="mx-4 mt-2 text-xs sm:text-sm lg:text-lg hover:cursor-pointer">
                <FiChevronLeft />
              </div>
              <button
                className="float-btn px-8 py-2 m-2"
                onClick={() => handleRoute(organization.address)}
              >
                Directions
              </button>
              <button className="float-btn px-8 py-2 m-2">
                <a href={'tel:' + organization.phone_num}>
                  Call
                </a>
              </button>
              <div onClick={handleNextClick} className="mx-4 mt-2 text-xs sm:text-sm lg:text-lg hover:cursor-pointer">
                <FiChevronRight />
              </div>
            </div>
          </>
        )}
      </div>
    </article>
  );
}
