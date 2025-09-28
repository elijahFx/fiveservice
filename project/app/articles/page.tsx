import { Metadata } from "next";
import ArticlesList from "@/components/articles/ArticlesList";
import { getAllArticles } from "@/lib/api/articles";
import FAQ from "@/components/common/FAQ";

export const metadata: Metadata = {
  title: "Статьи о ремонте техники | FiveService",
  description:
    "Полезные статьи и советы по ремонту ноутбуков, компьютеров и другой техники в Минске.",
};

export default async function ArticlesPage() {
  const articles = await getAllArticles();
  
  return (
    <div className="min-h-screen bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center ">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Полезные статьи
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Советы, инструкции и полезная информация по ремонту и обслуживанию
            техники
          </p>
        </div>
       {/* @ts-ignore */}
        <ArticlesList articles={articles} />
        <FAQ />
      </div>
    </div>
  );
}