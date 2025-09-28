import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { formatDateToDDMMYYYY } from "@/lib/utils/dates.ts";
import { Article } from "@/lib/api/articles";

const ArticlesList = ({ articles }: Article[]) => {

  return (
    <section className="py-6 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article: Article) => (
            <Card
              key={article.id}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={article.preview}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-navy-600 transition-colors">
                  {article.title}
                </h3>

                <p className="text-gray-600 mb-4 leading-relaxed">
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-gray-700">
                      {formatDateToDDMMYYYY(article.createdAt)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span className="text-gray-700">
                      {article.readTime} минут
                    </span>
                  </div>
                </div>

                <Link
                  href={`/articles/${article.id}`}
                  className="inline-flex items-center text-navy-600 font-medium hover:text-navy-700 transition-colors"
                >
                  Читать статью
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <Button className="bg-navy-600 hover:bg-navy-700 px-8 py-3">
            Загрузить еще статьи
          </Button>
        </div>
        {/* Load More Button */}
      </div>
    </section>
  );
};

export default ArticlesList;
