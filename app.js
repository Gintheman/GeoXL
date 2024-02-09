const  {Geocoder}  = require('node-geocoder');
const path = require('path');
const excelService = require(path.join(__dirname, 'app', 'service', 'excel.service'));
const getLocationData = require(path.join(__dirname,'app', 'service', 'geocoder.service'));

async function run() {
  const inputFilePath = process.env.INPUT_FILE;
  const apiKey = process.env.GEOCODER_API_KEY;

  try {
    // 1. Чтение файла
    const addresses = await excelService.readFile(inputFilePath);

    // 2. Получение данных о местоположении
    
    const geoData = await getLocationData(apiKey, addresses);

    // 3. Запись данных в файл
    const outputFilePath = process.env.OUTPUT_FILE;
    await excelService.writeFile(geoData, outputFilePath);

    console.log('Процесс завершен успешно.');
  } catch (error) {
    console.error('Произошла ошибка:', error.message);
  }
}

// Вызываем основную функцию
run();