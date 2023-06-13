import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoogleContext } from '../context/GoogleContext';
import { FiX } from 'react-icons/fi';
import stillshot_map from '../assets/images/stillshot_map.png';
export default function Details() {
  const navigate = useNavigate();
  const {
    activeMarkerId,
    organizations,
  } = useGoogleContext();
  
  const organization = organizations[activeMarkerId];
  // eslint-disable-next-line no-console
  console.log('🚀 ~ file: Details.jsx:14 ~ Details ~ organization:', organization);

  return (
    <>
      <section className="h-full flex flex-col justify-start items-start">
        <div className="w-full">
          <img src={ stillshot_map } alt="map" className="" />
        
          <div onClick={ () => navigate('/') } className="absolute top-0 right-0 m-4">
            <FiX size={ 22 } />
          </div>
        </div>
        <div className="p-2 text-left">
          <img className="h-40" src={ organization.image_url } alt="image" /> 
          <h1 className="text-3xl font-bold">{ organization.name }</h1>
         
          <div className="">
            <h2>{ organization.address }</h2>
            <p>
              { organization.city + ' ' + organization.state + ' ' + organization.zip_code }
            </p> 
            <p>{ organization.phone_num }</p>
          </div>
          <div className="">
            <h2 className="font-semibold">Description</h2>
            <p>{ organization.desc }</p>
          </div>
          <div className="h-full w-full flex justify-evenly items-center">
            <button className="float-btn px-8 py-2 m-2">Directions</button>
            <button className="float-btn px-8 py-2 m-2">Call</button>
          </div>
        </div>
      </section>
    </>
  );
}
