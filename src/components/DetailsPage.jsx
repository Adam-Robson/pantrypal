import React from 'react';
import { Link } from 'react-router-dom';
import { FiX } from 'react-icons/fi';
import { useGoogleContext } from '../context/GoogleContext';
import OrgDetailsBanner from './OrgDetailsBanner';
import facebook from '../assets/images/icons/fb_icon.svg';
import twitter from '../assets/images/icons/twitter_icon.svg';
import instagram from '../assets/images/icons/ig_icon.svg';
import stacked from '../assets/logo/stacked_logo.svg';
import './stylesheets/detailspage.css';

export default function Details() {

  const {
    setIsDetailsPage,
    activeMarkerId,
    organizations,
    distance,
    duration,
  } = useGoogleContext();

  const organization = organizations[activeMarkerId];
  return (
    <>
      <section className="max-w-3xl min-h-full mx-auto flex flex-col justify-between items-center">
        <article className="container">
          <OrgDetailsBanner organization={organization} />
          <button onClick={() => setIsDetailsPage(false)} className="absolute top-4 right-10 sm:right-20 md:right-40 lg:right-60 xl:right-80">
            <FiX size={24} />
          </button>
        </article>
        <article className="container flex flex-col flex-1">
          <div className="container detail-wrap max-w-xl w-full flex justify-start">
            {
              organization.image_url !== null ? <img className="detail-img rounded-2xl relative bottom-6 ml-4" src={organization.image_url} alt="image of organization" /> : <img className="detail-img rounded-2xl relative bottom-6" src={stacked} alt="image of pantry pal logo" />
            }
            <div className="detail w-full flex flex-col justify-start items-start mt-4 text-left mx-2">
              <h1 className="detail text-xl sm:text-3xl lg:text-4xl font-semibold subpixel-antialiased">
                {organization.name}
              </h1>
              <h2 className="detail text-sm md:text-lg font-normal subpixel-antialiased">
                {organization.address}
              </h2>
              <p className="detail text-sm md:text-lg font-normal subpixel-antialiased">
                {organization.city + ' ' + organization.state + ' ' + organization.zip_code}
              </p>
              <p className="detail text-sm md:text-lg font-normal subpixel-antialiased">{organization.phone_num}</p>
              {organization.website_url ? <button className="detail-btn" to={organization.website_url}>Website</button> : null}

              <div className="flex justify-around w-full mt-6">
                <p className="detail text-sm md:text-lg font-normal subpixel-antialiased">{distance && `${distance} `}</p>
                <p className="detail text-sm md:text-lg font-normal subpixel-antialiased">{duration && ` ${duration}`}</p>
              </div>
            </div>
          </div>

          <div className="container flex-1">
            <div className="text-left w-full">
              <h2 className="detail-title text-lg md:text-xl subpixel-antialiased font-semibold mx-4 my-4">
              Description
              </h2>
              <p className="detail text-sm md:text-lg subpixel-antialiased mx-4">{organization.desc}</p>
            </div>
          </div>

          <div className="max-w-xl w-full text-left">
            {
              (organization.facebook_url || organization.twitter_url || organization.instagram_url) ?
                <h2 className="detail-title text-lg md:text-xl subpixel-antialiased font-semibold mx-4 my-4">
                Social Links
                </h2> : null
            }
            <div className="w-full flex justify-evenly">
              {
                organization.facebook_url ? <Link target="_blank" to={organization.facebook_url}><img src={facebook} alt="facebook icon" /></Link> : null
              }
              {
                organization.twitter_url ? <Link target="_blank" to={organization.twitter_url}><img src={twitter} alt="twitter icon" /></Link> : null
              }
              {
                organization.instagram_url ? <Link target="_blank" to={organization.instagram_url}><img src={instagram} alt="instagram icon" /></Link> : null
              }
            </div>
          </div>

          <div className="max-w-xl w-full flex justify-around items-center my-4">
            <div className="w-2/3 flex justify-evenly my-8" >
              <button className="float-btn px-8 py-2 m-2 rounded-lg text-lg subpixel-antialiased">Directions</button>
              <button className="float-btn px-8 py-2 m-2 rounded-lg text-lg subpixel-antialiased">Call</button>
            </div>
          </div>
        </article>

      </section>
    </>
  );
}
