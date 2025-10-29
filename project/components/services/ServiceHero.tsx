import Image from 'next/image';

const ServiceHero = () => {
  return (
    <section className="relative py-20 bg-navy-900 text-white overflow-hidden pt-24 sm:pt-28">
      <div className="absolute inset-0">
        <Image
          src="/serviceslight.webp"
          alt="Ремонт ноутбуков"
          fill
          className="object-cover opacity-30"
        />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl text-center sm:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Наши услуги по ремонту ноутбуков и компьютеров
          </h1>
          <p className="text-xl text-gray-200 leading-relaxed">
            Профессиональный ремонт любой сложности с использованием 
            качественных комплектующих и современного диагностического оборудования
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServiceHero;