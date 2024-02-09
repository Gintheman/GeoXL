import fetch from 'node-fetch';

export async function getLocationData(apiKey, addresses) {
  try {
    const geocodeUrl = "https://geocode.search.hereapi.com/v1/geocode";
    let result = { validArray: [], invalidArray: [] };

    for (const address of addresses) {
      const params = new URLSearchParams({
        q: address,
        apiKey: apiKey,
      });

      try {
        const response = await fetch(`${geocodeUrl}?${params}`);
        const data = await response.json();

        if (response.ok) {
          if (data.items && data.items.length > 0) {
            const location = data.items[0].position;
            result.validArray.push({
              address: address,
              latitude: location.lat,
              longitude: location.lng
            });
          } else {
            result.invalidArray.push({
              address: address
            });
          }
        } else {
          console.error(`Geocoding error ${address}: ${data.title}`);
          result.invalidArray.push({
            address: address
          });
        }

      } catch (error) {
        console.error(`Fetch/response error: ${error.message}`);
        result.invalidArray.push({
          address: address
        });
      }
    }

    console.log(result);
    return result;
  } catch (error) {
    console.error('Error getting location data:', error.message);
    throw error;
  }
}