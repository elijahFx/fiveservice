import Image from 'next/image';
import { Laptop } from 'lucide-react';

export default function BuybackHero() {
  return (
    <section className="relative py-20 bg-gradient-to-br from-navy-900 to-gray-900 text-white overflow-hidden pt-24 sm:pt-28">
      <div className="absolute inset-0">
        <Image
          src="https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
          alt="Скупка ноутбуков"
          fill
          className="object-cover opacity-20"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center justify-center w-16 h-16 bg-blue-400 rounded-2xl mr-4">
              <Laptop className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              Скупка ноутбуков в Минске
            </h1>
          </div>

          <p className="text-xl text-gray-200 leading-relaxed mb-8">
            Если ваш ноутбук вышел из строя, устарел или перестал использоваться — не выбрасывайте его! В сервисном центре <span className="text-navy-400">Five Service</span> вы можете продать нерабочий ноутбук на запчасти или получить деньги за устройство в любом состоянии. Мы работаем честно, быстро и с официальной гарантией на все услуги.
          </p>
        </div>
      </div>
    </section>
  );
}
