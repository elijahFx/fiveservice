import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetClaimByIdQuery, useUpdateClaimMutation } from '../../apis/claimsApi';

const SingleClaim = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: claim, isLoading, error, refetch } = useGetClaimByIdQuery(id);
  const [updateClaim, { isLoading: isUpdating }] = useUpdateClaimMutation();
  
  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [status, setStatus] = useState(claim?.status || 'pending');

   const handlePrint = () => {
    const printContent = document.getElementById('printable-area');
    const originalContents = document.body.innerHTML;
    
    document.body.innerHTML = printContent.innerHTML;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload(); // Перезагружаем для восстановления функциональности
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Обновляем локальный статус при загрузке данных
  useEffect(() => {
    if (claim) {
      setStatus(claim.status);
    }
  }, [claim]);

  const handleStatusChange = async (newStatus) => {
    try {
      await updateClaim({ 
        id: claim.id, 
        status: newStatus 
      }).unwrap();
      setStatus(newStatus);
      setIsEditingStatus(false);
      // Обновляем данные после успешного изменения
      refetch();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleStatusClick = () => {
    setIsEditingStatus(true);
  };

  const handleStatusBlur = () => {
    setIsEditingStatus(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleStatusBlur();
    } else if (e.key === 'Escape') {
      setStatus(claim.status);
      setIsEditingStatus(false);
    }
  };

  const getStatusDisplay = () => {
    if (isEditingStatus) {
      return (
        <select
          value={status}
          onChange={(e) => handleStatusChange(e.target.value)}
          onBlur={handleStatusBlur}
          onKeyDown={handleKeyPress}
          autoFocus
          disabled={isUpdating}
          className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer disabled:opacity-50"
        >
          <option value="pending">Не обработано</option>
          <option value="processed">Обработано</option>
        </select>
      );
    }

    const isProcessed = status === 'processed';
    return (
      <div className="flex items-center space-x-2">
        <div
          onClick={handleStatusClick}
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium cursor-pointer transition-all duration-200 ${
            isProcessed
              ? 'bg-green-100 text-green-800 hover:bg-green-200 border border-green-200'
              : 'bg-red-100 text-red-800 hover:bg-red-200 border border-red-200'
          } ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
          title="Нажмите для изменения статуса"
        >
          {isProcessed ? 'Обработано' : 'Не обработано'}
          {!isUpdating && (
            <svg 
              className="w-3 h-3 ml-1 opacity-70" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </div>
        {isUpdating && (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
        )}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <svg className="w-6 h-6 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-medium text-red-800">
              Ошибка при загрузке заявки
            </h3>
          </div>
          <p className="text-red-600 mb-4">
            {error.data?.error || 'Не удалось загрузить данные заявки'}
          </p>
          <button
            onClick={() => navigate('/claims')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Вернуться к списку заявок
          </button>
        </div>
      </div>
    );
  }

  if (!claim) {
    return (
      <div className="mx-auto p-6">
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Заявка не найдена</h3>
          <p className="mt-1 text-sm text-gray-500">Заявка с ID {id} не существует или была удалена.</p>
          <button
            onClick={() => navigate('/claims')}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Вернуться к списку заявок
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 w-full">
      {/* Заголовок и кнопка назад */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Заявка #{id.slice(0, 8)}...</h1>
          <p className="text-sm text-gray-500 mt-1">Детальная информация по заявке</p>
        </div>
        <button
          onClick={() => navigate('/claims')}
          className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Назад к списку
        </button>
      </div>

      {/* Карточка с информацией о заявке */}
      <div className="bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden">
        {/* Статус */}
       <div id="printable-area">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">Статус заявки:</span>
            {getStatusDisplay()}
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Основная информация */}
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Номер заявки</h3>
                <p className="text-lg font-semibold text-gray-900">{id}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Дата создания</h3>
                <p className="text-lg text-gray-900">{formatDate(claim.createdAt)}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Имя обращающегося</h3>
                <p className="text-lg text-gray-900">{claim.name}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Телефон</h3>
                <p className="text-lg text-gray-900">
                  <a 
                    href={`tel:${claim.phone}`} 
                    className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                  >
                    {claim.phone}
                  </a>
                </p>
              </div>
            </div>

            {/* Суть обращения */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Суть обращения</h3>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 min-h-[200px]">
                {claim.content ? (
                  <p className="text-gray-900 leading-relaxed whitespace-pre-wrap">
                    {claim.content}
                  </p>
                ) : (
                  <p className="text-gray-400 italic">Описание отсутствует</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Дополнительная информация */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>ID заявки: {claim.id}</span>
            <span>Создано: {formatDate(claim.updatedAt || claim.createdAt)}</span>
          </div>
        </div>
      </div>
      </div>

      {/* Действия */}
      <div className="mt-6 flex items-center justify-end space-x-4">
        <button
          onClick={() => navigate('/claims')}
          className="cursor-pointer px-6 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          Закрыть
        </button>
        <button
          onClick={handlePrint}
          className="cursor-pointer px-6 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
        >
          Печать
        </button>
      </div>

      <style>
        {`
          @media print {
            .no-print {
              display: none !important;
            }
            body {
              margin: 0;
              padding: 20px;
              font-size: 12pt;
            }
            #printable-area {
              width: 100% !important;
              margin: 0 !important;
              padding: 0 !important;
              box-shadow: none !important;
            }
            .print\\:shadow-none {
              box-shadow: none !important;
            }
            .print\\:border-2 {
              border-width: 2px !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default SingleClaim;