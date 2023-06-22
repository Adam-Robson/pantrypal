import React from 'react';
import { Link } from 'react-router-dom';
import './stylesheets/resources.css';

export default function Resources() {
  return (
    <>
      <Link className="resources text-sm md:text-lg font-semibold absolute right-10 top-4" to='/'>home</Link>
      <h1 className="re-title text-3xl md:text-5xl mt-20 mb-10 font-semibold subpixel-antialiased">
        Resources
      </h1>
      <p className="col-start-3 col-span-2text-xs md:text-sm subpixel-antialiased">information sourced from <Link className="america font-semibold" to="https://www.feedingamerica.org">Feeding America</Link></p>
      <article className="container w-full mx-auto text-left p-2">
        <ul className="container mt-10 grid grid-rows-9 grid-cols-5 gap-3">
          <li className="row-start-1 row-span-1 col-start-1 col-span-5 grid grid-cols-5 gap-2">
            <Link className="resources" to="https://www.feedingamerica.org/our-work/hunger-relief-programs/snap">
              <h2 className="text-left">SNAP</h2>
            </Link>
            <h3 className="col-start-2 col-span-2">Supplemental Nutrition Assistance Program</h3>
            <p className="col-start-4 col-span-2">
              Provides timely, targeted, and temporary benefits to low-income Americans to buy groceries.
            </p>
          </li>
          <li className="row-start-2 row-span-1 col-start-1 col-span-5 grid grid-cols-5 gap-2">
            <Link className="resources" to="https://www.feedingamerica.org/take-action/advocate/federal-hunger-relief-programs/the-emergency-food-assistance-program">
              <h2 className="text-left">TEFAP</h2>
            </Link>
            <h3 className="col-start-2 col-span-2">The Emergency Food Assistance Program</h3>
            <p className="col-start-4 col-span-2">
                Provides USDA commodities to families in need of short-term hunger reflief through emergency food providers linke food banks.
            </p>
          </li>
          <li className="row-start-3 row-span-1 col-start-1 col-span-5 grid grid-cols-5 gap-2">
            <Link className="resources" to="https://www.feedingamerica.org/take-action/advocate/federal-hunger-relief-programs/csfp">
              <h2 className="">CSFP</h2>
            </Link>
            <h3 className="col-start-2 col-span-2">The Commoditiy Supplemental Food Program</h3>
            <p className="col-start-4 col-span-2">
                Provides food assistance for low-income seniors with a monthly package of healthy USDA commodities.
            </p>
          </li>
          <li className="row-start-4 row-span-1 col-start-1 col-span-5 grid grid-cols-5 gap-2">
            <Link className="resources" to="https://www.feedingamerica.org/take-action/advocate/federal-hunger-relief-programs/child-and-adult-care-food-program">
              <h2 className="text-left ">CACFP</h2>
            </Link>
            <h3 className="col-start-2 col-span-2">The Child and Adult Care Food Program</h3>
            <p className="col-start-4 col-span-2">
                Provides nutritious meals and snacks to children and adults in designated child and adult care centers.
            </p>
          </li>
          <li className="row-start-5 row-span-1 col-start-1 col-span-5 grid grid-cols-5 gap-2">
            <Link className="resources" to="https://www.feedingamerica.org/take-action/advocate/federal-hunger-relief-programs/national-school-lunch-program">
              <h2 className="text-left  ">NSLP
              </h2>
            </Link>
            <h3 className="col-start-2 col-span-2">The National School Lunch Program</h3>
            <p className="col-start-4 col-span-2">
                Provides nutritionally balanced lunch to qualified children each school day. 
            </p>
          </li>
          <li className="row-start-6 row-span-1 col-start-1 col-span-5 grid grid-cols-5 gap-2">
            
            <Link className="resources" to="https://www.feedingamerica.org/need-help-find-food/school-breakfast">
              <h2 className="text-left ">SBP</h2>
            </Link>
            <h3 className="col-start-2 col-span-2"> The School Breakfast Program</h3>
            <p className="col-start-4 col-span-2">
                Provides nutritionally balanced breakfast to qualified children each school day.
            </p>
          </li>
          <li className="row-start-7 row-span-1 col-start-1 col-span-5 grid grid-cols-5 gap-2">
            <Link className="resources" to="https://www.feedingamerica.org/our-work/hunger-relief-programs/summer-food-service-program">
              <h2 className="">SFSP</h2>
            </Link>
            <h3 className="col-start-2 col-span-2">The Summer Food Service Program</h3>
            <p className="col-start-4 col-span-2">
                Provides free meals and snacks to low-income children during the summer months.
            </p>
          </li>
          <li className="row-start-8 row-span-1 col-start-1 col-span-5 grid grid-cols-5 gap-2">
            <Link className="resources" to="https://www.feedingamerica.org/need-help-find-food/wic">
              <h2 className="">WIC</h2>
            </Link>
            <h3 className="col-start-2 col-span-2">Women Infants and Children</h3>
            <p className="col-start-4 col-span-2">
                Provides nutritious foods and nutrition education for low-income, at risk women, infants.
            </p>
          </li>
        </ul>
      </article>
    </>
  );
}
