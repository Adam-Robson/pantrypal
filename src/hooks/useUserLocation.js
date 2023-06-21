import useFetchUtils from '../hooks/useFetchUtils';
import { useGoogleContext } from '../context/GoogleContext';

export default function useUserLocation() {
  const { geoCodeLocation, fetchLocalOrgs, getCityAndState } = useFetchUtils();
  const { setMyLatLng } = useGoogleContext();
  
  function populateOrgs() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          let myLatLng = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setMyLatLng(myLatLng);

          const res = await geoCodeLocation('location', myLatLng);
          const userLocation = getCityAndState(res);
          fetchLocalOrgs(userLocation);
        });
    }
  }
  return { populateOrgs };
}