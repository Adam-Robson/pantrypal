import { Marker } from '@react-google-maps/api';
import pin from '../assets/images/icons/orange-pin.svg';

export default function Markers({ organizations, markerClick }) {
  return (
    <>
      {
        organizations.map((org, idx) => (
          <Marker
            key={ org.desc }
            position={ org.position }
            options={{ icon: pin }}
            onClick={() => markerClick(org, idx) }
          />
        ))
      }
    </>
  );
}
