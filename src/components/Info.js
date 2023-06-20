import React from 'react';
import { useGoogleContext } from '../context/GoogleContext';
import useMapUtils from '../hooks/useMapUtils';
import CardArrows from './CardArrows';
import { FiX } from 'react-icons/fi';

export default function Info() {
  const { handleRoute } = useMapUtils();
  const {
    setFloatCard,
    setIsDetailsPage,
    activeMarkerId,
    organizations,
  } = useGoogleContext();

  const organization = organizations[activeMarkerId];

  return (
    <section className="info max-w-xs md:max-w-md md:max-h-96 max-h-64 mx-auto rounded-lg absolute left-0 right-0 bottom-10">
      <button className="absolute top-4 right-4 md:top-8 md:right-8" onClick={ () => setFloatCard(false) }>
        <FiX size={ 20 } />
      </button>
      <article className="min-h-fit min-w-full p-4">
        <p className="w-full text-lg lg:text-3xl text-left font-semibold h-16 mb-4 subpixel-antialiased">
          { organization.name }
        </p>

        <p className="text-left text-sm sm:text-lg subpixel-antialiased">
          {organization.address}
        </p>
        <p className="text-left text-sm sm:text-lg subpixel-antialiased">
          {organization.city + ' ' + organization.state + ' ' + organization.zip_code}
        </p>
        <div className="flex justify-between">
          <p className="text-left text-sm sm:text-lg mb-4 subpixel-antialiased">{ organization.phone_num }</p>
          
        </div>

        <CardArrows />

        <div>
          <button
            className="float-btn px-8 py-2 m-2 rounded-lg subpixel-antialiased"
            onClick={() => handleRoute(organization.address)}
          >
            Directions
          </button>
          <button className="float-btn px-8 py-2 m-2 rounded-lg subpixel-antialiased">
            <a href={'tel:' + organization.phone_num}>
              Call
            </a>
          </button>
          <button 
            className="float-btn px-8 py-2 m-2 rounded-lg subpixel-antialiased"
            onClick={ () => setIsDetailsPage(true) }
          >
            Details
          </button>
        </div>

      </article>
    </section>
  );
}
