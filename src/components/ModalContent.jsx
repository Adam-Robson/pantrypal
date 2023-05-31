/* eslint-disable react/no-unescaped-entities */
import { LuX } from 'react-icons/lu';

export default function ModalContent({ onClose }) {
  return (
    <section className='modal'>
      <h2 id="dialog1Title">Welcome to the Pantry Pal Tutorial!</h2>
      <div>
        <p id="dialog1Desc">Find free and affordable food in your area so you can fully concentrate on your education.</p>
      </div>
      <button onClick={ onClose }>
        <LuX />
      </button>
      <button>Close</button>
    </section>
  );
}
