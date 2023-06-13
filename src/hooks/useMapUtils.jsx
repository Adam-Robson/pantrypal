import { useGoogleContext } from '../context/GoogleContext';

export default function useMapUtils() {
  const { map, setActiveMarkerId } = useGoogleContext();

  function markerClick(org, id) {
    setFocus(org.position);
    setActiveMarkerId(id);
  }

  function setFocus(position) {
    map.setZoom(17);
    recenterMap(position);
  }

  function recenterMap(position) {
    map.setCenter(position);
  }
  
  return { markerClick, setFocus, recenterMap };
  
}