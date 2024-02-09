import { readFile } from './app/service/excel.service.mjs';
import { getLocationData } from './app/service/geocoder.service.mjs';
import { writeFile } from './app/service/excel.service.mjs';

async function run() {
  try {
    const inputFile = process.env.INPUT_FILE;
    const addresses = await readFile(inputFile);
    console.log(`Read file, ${addresses} now awailable`);

    try {
      const apiKey = process.env.GEOCODER_API_KEY;
      const geoData = await getLocationData(apiKey, addresses);
      console.log(`Geocoded addresses at ${geoData}`);

      try {
        const outputFile = process.env.OUTPUT_FILE;
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