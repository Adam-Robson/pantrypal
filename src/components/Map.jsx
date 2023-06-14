/* eslint-disable no-unused-vars */

import { DirectionsService } from '@react-google-maps/api';
import { useGoogleContext } from '../context/GoogleContext';
import MapContainer from './MapContainer';

export default function Map() {
  const {
    origin,
    destination,
    directions,
    duration,
    distance,
  } = useGoogleContext();

  return (
    <div className="h-full">
      <div className="h-full w-full mx-auto">
        <MapContainer />

        <p>{distance && `Distance: ${distance}`}</p>
        <p>{duration && `Duration: ${duration}`}</p>

        {directions && (
          <DirectionsService
            options={{
              destination,
              origin,
              travelMode: 'DRIVING',
            }}
          />
        )}
      </div>
    </div>
  );
}
