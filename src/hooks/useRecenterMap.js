// import { useGoogleContext } from '../context/GoogleContext';

export default function useRecenterMap(map) {
  // const { map } = useGoogleContext();

  function recenterMap(position) {
    map.setCenter(position);
  }
  return { recenterMap };
}