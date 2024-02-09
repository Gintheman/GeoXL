


// const geoData = {
//   validArray: [
//     {
//       address: 'Агалакова  ул., 66А',
//       latitude: 55.12926,
//       longitude: 61.45161
//     },
//     {
//       address: 'Артиллерийский  пер., 6А',
//       latitude: 55.16004,
//       longitude: 61.43627
//     },
//     {
//       address: 'Генерала Мартынова ул., 14',
//       latitude: 55.21687,
//       longitude: 61.2999
//     },
//     {
//       address: 'Героя России Родионова пр.-т, 12',
//       latitude: 55.16893,
//       longitude: 61.27958
//     },
//     {
//       address: 'Радистов  пер., 1',
//       latitude: 55.17228,
//       longitude: 61.44769
//     },
//     {
//       address: 'Доватора ул., ост. "Колющенко" ',
//       latitude: 55.13724,
//       longitude: 61.40232
//     },
//     {
//       address: 'Революции пл., 1/1',
//       latitude: 54.91739,
//       longitude: 37.42375
//     },
//     {
//       address: 'Ленина пр., 2М',
//       latitude: 56.03699,
//       longitude: 35.95649
//     },
//     {
//       address: 'перечечение ул. Доватора и ул. Степана Разина',
//       latitude: 44.2088,
//       longitude: 42.04307
//     },
//     {
//       address: 'пересечение Дзержинского и Отечественная',
//       latitude: 53.05061,
//       longitude: 31.16964
//     },
//     {
//       address: ' 26 Бакинских Комиссаров ул., 63',
//       latitude: 48.55736,
//       longitude: 39.35284
//     }
//   ],
//   invalidArray: [
//     { address: 'Аношкина ул.,10  (паркинг)' },
//     { address: 'Геологов ул., 7А п. Новосинеглазово' },
//     { address: 'Героя России Кислова наб., 27' },
//     { address: 'пересечение ул. Кирова и пр. Победы' },
//     { address: 'пересечение ул. Дзержинского и ул. Отечественная' },
//     { address: 'пересечение ул. Черкасская и Свердловский пр.' },
//     { address: 'пересечение ул. 3-го Интернационала и пр. Ленина' },
//     { address: 'пересечение ул. Свободы и пр.Ленина ' },
//     { address: '8 Марта ул.,14А п. Новосинеглазово' }
//   ]
// }

const fs = require('fs').promises;
const xlsx = require('xlsx');
const path = require('path');
const getLocationData = require(path.join(__dirname, 'app', 'service', 'geocoder.service.js'))

async function readFile() {
  try {
    const inputFile = process.env.INPUT_FILE;
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

async function writeFile(apiKey, outputFilePath) {
  const workbook = xlsx.utils.book_new();
  const sheetName = 'Addresses';

  // Создаем лист
  const validSheet =  xlsx.utils.json_to_sheet(getLocationData.validArray);

  // Добавляем заголовки и данные в лист
  const headers = [['address', 'latitude', 'longitude']];
  const validArrayData = getLocationData.validArray.map(item => [item.address, item.latitude, item.longitude]);
  xlsx.utils.sheet_add_aoa(validSheet, headers.concat(validArrayData));

  // Сохраняем книгу в файл
  xlsx.utils.book_append_sheet(workbook, validSheet, sheetName);
  xlsx.writeFile(workbook, outputFilePath, { bookSST: true });

  // Выводим данные из invalidArray в консоль:
  const amount = getLocationData.invalidArray.length;
  const invalidAddressesList = getLocationData.invalidArray.map(item => item.address);
  console.log(`Total number of invalid addresses: ${amount}`);
  console.log(`Invalid Addresses List:`);
  console.log(invalidAddressesList);

}

module.exports = {readFile, writeFile};


