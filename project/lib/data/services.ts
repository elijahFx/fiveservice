export interface Service {
  id: string;
  title: string;
  description: string;
  basePrice: number;
  timeEstimate: string;
  category: string;
  features: string[];
  icon: string;
}

export const services: Service[] = [
  {
    id: 'screen-replacement',
    title: 'Замена экранов',
    description: 'Замена разбитых и неисправных матриц любых размеров и разрешений',
    basePrice: 80,
    timeEstimate: '1-2 дня',
    category: 'Экраны',
    features: ['Диагностика', 'Подбор матрицы', 'Профессиональная установка', 'Гарантия 6 месяцев'],
    icon: 'monitor'
  },
  {
    id: 'cleaning',
    title: 'Чистка от пыли',
    description: 'Профессиональная чистка системы охлаждения и замена термопасты',
    basePrice: 35,
    timeEstimate: '2-4 часа',
    category: 'Обслуживание',
    features: ['Полная разборка', 'Чистка радиаторов', 'Замена термопасты', 'Тестирование'],
    icon: 'hard-drive'
  },
  // Add more services as needed
];

export function getServiceById(id: string): Service | undefined {
  return services.find(service => service.id === id);
}

export function getServicesByCategory(category: string): Service[] {
  if (!category || category === 'Все') {
    return services;
  }
  return services.filter(service => service.category === category);
}