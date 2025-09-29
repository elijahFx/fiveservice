import React, { useState } from "react";
import ClaimsElement from "./ClaimsElement";
import { useDeleteClaimsMutation } from "../../apis/claimsApi";
import TopElement from "../TopElement";

export default function ClaimsTable({ data }) {
  const [filters, setFilters] = React.useState({
    id: "",
    date: "",
    sellerName: "",
    consumerFullName: "",
    type: "",
    request: "",
    responsibleEmployee: "",
    status: "",
  });

  const [selectedIds, setSelectedIds] = useState([]);
  const [deleteClaims] = useDeleteClaimsMutation();

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(filteredData?.map((item) => item.id) || []);
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectItem = (id, isChecked) => {
    if (isChecked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((itemId) => itemId !== id));
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) return;

    try {
      await deleteClaims(selectedIds).unwrap();
      setSelectedIds([]);
    } catch (error) {
      console.error("Ошибка при удалении претензий:", error);
    }
  };

  const filteredData = data?.filter((item) => {
    return Object.keys(filters).every((key) => {
      if (!filters[key]) return true;
      return String(item[key])
        .toLowerCase()
        .includes(filters[key].toLowerCase());
    });
  });

  return (
    <div className="bg-gray-100 min-h-screen overflow-x-auto">
      <TopElement
        type="claims"
        selectedItems={selectedIds}
        onDelete={handleDeleteSelected}
      />

      <table className="w-full bg-white border border-gray-200 rounded-lg text-xs">
        <thead className="bg-gray-50">
          {/* Заголовки столбцов */}
          <tr>
            <th className="px-2 py-2 text-center font-medium text-gray-500 uppercase border-b w-[3%]">
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={
                  selectedIds.length > 0 &&
                  selectedIds.length === filteredData?.length
                }
              />
            </th>
            <th className="px-2 py-2 text-center font-medium text-gray-500 uppercase border-b w-[5%]">
              №
            </th>
            <th className="px-2 py-2 text-center font-medium text-gray-500 uppercase border-b w-[8%]">
              Дата
            </th>
            <th className="px-2 py-2 text-center font-medium text-gray-500 uppercase border-b w-[12%]">
              Продавец
            </th>
            <th className="px-2 py-2 text-center font-medium text-gray-500 uppercase border-b w-[12%]">
              Потребитель
            </th>
            <th className="px-2 py-2 text-center font-medium text-gray-500 uppercase border-b w-[15%]">
              Причина претензии
            </th>
            <th className="px-2 py-2 text-center font-medium text-gray-500 uppercase border-b w-[15%]">
              Требование
            </th>
            <th className="px-2 py-2 text-center font-medium text-gray-500 uppercase border-b w-[12%]">
              Ответственный
            </th>
            <th className="px-2 py-2 text-center font-medium text-gray-500 uppercase border-b w-[10%]">
              Статус
            </th>
            <th className="px-2 py-2 text-center font-medium text-gray-500 uppercase border-b w-[5%]">
              Действия
            </th>
          </tr>

          {/* Строка фильтров */}
          <tr className="bg-gray-100">
            <td className="px-1 py-1 border-b"></td>
            <td className="px-1 py-1 border-b">
              <input
                type="text"
                placeholder="..."
                className="w-full px-1 py-0.5 border rounded text-xs"
                value={filters.id}
                onChange={(e) => handleFilterChange("id", e.target.value)}
              />
            </td>
            <td className="px-1 py-1 border-b">
              <input
                type="text"
                placeholder="..."
                className="w-full px-1 py-0.5 border rounded text-xs"
                value={filters.date}
                onChange={(e) => handleFilterChange("date", e.target.value)}
              />
            </td>
            <td className="px-1 py-1 border-b">
              <input
                type="text"
                placeholder="..."
                className="w-full px-1 py-0.5 border rounded text-xs"
                value={filters.sellerName}
                onChange={(e) =>
                  handleFilterChange("sellerName", e.target.value)
                }
              />
            </td>
            <td className="px-1 py-1 border-b">
              <input
                type="text"
                placeholder="..."
                className="w-full px-1 py-0.5 border rounded text-xs"
                value={filters.consumerFullName}
                onChange={(e) =>
                  handleFilterChange("consumerFullName", e.target.value)
                }
              />
            </td>
            <td className="px-1 py-1 border-b">
              <input
                type="text"
                placeholder="..."
                className="w-full px-1 py-0.5 border rounded text-xs"
                value={filters.type}
                onChange={(e) => handleFilterChange("type", e.target.value)}
              />
            </td>
            <td className="px-1 py-1 border-b">
              <input
                type="text"
                placeholder="..."
                className="w-full px-1 py-0.5 border rounded text-xs"
                value={filters.request}
                onChange={(e) => handleFilterChange("request", e.target.value)}
              />
            </td>
            <td className="px-1 py-1 border-b">
              <select
                value={filters.responsibleEmployee}
                onChange={(e) =>
                  handleFilterChange("responsibleEmployee", e.target.value)
                }
                className="w-full px-1 py-0.5 border rounded text-xs"
              >
                <option value="">Все</option>
              </select>
            </td>
            <td className="px-1 py-1 border-b">
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange("status", e.target.value)}
                className="w-full px-1 py-0.5 border rounded text-xs"
              >
                <option value="">Все</option>
               
              </select>
            </td>
            <td className="px-1 py-1 border-b flex justify-center items-center border-collapse">
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 rounded text-xs px-2 py-1"
              >
                Найти
              </button>
            </td>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {filteredData?.map((item, index) => {
            return (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-2 py-2 text-center text-gray-500 border-b">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(item.id)}
                    onChange={(e) =>
                      handleSelectItem(item.id, e.target.checked)
                    }
                  />
                </td>
                <ClaimsElement
                  number={item.number}
                  date={item.createdAt}
                  seller={item.sellerName}
                  consumer={item.consumerFullName}
                  reason={item.type}
                  demand={item.request}
                  responsible={item.responsibleEmployee}
                  status={item.status}
                  id={item.id}
                />
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
