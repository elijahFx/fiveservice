import React, { useState } from "react";
import { useUpdateClaimMutation } from '../../apis/claimsApi';

export const ClaimRow = ({ claim, index, onEdit, onDelete, onView }) => {
  const [status, setStatus] = useState(claim.status);
  const [updateClaim] = useUpdateClaimMutation();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const toggleStatus = async () => {
    const newStatus = status === 'processed' ? 'pending' : 'processed';
    try {
      await updateClaim({ 
        id: claim.id, 
        status: newStatus 
      }).unwrap();
      setStatus(newStatus);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const getStatusToggle = () => {
    const isProcessed = status === 'processed';
    
    return (
      <button
        onClick={toggleStatus}
        className={`relative inline-flex items-center h-6 cursor-pointer rounded-full w-11 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
          isProcessed ? 'bg-green-500' : 'bg-red-500'
        }`}
      >
        <span className="sr-only">
          {isProcessed ? 'Отметить как необработанное' : 'Отметить как обработанное'}
        </span>
        <span
          className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ${
            isProcessed ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
        <span className="absolute text-xs font-medium text-white pointer-events-none">
          <span className={`${isProcessed ? 'opacity-0' : 'opacity-100'} ml-1`}>×</span>
          <span className={`${isProcessed ? 'opacity-100' : 'opacity-0'} mr-1`}>✓</span>
        </span>
      </button>
    );
  };

  const getStatusText = () => {
    return status === 'processed' ? 'Обработано' : 'Не обработано';
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors duration-150 border border-gray-200">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border border-gray-200 text-center">
        {index + 1}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border border-gray-200 text-center">
        {claim.name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border border-gray-200 text-center">
        {claim.phone}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-200 text-center">
        {formatDate(claim.createdAt)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap border border-gray-200 text-center">
        <div className="flex flex-col items-center space-y-2">
          {getStatusToggle()}
          <span className={`text-xs font-medium ${
            status === 'processed' ? 'text-green-600' : 'text-red-600'
          }`}>
            {getStatusText()}
          </span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium border border-gray-200">
        <div className="flex items-center justify-center space-x-3">
          <button
            onClick={() => onView(claim.id)}
            className="cursor-pointer text-blue-600 hover:text-blue-900 transition-colors duration-200 px-3 py-1 border border-blue-200 rounded-md hover:bg-blue-50"
          >
            Просмотр
          </button>
          <button
            onClick={() => onDelete(claim.id)}
            className="cursor-pointer text-red-600 hover:text-red-900 transition-colors duration-200 px-3 py-1 border border-red-200 rounded-md hover:bg-red-50"
          >
            Удалить
          </button>
        </div>
      </td>
    </tr>
  );
};