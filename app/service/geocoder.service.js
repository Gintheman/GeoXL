const NodeGeocoder = require('node-geocoder');

const options = {
  provider: process.env.GEOCODER_PROVIDER,
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null,
};

const geocoder = NodeGeocoder(options);

async function geocodeAddress(address) {
  try {
    const res = await geocoder.geocode(address);
    return res.length > 0 ? { latitude: res[0].latitude, longitude: res[0].longitude } : null;
  } catch (err) {
    console.error(err);
    return null;
  }
}

module.exports = { geocodeAddress };
