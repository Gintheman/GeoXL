// const NodeGeocoder = require('node-geocoder');
// const XLSX = require('xlsx');
// require('dotenv').config();

// const filePathInput = process.env.FILE_PATH_INPUT;



// const options = {
//   provider: process.env.GEOCODER_PROVIDER,
//   httpAdapter: 'https',
//   apiKey: process.env.GEOCODER_API_KEY,
//   appId: process.env.GEOCODER_APP_ID,
//     formatter: null,
// };

// const geocoder = NodeGeocoder(options);

// async function geocodeAddressFromFile(filePathInput) {
//   try {
//     if (!filePathInput) {
//       throw new Error('File path is not defined.');
//     }

//     const workbook = XLSX.readFile(filePathInput);
//     if (!workbook.SheetNames || workbook.SheetNames.length === 0) {
//       throw new Error('No sheets found in the workbook.');
//     }

//     const worksheet = workbook.Sheets[workbook.SheetNames[0]];
//     const addresses = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });

//     const geocodeResults = [];
//     const invalidAddresses = [];

//     for (const [i, addressRow] of addresses.entries()) {
//       const address = addressRow[0];

//       if (address) {
//         const result = await geocoder.geocode(address);
//         if (result.length > 0) {
//           geocodeResults.push({ latitude: result[0].latitude, longitude: result[0].longitude, address });
//         } else {
//           invalidAddresses.push({ address });
//         }
//       }
//     }

//     return { geocodeResults, invalidAddresses };
//   } catch (err) {
//     console.error(`Error reading or geocoding addresses: ${err.message}`);
//     return { error: err.message };
//   }
// }

// module.exports = { geocodeAddressFromFile };
