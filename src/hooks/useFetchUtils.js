import { useGoogleContext } from '../context/GoogleContext';

export default function useFetchUtils() {
  const {
    setOrigin,
    setOrganizations,
  } = useGoogleContext();

  async function geoCodeLocation(locationType, location) {
    let geocoder = new window.google.maps.Geocoder();

    const query = {};
    query[locationType] = location;
    return await geocoder.geocode(query, function(result, status) {
      if (status === window.google.maps.GeocoderStatus.OK) {
        return result;
      } else { 
        console.error('Geocoder error: ' + status);
        return; 
      }
    });
  }


  function getCityAndState(data) {
    const addressComponent = data.results[0].address_components;
    setOrigin(data.results[0].formatted_address);

    let city, state;
    for (let i = 0; i < addressComponent.length; i++) {
      const addressPortion = addressComponent[i];
      if (addressPortion.types.includes('locality')) {
        city = addressPortion.short_name;
      } else if (addressPortion.types.includes('administrative_area_level_1')) {
        state = addressPortion.short_name;
      }
    }
    return { city, state };
  }

  async function fetchLocalOrgs(userLocation) {
    const url = process.env.REACT_APP_FLY_API_URL + '/organizations?' + new URLSearchParams({
      cityName: userLocation.city,
      stateAbrv: userLocation.state,
    }).toString();

    const apiResponse = await fetch(url);
    const localOrgs = await apiResponse.json();

    const updatedLocalOrgs = [];
    await Promise.all(localOrgs.map(async (org) => {
      await geoCodeLocation('address', org.address)
        .then((response) => {
          org['position'] = {
            'lat': response.results[0].geometry.location.lat(),
            'lng': response.results[0].geometry.location.lng(),
          };
          updatedLocalOrgs.push(org);
          // eslint-disable-next-line no-unused-vars
        }).catch(error => { return; });
    }));
    setOrganizations(updatedLocalOrgs);
  }
  return { geoCodeLocation, fetchLocalOrgs, getCityAndState };
}
