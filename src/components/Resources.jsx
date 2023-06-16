import React from 'react';
import { Link } from 'react-router-dom';

export default function Resources() {
  return (
    <>
      <Link className="absolute left-10 top-4" to='/'>home</Link>
      <h1 className="text-2xl md:text-3xl mt-20 mb-10 font-semibold subpixel-antialiased">
        Resources
      </h1>
      <p className="italic subpixel-antialiased">all resources sourced form <Link to="https://www.feedingamerica.org">Feeding America</Link></p>
      <article>
        <ul className="mt-10">
          <li className="max-w-full mx-auto h-52">
            <div className="flex w-full justify-evenly">
              <Link to="https://www.feedingamerica.org/our-work/hunger-relief-programs/snap">
                <h2 className="underline text-lg md:text-xl subpixel-antialiased mx-6">SNAP</h2>
              </Link>
              <h3 className="text-sm md:text-lg subpixel-antialiased mx-6">Supplemental Nutrition Assistance Program</h3>
              <p className="text-sm md:text-lg subpixel-antialiased mx-6">
              Provides timely, targeted, and temporary benefits to low-income Americans to buy groceries.
              </p>
            </div>
            
          </li>
          <li className="max-w-full mx-auto h-52">
            <div className="flex w-full justify-evenly">
              <Link to="https://www.feedingamerica.org/take-action/advocate/federal-hunger-relief-programs/the-emergency-food-assistance-program">
                <h2 className="underline text-lg md:text-xl subpixel-antialiased mx-6">TEFAP</h2>
              </Link>
              <h3 className="text-sm md:text-lg subpixel-antialiased mx-6">The Emergency Food Assistance Program</h3>
              <p className="text-sm md:text-lg subpixel-antialiased mx-6">
                Provides USDA commodities to families in need of short-term hunger reflief through emergency food providers linke food banks.
              </p>
            </div>

          </li>
          
          <li className="max-w-full mx-auto h-52">
            <div className="flex w-full justify-evenly">
              <Link to="https://www.feedingamerica.org/take-action/advocate/federal-hunger-relief-programs/csfp">
                <h2 className="underline text-lg md:text-xl subpixel-antialiased mx-6">CSFP</h2>
              </Link>
              <h3 className="text-sm md:text-lg subpixel-antialiased mx-6">The Commoditiy Supplemental Food Program</h3>
              <p className="text-sm md:text-lg subpixel-antialiased mx-6">
                Provides food assistance for low-income seniors with a monthly package of healthy USDA commodities.
              </p>
            </div>

          </li>
          <li className="max-w-full mx-auto h-52">
            <div className="flex w-full justify-evenly">
              <Link to="https://www.feedingamerica.org/take-action/advocate/federal-hunger-relief-programs/child-and-adult-care-food-program">
                <h2 className="underline text-lg md:text-xl subpixel-antialiased mx-6">CACFP</h2>
              </Link>
              <h3 className="text-sm md:text-lg subpixel-antialiased mx-6">The Child and Adult Care Food Program</h3>
              <p className="text-sm md:text-lg subpixel-antialiased mx-6">
                Provides nutritious meals and snacks to children and adults in designated child and adult care centers.
              </p>
            </div>

          </li>

          <li className="max-w-full mx-auto h-52">
            <div className="flex w-full justify-evenly">
              <Link to="https://www.feedingamerica.org/take-action/advocate/federal-hunger-relief-programs/national-school-lunch-program">
                <h2 className="underline text-lg md:text-xl subpixel-antialiased mx-6">NSLP
                </h2>
              </Link>
              <h3 className="text-sm md:text-lg subpixel-antialiased mx-6">The National School Lunch Program</h3>
              <p className="text-sm md:text-lg subpixel-antialiased mx-6">
                Provides nutritionally balanced lunch to qualified children each school day. 
              </p>
            </div>

          </li>
          <li className="max-w-full mx-auto h-52">
            <div className="flex w-full justify-evenly">
              <Link to="https://www.feedingamerica.org/need-help-find-food/school-breakfast">
                <h2 className="underline text-lg md:text-xl subpixel-antialiased mx-6">SBP</h2>
              </Link>
              <h3 className="text-sm md:text-lg subpixel-antialiased mx-6"> The School Breakfast Program</h3>
              <p className="text-sm md:text-lg subpixel-antialiased mx-6">
                Provides nutritionally balanced breakfast to qualified children each school day.
              </p>
            </div>

          </li>

          <li className="max-w-full mx-auto h-52">
            <div className="flex w-full justify-evenly">
              <Link to="https://www.feedingamerica.org/our-work/hunger-relief-programs/summer-food-service-program">
                <h2 className="underline text-lg md:text-xl subpixel-antialiased mx-6">SFSP</h2>
              </Link>
              <h3 className="text-sm md:text-lg subpixel-antialiased mx-6">The Summer Food Service Program</h3>
              <p className="text-sm md:text-lg subpixel-antialiased mx-6">
                Provides free meals and snacks to low-income children during the summer months.
              </p>
            </div>

          </li>
          <li className="max-w-full mx-auto h-52">
            <div className="flex w-full justify-evenly">
              <Link to="https://www.feedingamerica.org/need-help-find-food/wic">
                <h2 className="underline text-lg md:text-xl subpixel-antialiased mx-6">WIC</h2>
              </Link>
              <h3 className="text-sm md:text-lg subpixel-antialiased mx-6">Women Infants and Children</h3>
              <p className="text-sm md:text-lg subpixel-antialiased mx-6">
                Provides nutritious foods and nutrition education for low-income, at risk women, infants.
              </p>
            </div>

          </li>
        </ul>
      </article>
    </>
  );
}
