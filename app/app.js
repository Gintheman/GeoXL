const NodeGeocoder = require('node-geocoder');
const XLSX = require('xlsx');
const options = {
  provider: 'yandex', //find alternative API
  httpAdapter: 'https',
  apiKey: 'YOUR_API_KEY',  //.env
  formatter: null
};
const geocoder = NodeGeocoder(options);
const workbook = XLSX.readFile('addresses.xlsx');
const worksheet = workbook.Sheets[workbook.SheetNames[0]];
const addresses = XLSX.utils.sheet_to_json(worksheet);
for (let i = 0; i < addresses.length; i++) {
  const address = addresses[i].address;
  geocoder.geocode(address)
    .then((res) => {
      const latitude = res[0].latitude;
      const longitude = res[0].longitude;
      worksheet[`C${i + 2}`] = { t: 'n', v: latitude };
      worksheet[`D${i + 2}`] = { t: 'n', v: longitude };
      XLSX.writeFile(workbook, 'addresses.xlsx');
    })
    .catch((err) => {
      console.log(err);
    });
}