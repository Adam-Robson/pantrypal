import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function Info({ org }) {
  return (
    <article className="modal2 h-1/2 w-1/2">
      <img src={ logo } alt="logo" />
      <div className="inner-info">
        <h1>{ org.name }</h1>
        <h2>{ org.address }</h2>
        <h3>{ org.city }</h3>
        <h4>{ org.state }</h4>
        <h5>{ org.zip_code }</h5>
        <h6>{ org.phone_num }</h6>
        <Link to="#">Details</Link>
      </div>
    </article>
  );
}
