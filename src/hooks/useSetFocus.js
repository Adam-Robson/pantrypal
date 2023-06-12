// import { useGoogleContext } from '../context/GoogleContext';
import useRecenterMap from './useRecenterMap';

export default function useSetFocus(map) {
  const { recenterMap } = useRecenterMap();
  // const { map } = useGoogleContext();

  function setFocus(position) {
    map.setZoom(17);
    recenterMap(position);
  }
  
  return { setFocus };

}