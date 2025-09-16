/**
 * Утилиты для работы с картами и геолокацией
 */

export interface Address {
  street: string;
  city: string;
  country?: string;
  postalCode?: string;
}

/**
 * Форматирует адрес для передачи в приложения карт
 * @param address - объект с компонентами адреса
 * @returns отформатированная строка адреса
 */
export const formatAddressForMaps = (address: Address): string => {
  const parts = [
    address.street,
    address.city,
    address.country,
    address.postalCode
  ].filter(Boolean);
  
  return encodeURIComponent(parts.join(', '));
};

/**
 * Определяет тип устройства для выбора подходящего приложения карт
 */
export const getDeviceType = (): 'ios' | 'android' | 'desktop' => {
  if (typeof window === 'undefined') return 'desktop';
  
  const userAgent = window.navigator.userAgent.toLowerCase();
  
  if (/iphone|ipad|ipod/.test(userAgent)) {
    return 'ios';
  } else if (/android/.test(userAgent)) {
    return 'android';
  }
  
  return 'desktop';
};

/**
 * Генерирует URL для открытия адреса в картах в зависимости от платформы
 * @param address - адрес для отображения
 * @param deviceType - тип устройства
 * @returns URL для открытия карт
 */
export const generateMapsUrl = (address: string, deviceType: 'ios' | 'android' | 'desktop'): string => {
  const encodedAddress = encodeURIComponent(address);
  
  switch (deviceType) {
    case 'ios':
      // Apple Maps (основное) с fallback на Google Maps
      return `maps://maps.apple.com/?q=${encodedAddress}`;
    
    case 'android':
      // Google Maps для Android
      return `geo:0,0?q=${encodedAddress}`;
    
    case 'desktop':
    default:
      // Google Maps в браузере для десктопа
      return `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
  }
};

/**
 * Генерирует fallback URL для Google Maps в браузере
 * @param address - адрес для отображения
 * @returns URL Google Maps для браузера
 */
export const generateFallbackMapsUrl = (address: string): string => {
  const encodedAddress = encodeURIComponent(address);
  return `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
};

/**
 * Открывает адрес в системном приложении карт с обработкой ошибок
 * @param address - адрес для отображения
 * @param onError - callback для обработки ошибок (опционально)
 */
export const openInMaps = async (
  address: string, 
  onError?: (error: string) => void
): Promise<void> => {
  try {
    const deviceType = getDeviceType();
    const mapsUrl = generateMapsUrl(address, deviceType);
    const fallbackUrl = generateFallbackMapsUrl(address);
    
    // Для мобильных устройств пытаемся открыть нативное приложение
    if (deviceType === 'ios' || deviceType === 'android') {
      // Создаем невидимый iframe для попытки открытия нативного приложения
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = mapsUrl;
      document.body.appendChild(iframe);
      
      // Устанавливаем таймер для fallback
      const fallbackTimer = setTimeout(() => {
        // Если нативное приложение не открылось, открываем в браузере
        window.open(fallbackUrl, '_blank');
        document.body.removeChild(iframe);
      }, 2000);
      
      // Обработчик для успешного открытия нативного приложения
      const handleVisibilityChange = () => {
        if (document.hidden) {
          // Приложение карт открылось, отменяем fallback
          clearTimeout(fallbackTimer);
          document.body.removeChild(iframe);
          document.removeEventListener('visibilitychange', handleVisibilityChange);
        }
      };
      
      document.addEventListener('visibilitychange', handleVisibilityChange);
      
      // Альтернативный метод для iOS
      if (deviceType === 'ios') {
        setTimeout(() => {
          window.location.href = mapsUrl;
        }, 100);
      }
    } else {
      // Для десктопа сразу открываем в браузере
      window.open(fallbackUrl, '_blank');
    }
    
  } catch (error) {
    console.error('Ошибка при открытии карт:', error);
    
    // Fallback: открываем Google Maps в браузере
    const fallbackUrl = generateFallbackMapsUrl(address);
    window.open(fallbackUrl, '_blank');
    
    if (onError) {
      onError('Не удалось открыть приложение карт. Открываем в браузере.');
    }
  }
};

/**
 * Хук для работы с картами в React компонентах
 */
export const useMaps = () => {
  const openAddress = (address: string | Address) => {
    const addressString = typeof address === 'string' 
      ? address 
      : formatAddressForMaps(address);
    
    openInMaps(addressString);
  };
  
  return { openAddress };
};