import React, { useState, useEffect } from 'react';
import { Marker } from '@react-google-maps/api';
import userPin from '../assets/images/icons/user-pin.svg';
import pin from '../assets/images/icons/org-pin.svg';
import useMapUtils from '../hooks/useMapUtils';
import { useGoogleContext } from '../context/GoogleContext';

export default function Markers({ organizations }) {
  const { myLatLng } = useGoogleContext();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { markerClick } = useMapUtils();

  return (
    isMounted && (
      <>
        {/* User's current position marker */}
        <Marker
          position={ myLatLng }
          options={{ icon: userPin }}
        />

        { organizations.map((org, idx) => (
          <Marker
            key={idx}
            position={org.position}
            options={{ icon: pin }}
            onClick={() => markerClick(org, idx)}
          />
        ))}
      </>
    )
  );
}
