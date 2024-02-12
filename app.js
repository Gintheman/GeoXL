import { readFile, writeFile } from './app/service/excel.service.js';
import { getLocationData } from './app/service/geocoder.service.js';
import { getCurrentDate, convertDate } from './app/service/domain/domain-service.js';
import dotenv from 'dotenv';
dotenv.config();

const inputFile = process.env.INPUT_FILE;
const outputFile = process.env.OUTPUT_FILE;
const apiKey = process.env.GEOCODER_API_KEY;
const currentDate = getCurrentDate();
const formattedDate = convertDate(currentDate);

async function run() {
  try {
    const addresses = await readFile(inputFile);
    
    try {
      const geoData = await getLocationData(apiKey, addresses);
      console.log(`Geocoded addresses at geoData`);

      try {
        await writeFile(geoData, outputFile, formattedDate);
        console.log('New output created.');
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