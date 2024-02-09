import fetch from 'node-fetch';

export async function getLocationData(apiKey, addresses) {
  
  try {
    const geocodeUrl = "https://geocode.search.hereapi.com/v1/geocode";
    let resultArray = { validArray: [], invalidArray: [] };
    const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const randNum = getRandomNumber(7, 20);
    
    for (let i = 0; i < addresses.length; i += randNum) {
      
      const selectedAddresses = addresses.slice(i, i + randNum);

      for (const address of selectedAddresses) {
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
            resultArray.validArray.push({
              address: address,
              latitude: location.lat,
              longitude: location.lng
            });
          } else {
            resultArray.invalidArray.push({
              address: address
            });
          }
        } else {
          console.error(`Geocoding error getlocation ${address}: ${data.title}`);
          resultArray.invalidArray.push({
            address: address
          });
        }

      } catch (error) {
        console.error(`Fetch/response error: ${error.message}`);
        resultArray.invalidArray.push({
          address: address
        });
      }
    }
    if (i + randNum < addresses.length) {
      const delay = getRandomNumber(1200, 4200); // 2-7 minutes in milliseconds
      console.log(`Waiting for ${delay / 1000} seconds before the next batch of requests...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
    return resultArray;
  } catch (error) {
    console.error('Error getting location data:', error.message);
    throw error;
  }
}