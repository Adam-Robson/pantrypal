import React from 'react';
import { createPortal } from 'react-dom';
import Info from './Info';
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
export default function FloatCard() {
  return (
    <>
      {createPortal(
        <Info />,
        document.body
      )}
    </>
  );
}
