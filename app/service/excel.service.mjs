import fs from 'fs/promises';
import * as xlsx from 'xlsx';

export async function readFile(inputFile) {
  try {
    
    const fileData = await fs.readFile(inputFile);
    
    const workbook = xlsx.read(fileData, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    
    const data = xlsx.utils.sheet_to_json(sheet, { header: 1, range: 1 });
    const addresses = data.map(row => row[0]);

    return addresses;
  } catch (error) {
    console.error('Error reading file:', error.message);
    throw error;
  }
}

export async function writeFile(geoData, outputFile) {
  const workbook = xlsx.utils.book_new();

  const validSheet =  xlsx.utils.json_to_sheet(geoData.validArray);
  xlsx.utils.book_append_sheet(workbook, validSheet, 'Valid Addresses');

  const headers = [['address', 'latitude', 'longitude']];
  const validArrayData = geoData.validArray.map(item => [item.address, item.latitude, item.longitude]);
  xlsx.utils.sheet_add_aoa(validSheet, [headers,...validArrayData]);

  xlsx.utils.book_append_sheet(workbook, validSheet, 'Valid Addresses');
  xlsx.writeFile(workbook, outputFile, { bookSST: true });

  const amount = geoData.invalidArray.length;
  const invalidAddressesList = getLocationData.invalidArray.map(item => item.address);
  console.log(`Total number of invalid addresses: ${amount}`);
  console.log(`Invalid Addresses List:`);
  console.log(invalidAddressesList);

}


