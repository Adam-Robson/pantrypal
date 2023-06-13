import React from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import Tutorial from './Tutorial';
import { useGoogleContext } from '../context/GoogleContext';
/** 
 * createPortal takes two arguments. 
 * The first is the content to display. 
 * The second is the location to display
 * that content. React will remember 
 * where the createPortal call happens 
 * in the control flow, but will fulfill
 * the request, rendering the content
 * according to the location specified
 * in the second argument.
 */
export default function Portal() {
  const { tutorial, setTutorial } = useGoogleContext();

  return (
    <div className="portal h-full w-full">
      <Link to="/tutorial" className="relative top-6 text-xs">Tutorial</Link>
      { 
        tutorial && createPortal(
          <Tutorial onClose={ () => setTutorial(false) } />,
          document.body
        ) 
      }
    </div>
  );
}