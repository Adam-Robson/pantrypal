import React from 'react';
import { useGoogleContext } from '../context/GoogleContext';
import useMapUtils from '../hooks/useMapUtils';
import CardArrows from './CardArrows';

export default function Info() {
  const { handleRoute } = useMapUtils();
  const {
    setIsDetailsPage,
    activeMarkerId,
    organizations,
  } = useGoogleContext();

  const organization = organizations[activeMarkerId];

  return (
    <section className="info min-w-2/3 max-w-sm mx-auto rounded-lg absolute left-0 right-0 bottom-10">
      <article className="min-h-full min-w-full p-4">
        <p className="w-full text-lg sm:text-xl lg:text-2xl text-left font-semibold h-20 mb-4">
          {organization.name}
        </p>

        <p className="text-left text-sm sm:text-lg lg:text-xl">
          {organization.address}
        </p>
        <p className="text-left text-sm sm:text-lg lg:text-xl">
          {organization.city + ' ' + organization.state + ' ' + organization.zip_code}
        </p>
        <div className="flex justify-between">
          <p className="text-left text-sm sm:text-lg lg:text-xl mb-4">{ organization.phone_num }</p>
          <button
            className="details-btn text-sm sm:text-lg lg:text-xl"
            onClick={ () => setIsDetailsPage(true) }
          >Details</button>
        </div>

        <CardArrows />

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
