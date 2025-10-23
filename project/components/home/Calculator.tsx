import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";
import Link from "next/link";

const Calculator = () => {
  return (
    <section className="py-20 bg-navy-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Онлайн-диагностика
          </h2>
        </div>

        <div className="text-center">
          <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 max-w-2xl mx-auto shadow-sm">
            <p className="text-lg text-gray-700 mb-6">
              Узнайте в чём может быть проблема и примерную стоимость ремонта за
              1 минуту
            </p>
            <Link href="/diagnostics">
              <Button className="bg-navy-600 hover:bg-navy-700 px-4 sm:px-6 md:px-8 py-3 text-lg w-full sm:w-auto whitespace-normal sm:whitespace-nowrap text-center">
                <ArrowRight className="w-5 h-5 mr-2 flex-shrink-0" />
                <span className="text-center">Пройти онлайн-диагностику</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Calculator;