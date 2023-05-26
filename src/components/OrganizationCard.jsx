import React from 'react';
import { OverlayView } from '@react-google-maps/api';

function OrganizationCard({ org, index }) {
  return (
    <>
      <section id={ index } style={ { zIndex: '2' } }>
        <div>{ org.name }</div>
        <div>{ org.address }</div>
        <div>{ org.desc }</div>
      </section>
    </>
  );
}

export default OrganizationCard;