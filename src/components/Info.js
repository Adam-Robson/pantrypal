import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useGoogleContext } from '../context/GoogleContext';
import useMapUtils from '../hooks/useMapUtils';

export default function Info() {
  const { handleRoute, setFocus } = useMapUtils();
  const {
    setIsDetailPage,
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
    <section className="info min-w-2/3 max-w-sm mx-auto rounded-lg absolute left-0 right-0 bottom-10">
      <article className="min-h-full min-w-full p-4">
        <p className="w-full text-lg sm:text-xl lg:text-2xl text-left font-semibold h-20 mb-4">
          { organization.name }
        </p>

        <p className="text-left text-sm sm:text-lg lg:text-xl">
          { organization.address }
        </p>
        <p className="text-left text-sm sm:text-lg lg:text-xl">
          { organization.city + ' ' + organization.state + ' ' + organization.zip_code }
        </p>
        <div className="flex justify-between">
          <p className="text-left text-sm sm:text-lg lg:text-xl mb-4">{ organization.phone_num }</p>
          <button
            className="details-btn text-sm sm:text-lg lg:text-xl"
            onClick={ () => setIsDetailPage(true) }
          >Details</button>
        </div>
        {
          organizations.length > 1 && (
            <div className="w-full flex justify-around">
              <div className="cursor-pointer" onClick={ handlePreviousClick }>
                <FiChevronLeft />
              </div>
              <div className="cursor-pointer" onClick={ handleNextClick }>
                <FiChevronRight />
              </div>
            </div>
          )
        }
        <div>
          <button
            className="float-btn px-8 py-2 m-2 rounded-lg"
            onClick={() => handleRoute(organization.address)}
          >
            Directions
          </button>
          <button className="float-btn px-8 py-2 m-2 rounded-lg">
            <a href={'tel:' + organization.phone_num}>
              Call
            </a>
          </button>
        </div>

      </article>
    </section>
  );
}
