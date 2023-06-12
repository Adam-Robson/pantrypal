// import { useGoogleContext } from '../context/GoogleContext';
// import setFocus from './useSetFocus';

export default function useMarkerClick(setFocus, setActiveMarkerId) {
  // const { setActiveMarkerId } = useGoogleContext(); 

  function markerClick(org, id) {
    setFocus(org.position);
    setActiveMarkerId(id);
  }
  return { markerClick };
}