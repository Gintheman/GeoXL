import { readFile, writeFile } from './app/service/excel.service.js';
import { getLocationData } from './app/service/geocoder.service.js';
import dotenv from 'dotenv';
dotenv.config();

const inputFile = process.env.INPUT_FILE;
const outputFile = process.env.OUTPUT_FILE;
const apiKey = process.env.GEOCODER_API_KEY;

async function run() {
  console.log(`Input file: ${process.env.INPUT_FILE}`);
console.log(`Output file: ${process.env.OUTPUT_FILE}`);
console.log(`API Key: ${process.env.GEOCODER_API_KEY}`);

  try {
    const addresses = await readFile(inputFile);
    console.log(`Read file, ${addresses.length} addresses now available`);

    try {
      const geoData = await getLocationData(apiKey, addresses);
      console.log(`Geocoded addresses at ${JSON.stringify(geoData)}`);

      try {
        await writeFile(geoData, outputFile);
        console.log('Output.xlsx created.');
      } catch (writeError) {
        console.error('Writing error:', writeError.message);
      }
    } catch (geocodeError) {
      console.error('Geocoding error:', geocodeError.message);
    }
  } catch (readError) {
    console.error('Reading error:', readError.message);
  }
}

run();