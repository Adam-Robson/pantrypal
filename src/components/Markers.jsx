import { Marker } from '@react-google-maps/api';
import pin from '../assets/images/icons/orange-pin.svg';
import useMarkerClick from '../hooks/useMarkerClick';
import { useGoogleContext } from '../context/GoogleContext';
import useSetFocus from '../hooks/useSetFocus';

export default function Markers({ organizations, map }) {
  const { setActiveMarkerId } = useGoogleContext();
  const { setFocus } = useSetFocus(map);
  const { markerClick } = useMarkerClick(setFocus, setActiveMarkerId);
  return (
    <>
      {
        organizations.map((org, idx) => (
          <Marker
            key={ org.desc }
            position={ org.position }
            options={{ icon: pin }}
            onClick={ () => markerClick(org, idx) }
          />
        ))
      }
    </>
  );
}
