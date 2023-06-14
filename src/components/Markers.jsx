import { Marker } from '@react-google-maps/api';
import userPin from '../assets/images/icons/user-pin.svg';
import pin from '../assets/images/icons/org-pin.svg';
import useMapUtils from '../hooks/useMapUtils';
import { useGoogleContext } from '../context/GoogleContext';

export default function Markers({ organizations }) {
  const { myLatLng } = useGoogleContext();

  const { markerClick } = useMapUtils();
  return (
    <>
      <Marker
        position={ myLatLng }
        options={{ icon: userPin }}
      />

      {
        organizations.map((org, idx) => (
          <Marker
            key={org.desc}
            position={org.position}
            options={{ icon: pin }}
            onClick={() => markerClick(org, idx)}
          />
        ))
      }
    </>
  );
}
