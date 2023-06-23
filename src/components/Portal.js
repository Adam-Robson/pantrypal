import React from 'react';
import { createPortal } from 'react-dom';
import Tutorial from './Tutorial';
import { useGoogleContext } from '../context/GoogleContext';

export default function Portal() {
  const { tutorial, setTutorial } = useGoogleContext();

  return (
    <div className="portal h-full w-full">
      { 
        tutorial && createPortal(
          <Tutorial onClose={ () => setTutorial(false) } />,
          document.body
        ) 
      }
    </div>
  );
}