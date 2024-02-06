const { geocodeAddress } = require('./service/geocoder.service');
const { readAddressesFromExcel, writeGeocodeResultsToExcel } = require('./service/excel.service');

async function processAddresses(filePath) {
  const addresses = readAddressesFromExcel(filePath);
  const geocodeResults = [];

  for (const address of addresses) {
    const result = await geocodeAddress(address.address);
    geocodeResults.push(result);
  }

  writeGeocodeResultsToExcel(filePath, geocodeResults);
}

const filePath = 'addresses.xlsx';
processAddresses(filePath)
  .then(() => console.log('Geocoding process completed.'))
  .catch(err => console.error(err));
