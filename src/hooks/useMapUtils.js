import { useGoogleContext } from '../context/GoogleContext';

export default function useMapUtils() {
  const WALKING_VIEW = 14; // most zoomed in
  const DRIVING_VIEW = 12; // default view
  const BIRDS_EYE_VIEW = 10; // most zoomed out

  const {
    map,
    setActiveMarkerId,
    setDirections,
    setDuration,
    setDistance,
    origin,
  } = useGoogleContext();

  function markerClick(org, id) {
    setFocus(org.position, WALKING_VIEW);
    setActiveMarkerId(id);
  }

  function setFocus(position, zoomLevel) {
    map.setZoom(zoomLevel);
    recenterMap(position);
  }

  function recenterMap(position) {
    map.setCenter(position);
  }

  function handleRoute(destination) {
    const directionsService = new window.google.maps.DirectionsService();
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

  return { markerClick, setFocus, recenterMap, handleRoute, WALKING_VIEW, DRIVING_VIEW, BIRDS_EYE_VIEW };
}
