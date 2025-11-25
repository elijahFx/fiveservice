"use client";

import { useState } from "react";
import { Users, Award, Heart, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import CallbackModal from "@/components/modal/CallbackModal";

const AboutHero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="py-20 bg-gradient-to-br from-navy-600 to-navy-800 text-white pt-24 sm:pt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center justify-center w-16 h-16 bg-blue-400 rounded-2xl mr-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">О нас</h1>
          </div>

          <blockquote className="text-lg md:text-xl text-gray-200 leading-relaxed mb-8 italic">
            &quotОправдать доверие людей, которые обращаются к тебе за помощью, это,
            наверное, одно из самых достойных чувств, которые может испытывать
            уважающая себя личность.&ldquo
            <footer className="text-base text-blue-300 mt-4 not-italic">
              — Директор сервисного центра {`«Five Service»`}
            </footer>
          </blockquote>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mx-auto mb-4">
                <Award className="w-8 h-8 text-blue-400" />
              </div>
              <div className="text-3xl font-bold mb-2">13+ лет</div>
              <div className="text-gray-300">опыта работы</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-400" />
              </div>
              <div className="text-3xl font-bold mb-2">25.000+</div>
              <div className="text-gray-300">довольных клиентов</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mx-auto mb-4">
                <Heart className="w-8 h-8 text-blue-400" />
              </div>
              <div className="text-3xl font-bold mb-2">5.0</div>
              <div className="text-gray-300">средняя оценка</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Button
          size="lg"
          className="bg-white text-navy-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-xl"
        >
          <Phone className="w-5 h-5 mr-2" />
          <a href="tel:+375297349077">Позвонить</a>
        </Button>

        <Button
          size="lg"
          variant="outline"
          className="border-white bg-white text-navy-600 hover:bg-navy-600 hover:text-white px-8 py-4 text-lg font-semibold"
          onClick={() => setIsModalOpen(true)}
        >
          <MessageCircle className="w-5 h-5 mr-2" />
          Оставить заявку
        </Button>
      </div>

      {/* Modal */}
      <CallbackModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default AboutHero;
