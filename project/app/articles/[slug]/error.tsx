// app/articles/[slug]/error.tsx
"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ArticleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Article page error:", error);
  }, [error]);

  return (
    <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Ошибка загрузки статьи
        </h2>
        <p className="text-gray-600 mb-6">
          Произошла ошибка при загрузке статьи. Пожалуйста, попробуйте еще раз.
        </p>
        <div className="space-y-3">
          <Button onClick={reset} className="w-full">
            Попробовать снова
          </Button>
          <Button 
            variant="outline" 
            onClick={() => window.location.href = "/articles"}
            className="w-full"
          >
            Вернуться к статьям
          </Button>
        </div>
      </div>
    </div>
  );
}