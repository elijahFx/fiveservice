import React, { useState, useEffect } from "react";
import { ChevronDown, Save, ArrowLeft } from "lucide-react";
import { useUpdateClaimMutation } from "../../apis/claimsApi";
import { useParams } from "react-router";

const ClaimsDetails = ({ data }) => {
  const { number } = useParams();

  const [responsibleEmployee, setResponsibleEmployee] = useState("");
  const [updateClaim, { isLoading, error }] = useUpdateClaimMutation();

  // Загружаем ответственного при появлении данных
  useEffect(() => {
    if (data?.responsibleEmployee) {
      setResponsibleEmployee(data.responsibleEmployee);
    }
  }, [data]);

  const handleResponsibleChange = async (e) => {
    const newEmployee = e.target.value;
    setResponsibleEmployee(newEmployee);

    try {
      await updateClaim({
        id: number,
        responsibleEmployee: newEmployee,
      }).unwrap();
    } catch (error) {
      console.error("Ошибка при обновлении ответственного работника:", error);
      // Здесь можно вывести уведомление
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Колонка 1 */}
        <div className="space-y-5">
          {/* Претензия */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
              Предмет претензии
            </label>
            <p className="text-gray-800 font-medium">{data?.goodName}</p>
          </div>

          {/* Причина */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
              Причина составления претензии
            </label>
            <p className="text-gray-800 font-medium">{data?.problem}</p>
          </div>

          {/* Требование */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
              Заявленное требование
            </label>
            <p className="text-gray-800 font-medium">{data?.request}</p>
          </div>

          {/* Дата договора */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
              Дата заключения договора
            </label>
            <p className="text-gray-800 font-medium">
              {(data?.contractDate)}
            </p>
          </div>
        </div>

        {/* Колонка 2 */}
        <div className="space-y-5">
          {/* Стоимость */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
              Цена/стоимость
            </label>
            <p className="text-gray-800 font-medium">{data?.cost}</p>
          </div>

          {/* Моральный вред */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
              Моральный вред
            </label>
            <p className="text-gray-800 font-medium">{data?.moral}</p>
          </div>

          {/* Дата составления */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
              Дата составления претензии
            </label>
            <p className="text-gray-800 font-medium">
              {(data?.createdAt)}
            </p>
          </div>

          {/* Ответственный */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
              Ответственный работник
            </label>
            <div className="relative">
              <select
                value={responsibleEmployee}
                onChange={handleResponsibleChange}
                className="appearance-none w-full bg-white border border-gray-200 rounded-md px-4 py-2 pr-8 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
               


              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Блок недостатков */}
      <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-100">
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          Недостатки
        </label>
        <p className="text-gray-800">{data?.problem}</p>
      </div>

      {/* Кнопки */}
      <div className="flex justify-end space-x-3 mt-8">
        <button className="flex items-center px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:ring-2 focus:ring-gray-300 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Вернуться
        </button>
        <button className="flex items-center px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-colors">
          <Save className="mr-2 h-4 w-4" />
          Сохранить
        </button>
      </div>
    </div>
  );
};

export default ClaimsDetails;
