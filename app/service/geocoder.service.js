// testArr = [
//     'Агалакова  ул., 66А',
//     'Аношкина ул.,10  (паркинг)',
//     'Артиллерийский  пер., 6А',
//     'Генерала Мартынова ул., 14',
//     'Геологов ул., 7А п. Новосинеглазово',
//     'Героя России Родионова пр.-т, 12',
//     'Героя России Кислова наб., 27',
//     'Радистов  пер., 1',
//     'Доватора ул., ост. "Колющенко" ',
//     'Революции пл., 1/1',
//     'Ленина пр., 2М',
//     'перечечение ул. Доватора и ул. Степана Разина',
//     'пересечение ул. Кирова и пр. Победы',
//     'пересечение ул. Дзержинского и ул. Отечественная',
//     'пересечение ул. Черкасская и Свердловский пр.',
//     'пересечение ул. 3-го Интернационала и пр. Ленина',
//     'пересечение ул. Свободы и пр.Ленина ',
//     'пересечение Дзержинского и Отечественная',
//     ' 26 Бакинских Комиссаров ул., 63',
//     '8 Марта ул.,14А п. Новосинеглазово'
//   ];

  const fetch = require('node-fetch');
  const path = require('path');
  const excelService = require(path.join(__dirname, 'app', 'service', 'excel.service'));
  
  async function getLocationData(apiKey) {
    try {
      const geocodeUrl = "https://geocode.search.hereapi.com/v1/geocode";
      const addresses = await excelService.readFile();
      let resultArray = { validArray: [], invalidArray: [] };
  
      for (const address of addresses) {
        const params = new URLSearchParams({
          q: address,
          apiKey: apiKey,
        });
  
        try {
          const response = await fetch(`${geocodeUrl}?${params}`);
          const data = await response.json();
  
          if (response.ok) {
            // Обрабатываем результат геокодирования (в данном случае, выводим координаты)
            if (data.items && data.items.length > 0) {
              const location = data.items[0].position;
              resultArray.validArray.push({
                address: address,
                latitude: location.lat,
                longitude: location.lng
              });
            } else {
              resultArray.invalidArray.push({
                address: address
              });
            }
          } else {
            console.error(`Ошибка при геокодировании адреса ${address}: ${data.title}`);
            resultArray.invalidArray.push({
              address: address
            });
          }
  
        } catch (error) {
          console.error(`Произошла ошибка: ${error.message}`);
          resultArray.invalidArray.push({
            address: address
          });
        }
      }
  
      console.log(resultArray);
    } catch (error) {
      console.error('Error getting location data:', error.message);
      throw error;
    }
  }
  
  module.exports = getLocationData;
  


