import React from "react";

export // Скелетон загрузки
const ArticlesSkeleton = () => {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 space-y-2">
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
          <div className="h-16 bg-gray-200 rounded mb-4"></div>
          <div className="flex space-x-2">
            <div className="w-20 h-8 bg-gray-200 rounded-md"></div>
            <div className="w-24 h-8 bg-gray-200 rounded-md"></div>
            <div className="w-20 h-8 bg-gray-200 rounded-md"></div>
          </div>
        </div>
      ))}
    </div>
  );
};