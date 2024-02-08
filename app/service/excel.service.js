const fs = require('fs').promises;
const xlsx = require('xlsx');
const path = require('path');

const inputFilePath = path.join(__dirname, '..', 'assets', 'input', 'input.xlsx');


async function readFile(filePath) {
  try {
    // Чтение файла
    const fileData = await fs.readFile(filePath);
    // Парсинг xlsx файла
    const workbook = xlsx.read(fileData, { type: 'buffer' });
    // Выбор первого листа из книги
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    // Преобразование данных листа в массив массивов, начиная со второй строки
    const data = xlsx.utils.sheet_to_json(sheet, { header: 1, range: 1 });
    // Извлечение данных из первого столбца
    const addresses = data.map(row => row[0]);
    return addresses;
  } catch (error) {
    console.error('Error reading file:', error.message);
    throw error;
  }
}

async function writeFile(geoData, filePath) {

};

async function processFile() {
  try {
    const addresses = await readFile(inputFilePath);
    console.log(addresses);
  } catch (error) {
    console.error('Failed to process file:', error);
  }
}

processFile();
