import React from 'react';
import { Link } from 'react-router-dom';
import { useGoogleContext } from '../context/GoogleContext';
import { FiX } from 'react-icons/fi';
import stillshot_map from '../assets/images/stillshot_map.png';
import facebook from '../assets/images/icons/fb_icon.svg';
import twitter from '../assets/images/icons/twitter_icon.svg';
import instagram from '../assets/images/icons/ig_icon.svg';

export default function Details() {

  const {
    setIsDetailsPage,
    activeMarkerId,
    organizations,
    distance,
    duration
  } = useGoogleContext();

  const organization = organizations[activeMarkerId];

  return (
    <>
      <section className="min-h-full max-w-2xl mx-auto flex flex-col justify-start items-center">
        <article className="w-full max-w-2xl mx-auto">
          <img src={ stillshot_map } alt="stillshot map" className="w-full" />
          <button onClick={ () => setIsDetailsPage(false) } className="absolute top-4 right-10 sm:right-20 md:right-40 lg:right-60 xl:right-80">
            <FiX size={ 24 } />
          </button>
        </article>

        <article className="details-wrap max-w-xl w-full flex justify-start">
          {
            organization.image_url !== null ? <img className="aspect-auto rounded-2xl max-h-60 max-w-xs w-32 relative bottom-12 p-2 m-4" src={ organization.image_url } alt="image of organization" /> : null
          }
          <div className="detail w-full flex flex-col justify-start items-start mt-4 text-left mx-2">
            <h1 className="deatil text-xl sm:text-3xl lg:text-4xl font-semibold subpixel-antialiased">
              { organization.name }
            </h1>
            <h2 className="detail text-sm md:text-lg font-normal subpixel-antialiased">
              { organization.address }
            </h2>
            <p className="detail text-sm md:text-lg font-normal subpixel-antialiased">
              { organization.city + ' ' + organization.state + ' ' + organization.zip_code }
            </p>
            <p className="detail text-sm md:text-lg font-normal subpixel-antialiased">{ organization.phone_num }</p>
          </div>
        </article>

       
        <p>{ distance && `${distance} miles` }</p>
        <p>{ duration && `${duration} appx.` }</p>
        
        <article className="max-w-xl w-full">
          <div className="text-left w-full">
            <h2 className="detail-title text-lg md:text-xl subpixel-antialiased font-semibold mx-4 my-4">
              Description
            </h2>
            <p className="detail text-sm md:text-lg subpixel-antialiased mx-4">{ organization.desc }</p>
          </div>
        </article>

        <article className="max-w-xl w-full text-left">
          {
            (organization.facebook_url || organization.twitter_url || organization.instagram_url) ?
              <h2 className="detail-title text-lg md:text-xl subpixel-antialiased font-semibold mx-4 my-4">
                Social Links
              </h2> : null
          }
          <div className="w-full flex justify-evenly">
            {
              organization.facebook_url ? <Link target="_blank" to={ organization.facebook_url }><img src={ facebook } alt="facebook icon" /></Link> : null
            }
            {
              organization.twitter_url ? <Link target="_blank" to={ organization.twitter_url }><img src={ twitter } alt="twitter icon" /></Link> : null
            }
            {
              organization.instagram_url ? <Link target="_blank" to={ organization.instagram_url }><img src={ instagram } alt="instagram icon" /></Link> : null
            }
          </div>
        </article>

        <article className="max-w-xl w-full flex justify-around items-center my-4">
          <div className="w-2/3 flex justify-evenly my-8" > 
            <button className="float-btn px-8 py-2 m-2 rounded-lg text-lg">Directions</button>
            <button className="float-btn px-8 py-2 m-2 rounded-lg text-lg">Call</button>
          </div>

        </article>

      </section>
    </>
  );
}


{/* 


    <article >
     
    </article>
  </div>
  <div className="max-w-full w-2/3 flex justify-evenly my-4">
   
  </div>
</article> */}