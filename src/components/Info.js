import React from 'react';
import { useGoogleContext } from '../context/GoogleContext';
import useMapUtils from '../hooks/useMapUtils';
import CardArrows from './CardArrows';
import { FiX } from 'react-icons/fi';
import './stylesheets/floatcard.css';

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
    <section className="container info w-full mx-auto max-w-xs md:max-w-md rounded-xl absolute left-0 right-0 bottom-10">
      <button className="icon absolute top-2 right-4" onClick={ () => setFloatCard(false) }>
        <FiX size={ 16 } />
      </button>
      <article className="container p-6">
        <p className="min-h-fit w-full text-lg sm:text-xl md:text-2xl lg:text-3xl text-left h-12 md:h-16 mb-4 subpixel-antialiased">
          { organization.name }
        </p>
        <div className="container min-h-fit mt-4">
          <p className="text-left text-sm sm:text-lg md:text-xl subpixel-antialiased">
            {organization.address}
          </p>
          <p className="text-left text-sm sm:text-lg md:text-xl subpixel-antialiased">
            {organization.city + ' ' + organization.state + ' ' + organization.zip_code}
          </p>
          <p className="text-left text-sm sm:text-lg md:text-xl mb-4 subpixel-antialiased">{ organization.phone_num }</p>
        </div>

        <CardArrows />

        <div className="container max-w-fit mx-auto grid grid-cols-3 gap-2">
          <button
            className="float-btn rounded-lg py-2 px-4 flex justify-center items-center text-sm lg:text-lg"
            onClick={() => handleRoute(organization.address)}
          >
            Directions
          </button>
          <button className="float-btn rounded-lg py-2 px-4 flex justify-center items-center text-sm lg:text-lg">
            <a href={'tel:' + organization.phone_num}>
              Call
            </a>
          </button>
          <button 
            className="float-btn rounded-lg py-2 px-4 flex justify-center items-center text-sm lg:text-lg"
            onClick={ () => setIsDetailsPage(true) }
          >
            Details
          </button>
        </div>

      </article>
    </section>
  );
}
