import React from 'react';
import { createPortal } from 'react-dom';
import Info from './Info';

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
