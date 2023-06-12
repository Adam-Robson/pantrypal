import React from 'react';
import { Link } from 'react-router-dom';

export default function Menu() {
  return (
    <>
      <div className="menu w-full p-2">
        <ul className="w-full">
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/resources">Resources</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </div>
    </>
  );
}
