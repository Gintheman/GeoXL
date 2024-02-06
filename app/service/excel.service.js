const XLSX = require('xlsx');

function readAddressesFromExcel(filePath) {
  const workbook = XLSX.readFile(filePath);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  return XLSX.utils.sheet_to_json(worksheet);
}

function writeGeocodeResultsToExcel(filePath, results) {
  const workbook = XLSX.readFile(filePath);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];

  results.forEach((result, i) => {
    if (result) {
      worksheet[`C${i + 2}`] = { t: 'n', v: result.latitude };
      worksheet[`D${i + 2}`] = { t: 'n', v: result.longitude };
    }
  });

  XLSX.writeFile(workbook, filePath);
}

module.exports = { readAddressesFromExcel, writeGeocodeResultsToExcel };