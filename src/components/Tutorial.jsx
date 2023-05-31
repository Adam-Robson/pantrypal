import { useState } from 'react';
import { createPortal } from 'react-dom';
import ModalContent from './ModalContent';

export default function Tutorial() {
  
  const [showModal, setShowModal] = useState(false);
  
  return (
    <>
      <button onClick={ () => setShowModal(true) }>Tutorial</button>
      <div
        role="dialog"
        aria-labelledby="dialog1Title"
        aria-describedby="dialog1Desc">
        { 
          showModal && 
          createPortal(
            <ModalContent onClose={ () => setShowModal(false) } />,
            document.body
          ) 
        }
      </div>
    </>
  );
}
