const express = require('express');
const multer = require('multer');
const xlsx = require('node-xlsx');
const { createClient } = require('@googlemaps/google-maps-services-js');

const app = express();
const port = 3000;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const googleMapsClient = createClient({
  key: process.env.GEOCODER_API_KEY,
});

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const workbook = xlsx.parse(req.file.buffer);
    const addresses = workbook[0].data;

    const results = await Promise.all(
      addresses.map(async (address) => {
        try {
          const response = await googleMapsClient.geocode({
            params: {
              address: address.join(', '),
            },
          });

          const location = response.data.results[0].geometry.location;
          return { address: address.join(', '), lat: location.lat, lon: location.lng };
        } catch (error) {
          return { address: address.join(', '), error: 'Geocoding failed' };
        }
      })
    );

    // Создание Excel-файла с результатами
    const outputWorkbook = xlsx.utils.book_new();
    const outputSheet = xlsx.utils.json_to_sheet(results);
    xlsx.utils.book_append_sheet(outputWorkbook, outputSheet, 'Geocoding Results');
    const outputBuffer = xlsx.write(outputWorkbook, { bookType: 'xlsx', type: 'buffer' });

    // Сохранение файла в папке output
    const outputPath = './output/geocoding_results.xlsx';
    require('fs').writeFileSync(outputPath, outputBuffer);

    res.status(200).send(`Результаты геокодирования сохранены в файле: ${outputPath}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Что-то пошло не так');
  }
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});