import React from 'react';
import { createPortal } from 'react-dom';
import Info from './Info';

/**
 * React's createPortal function takes two
 * arguments. Whatever it is to display, and 
 * wherever it should display it. React will 
 * remember where in the control flow 
 * createPortal is called, and will thus 
 * maintain the control flow while it simulateously
 * honors the createPortal request, rendering 
 * the content in the location createPortal has asked.
 * 
 * Below, without the createPortal function,
 * the Info component would be rendered in the
 * FloatCard, which is called in the Map component.   
 * Instead, createPortal “teleports” the
 * FloatCard elsewhere in document.body. 
 * Inspect the dev tools to watch it appear 
 * outside of the "root" div on click.
 */

export default function FloatCard() {
  return (
    <div className="">
      {createPortal(
        <Info />,
        document.body
      )}
    </div>
  );
}
