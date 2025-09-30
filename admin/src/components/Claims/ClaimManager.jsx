import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useGetAllClaimsQuery,
  useUpdateClaimMutation,
  useDeleteClaimsMutation,
} from '../../apis/claimsApi';
import { ClaimsSkeleton } from './ClaimSkeleton';
import { ClaimRow } from './ClaimRow';

const ClaimsManager = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [editingClaim, setEditingClaim] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const { data: claims = [], isLoading, error, refetch } = useGetAllClaimsQuery();
  const [updateClaim, { isLoading: isUpdating }] = useUpdateClaimMutation();
  const [deleteClaim, { isLoading: isDeleting }] = useDeleteClaimsMutation();

  // Фильтрация и поиск заявок
  const filteredClaims = useMemo(() => {
    return claims.filter(claim => {
      const matchesSearch = 
        claim.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        claim.phone?.includes(searchTerm) ||
        claim.content?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = 
        statusFilter === 'all' || 
        claim.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [claims, searchTerm, statusFilter]);

  console.log(filteredClaims);
  

  const handleEdit = (claim) => {
    setEditingClaim(claim);
  };

  const handleSave = async (id, claimData) => {
    try {
      await updateClaim({ id, ...claimData }).unwrap();
      setEditingClaim(null);
    } catch (error) {
      console.error('Error updating claim:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteClaim(id).unwrap();
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting claim:', error);
    }
  };

  const handleView = (id) => {
    navigate(`/claims/${id}`);
  };

  const stats = useMemo(() => {
    const total = claims.length;
    const processed = claims.filter(claim => claim.status === 'processed').length;
    const pending = total - processed;
    
    return { total, processed, pending };
  }, [claims]);

  if (error) {
    return (
      <div className="mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-sm font-medium text-red-800">
              Ошибка при загрузке заявок
            </h3>
          </div>
          <p className="mt-2 text-sm text-red-600">
            {error.data?.error || 'Не удалось загрузить список заявок'}
          </p>
          <button
            onClick={refetch}
            className="mt-3 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto p-6">
      {/* Заголовок и статистика */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Заявки</h1>
          <p className="text-sm text-gray-500 mt-1">
            Всего: {stats.total} | Обработано: {stats.processed} | В ожидании: {stats.pending}
          </p>
        </div>
        
        <button
          onClick={refetch}
          className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Обновить
        </button>
      </div>

      {/* Фильтры и поиск */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Поиск */}
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Поиск
            </label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Поиск по имени, телефону или содержанию..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Фильтр по статусу */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Статус
            </label>
            <select
              id="status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Все заявки</option>
              <option value="pending">Не обработано</option>
              <option value="processed">Обработано</option>
            </select>
          </div>
        </div>
      </div>

      {/* Таблица */}
      <div className="bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center border border-gray-200">
                  №
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center border border-gray-200">
                  Имя
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center border border-gray-200">
                  Телефон
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center border border-gray-200">
                  Дата создания
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center border border-gray-200">
                  Статус
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center border border-gray-200">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <ClaimsSkeleton />
              ) : filteredClaims.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">Заявки не найдены</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {searchTerm || statusFilter !== 'all' 
                        ? 'Попробуйте изменить параметры поиска' 
                        : 'Заявки еще не созданы'
                      }
                    </p>
                  </td>
                </tr>
              ) : (
                filteredClaims.map((claim, index) => (
                  <ClaimRow
                    key={claim.id}
                    claim={claim}
                    index={filteredClaims.length - index - 1}
                    onEdit={handleEdit}
                    onDelete={setDeleteConfirm}
                    onView={handleView}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Модальное окно подтверждения удаления */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-lg leading-6 font-medium text-gray-900 mt-2">
                Удалить заявку?
              </h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Вы уверены, что хотите удалить эту заявку? Это действие нельзя отменить.
                </p>
              </div>
              <div className="flex items-center justify-center space-x-3 mt-4">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="px-4 py-2 bg-white text-gray-700 text-sm font-medium rounded-md border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                >
                  Отмена
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  disabled={isDeleting}
                  className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  {isDeleting ? 'Удаление...' : 'Удалить'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClaimsManager;