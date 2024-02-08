// const { geocodeAddressFromFile } = require('./app/service/geocoder.service');
// const { readAddressesFromExcel, writeGeocodeResultsToExcel, writeInvalidAddressesToExcel } = require('./app/service/excel.service');
// require('dotenv').config();

// const inputFilePath = process.env.INPUT_FILE_PATH;
// const outputFilePath = process.env.OUTPUT_FILE_PATH;
// const invalidFilePath = process.env.INVALID_FILE_PATH;

// async function processAddresses(filePathInput, filePathOutput, filePathInvalid) {
//   if (!filePathInput) {
//     console.error('File path is not defined.');
//     return;
//   }

//   const addresses = readAddressesFromExcel(filePathInput);
//   const geocodeResults = [];
//   const invalidAddresses = [];

//   for (const [i, address] of addresses.entries()) {
//     const result = await geocodeAddressFromFile(filePathInput);
//     if (result && !result.error) {
//       geocodeResults.push(result);
//     } else {
//       invalidAddresses.push(address);
//     }
//   }

//   writeGeocodeResultsToExcel(filePathOutput, geocodeResults);
//   writeInvalidAddressesToExcel(filePathInvalid, invalidAddresses);
// }


// processAddresses(filePathInput, filePathOutput, filePathInvalid)
//   .then(() => console.log('Geocoding process completed.'))
//   .catch(err => console.error(err));




const readFile = require('./app/service/excel.service');
const inputFilePath = process.env.INPUT_FILE_PATH;

readFile(inputFilePath)
  .then(addresses => {
    console.log('Addresses:', addresses);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });
