import { useGoogleContext } from '../context/GoogleContext';
// import { GoogleMap, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

export default function useMapUtils() {
  const {
    map,
    setActiveMarkerId,
    setDirections,
    setDuration,
    setDistance,
    origin,
  } = useGoogleContext();

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

  function handleRoute(destination) {
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    directionsService.route({
      origin,
      destination,
      travelMode: 'DRIVING',
    }, (response, status) => {
      if (status === 'OK') {
        setDirections(response);
        setDistance(response.routes[0].legs[0].distance.text);
        setDuration(response.routes[0].legs[0].duration.text);
      } else {
        console.error('Error fetching directions:', status);
      }
    });
  }

  return { markerClick, setFocus, recenterMap, handleRoute };
}
