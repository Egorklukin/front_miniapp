// Функция для загрузки изображения и преобразования его в Data URL
export async function loadImageAsDataUrl(url) {
    // Загрузка изображения через fetch API
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  
    // Преобразование ответа в Blob
    const blob = await response.blob();
  
    // Создание объекта URL для Blob
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      
      reader.readAsDataURL(blob);
    });
  }
  
  // Пример использования функции
  const url = "https://sun9-72.userapi.com/impg/HEghjuVWqC9GibGCTKg3kvSo5qzlhfm9gC7D0w/7g0KwwP-J8g.jpg?size=2560x1920&quality=95&sign=cd9d289e8c2f71d67999311257908139&type=album";
  
  loadImageAsDataUrl(url).then(dataUri => {
    console.log(dataUri); // Выводим Data URL в консоль
  }).catch(error => {
    console.error("Ошибка при загрузке изображения:", error);
  });