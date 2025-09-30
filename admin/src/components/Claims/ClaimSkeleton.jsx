import React from "react";
// Скелетон загрузки
export const ClaimsSkeleton = () => {
  return (
    <>
      {[...Array(5)].map((_, index) => (
        <tr key={index} className="animate-pulse">
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="h-4 bg-gray-200 rounded w-8"></div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="h-4 bg-gray-200 rounded w-32"></div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="h-4 bg-gray-200 rounded w-32"></div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="h-6 bg-gray-200 rounded w-20"></div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex space-x-2">
              <div className="h-8 bg-gray-200 rounded w-20"></div>
              <div className="h-8 bg-gray-200 rounded w-24"></div>
              <div className="h-8 bg-gray-200 rounded w-16"></div>
            </div>
          </td>
        </tr>
      ))}
    </>
  );
};