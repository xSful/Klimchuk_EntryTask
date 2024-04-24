import {encoded, translations} from './data.js'

function decodeFields(encoded, translations) {
    const cosntKeys = ['groupId', 'service', 'formatSize', 'ca']; // поля, которые нужно оставить в изначальном виде
  
    let uniqueIds = new Set(); // уникальные id 
  
    let decodedList = encoded.map(item => {
      let decodedItem = {};
  
      for (let key in item) {
        if (key.endsWith('Id') && !cosntKeys.includes(key)) {
          if (item[key] !== null && translations.hasOwnProperty(item[key])) {
            uniqueIds.add(item[key]); // добавляем уникальные id
          }
          decodedItem[key] = translations[item[key]] !== undefined ? translations[item[key]] : item[key];
        } else {
          decodedItem[key] = item[key];
        }
      }
  
      return decodedItem;
    });

    uniqueIds = [...uniqueIds]; // преобразуем в список
  
    return {
      decodedList, // Расшифрованный список
      uniqueIds, // Список уникальных id
    };
  }

  console.log(decodeFields(encoded, translations));