// const XLSX = require('xlsx');

// function readAddressesFromExcel(filePathInput) {
//   try {
//     const workbook = XLSX.readFile(filePathInput);
//     const worksheet = workbook.Sheets[workbook.SheetNames[0]];
//     return XLSX.utils.sheet_to_json(worksheet);
//   } catch (error) {
//     console.error(`Error reading addresses from Excel: ${error.message}`);
//     return [];
//   }
// }

// function writeGeocodeResultsToExcel(filePathOutput, results) {
//   try {
//     const workbook = XLSX.utils.book_new();
//     const worksheet = XLSX.utils.json_to_sheet(results);
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Geocode Results');
//     XLSX.writeFile(workbook, filePathOutput);
//     console.log(`Geocoded addresses written to ${filePathOutput}`);
//   } catch (error) {
//     console.error(`Error writing geocoded addresses to Excel: ${error.message}`);
//   }
// }

// function writeInvalidAddressesToExcel(filePathInvalid, invalidAddresses) {
//   try {
//     const workbook = XLSX.utils.book_new();
//     const worksheet = XLSX.utils.json_to_sheet(invalidAddresses);
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Invalid Addresses');
//     XLSX.writeFile(workbook, filePathInvalid);
//     console.log(`Invalid addresses written to ${filePathInvalid}`);
//   } catch (error) {
//     console.error(`Error writing invalid addresses to Excel: ${error.message || error}`);
//   }
// }

// module.exports = { readAddressesFromExcel, writeGeocodeResultsToExcel, writeInvalidAddressesToExcel };



const fs = require('fs').promises;
const xlsx = require('xlsx');
const inputFilePath = process.env.INPUT_FILE_PATH;

async function readFile() {
  try {
    // Чтение файла
    const fileData = await fs.readFile(inputFilePath);

    // Парсинг xlsx файла
    const workbook = xlsx.read(fileData, { type: 'buffer' });

    // Выбор первого листа из книги (можно настроить в зависимости от вашего файла)
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Преобразование данных листа в массив объектов
    const data = xlsx.utils.sheet_to_json(sheet);

    // Извлечение адресов из данных
    const addresses = data.map(row => row.address);

    return addresses;
  } catch (error) {
    // Обработка ошибок при чтении файла
    console.error('Error reading file:', error.message);
    throw error;
  }
}

module.exports = readFile;

//обработать файл из inputFilePath и выдать массив адрессов
// обработка ошибок прочтения файла

