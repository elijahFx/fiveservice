// Функция валидации email
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Функция валидации телефона (более гибкая)
export const validatePhone = (phone: string): boolean => {
  // Убираем все пробелы и проверяем формат
  const cleanPhone = phone.replace(/\s/g, '');
  const phoneRegex = /^\+375(25|29|33|44)\d{7}$/;
  return phoneRegex.test(cleanPhone);
};

// Упрощенная функция форматирования телефона
export const formatPhone = (value: string): string => {
  // Удаляем все нецифровые символы, кроме +
  let numbers = value.replace(/[^\d+]/g, '');
  
  // Если первый символ не +, добавляем его
  if (!numbers.startsWith('+')) {
    numbers = '+' + numbers.replace(/\D/g, '');
  }
  
  // Ограничиваем максимальную длину
  numbers = numbers.slice(0, 13); // +375291234567
  
  let formatted = '';
  
  for (let i = 0; i < numbers.length; i++) {
    if (i === 0) {
      formatted += numbers[i]; // +
    } else if (i === 4) {
      formatted += ' ' + numbers[i]; // +375 2
    } else if (i === 6) {
      formatted += ' ' + numbers[i]; // +375 29 1
    } else if (i === 9) {
      formatted += ' ' + numbers[i]; // +375 29 123 4
    } else if (i === 11) {
      formatted += ' ' + numbers[i]; // +375 29 123 45 6
    } else {
      formatted += numbers[i];
    }
  }
  
  return formatted;
};

// Альтернативная версия форматирования - более простая
export const formatPhoneSimple = (value: string): string => {
  // Удаляем все нецифровые символы
  const numbers = value.replace(/\D/g, '');
  
  // Ограничиваем длину
  const limited = numbers.slice(0, 12);
  
  // Форматируем по шаблону
  if (limited.length <= 3) {
    return limited ? `+${limited}` : '';
  } else if (limited.length <= 5) {
    return `+${limited.slice(0, 3)} ${limited.slice(3)}`;
  } else if (limited.length <= 8) {
    return `+${limited.slice(0, 3)} ${limited.slice(3, 5)} ${limited.slice(5)}`;
  } else if (limited.length <= 10) {
    return `+${limited.slice(0, 3)} ${limited.slice(3, 5)} ${limited.slice(5, 8)} ${limited.slice(8)}`;
  } else {
    return `+${limited.slice(0, 3)} ${limited.slice(3, 5)} ${limited.slice(5, 8)} ${limited.slice(8, 10)} ${limited.slice(10)}`;
  }
};

// Функция для очистки телефона перед отправкой на сервер
export const cleanPhone = (phone: string): string => {
  return phone.replace(/\s/g, '');
};

// Функция для проверки и подсветки невалидных полей
export const getFieldValidity = (name: string, value: string): boolean => {
  switch (name) {
    case 'email':
      return value === '' || validateEmail(value);
    case 'phone':
      return value === '' || validatePhone(value);
    default:
      return true;
  }
};