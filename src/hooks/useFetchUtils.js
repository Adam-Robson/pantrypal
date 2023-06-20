import { useGoogleContext } from '../context/GoogleContext';

export default function useFetchUtils() {
  const {
    setLoading,
    setOrigin,
    setOrganizations,
  } = useGoogleContext();

  async function geoCodeLocation(locationType, location) {
    try {
      setLoading(true);
      let geocoder = new window.google.maps.Geocoder();

      const query = {};
      query[locationType] = location;
      return await geocoder.geocode(query, function(result, status) {
        if (status === window.google.maps.GeocoderStatus.OK) {
          setLoading(false);
          return result;
        } else { 
          return 'Geocode error: ' + status; 
        }
      });
    } catch (err) {
      console.error('1. This error was generated from fetch utils: ' + err);
    }
  }


  function getCityAndState(data) {
    try {
      setLoading(true);
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
      setLoading(false);
      return { city, state };
    } catch (err) {
      console.error('2. This error was generated from fetch utils: ' + err);
    }
  }

  async function fetchLocalOrgs(userLocation) {
    try {
      setLoading(true);
      const url = process.env.REACT_APP_FLY_API_URL + '/organizations?' + new URLSearchParams({
        cityName: userLocation.city,
        stateAbrv: userLocation.state,
      }).toString();

      const apiResponse = await fetch(url);
      const localOrgs = await apiResponse.json();

      const updatedLocalOrgs = [];
      await Promise.all(localOrgs.map(async (org) => {
        await geoCodeLocation('address', org.address).then((response) => {
          org['position'] = {
            'lat': response.results[0].geometry.location.lat(),
            'lng': response.results[0].geometry.location.lng(),
          };
          const freshOrgs = [{ ...updatedLocalOrgs }, { org }];
          setLoading(false);
          setOrganizations(freshOrgs);
          // updatedLocalOrgs.push(org);
          // eslint-disable-next-line no-unused-vars
        }).catch(error => { return; });
      }));
    } catch (err) {
      console.error('3. This error was generated from fetch utils: ' + err);
    }
  }

  return { geoCodeLocation, fetchLocalOrgs, getCityAndState };
}
