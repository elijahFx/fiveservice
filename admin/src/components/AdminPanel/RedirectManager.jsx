import React, { useState } from 'react';
import { useGetRedirectsQuery, useAddRedirectMutation, useDeleteRedirectMutation } from '../../apis/adminsApi';

const RedirectManager = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRedirect, setNewRedirect] = useState({
    from: '',
    to: '',
    type: '301'
  });

  const { data: redirectsData, refetch: refetchRedirects } = useGetRedirectsQuery();
  const [addRedirect, { isLoading: isAdding }] = useAddRedirectMutation();
  const [deleteRedirect, { isLoading: isDeleting }] = useDeleteRedirectMutation();

  const redirects = redirectsData?.redirects || [];

  const handleAddRedirect = async () => {
    if (!newRedirect.from.trim() || !newRedirect.to.trim()) {
      alert('Заполните оба адреса');
      return;
    }

    try {
      await addRedirect(newRedirect).unwrap();
      setNewRedirect({ from: '', to: '', type: '301' });
      setShowAddForm(false);
      alert('Редирект успешно добавлен!');
    } catch (error) {
      alert('Ошибка добавления редиректа: ' + error.data?.error);
    }
  };

  const handleDeleteRedirect = async (index) => {
    if (!confirm('Вы уверены, что хотите удалить этот редирект?')) {
      return;
    }

    try {
      await deleteRedirect(index).unwrap();
      alert('Редирект успешно удален!');
    } catch (error) {
      alert('Ошибка удаления редиректа: ' + error.data?.error);
    }
  };

  const getRedirectTypeLabel = (type) => {
    const types = {
      '301': '301 - Permanent',
      '302': '302 - Temporary',
      '303': '303 - See Other',
      '307': '307 - Temporary Redirect'
    };
    return types[type] || type;
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Управление редиректами</h2>
        <button 
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer"
        >
          ➕ Добавить редирект
        </button>
      </div>

      {/* Add Redirect Form */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl">
            <h3 className="text-lg font-semibold text-white mb-4">Добавить новый редирект</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Тип редиректа
                </label>
                <select
                  value={newRedirect.type}
                  onChange={(e) => setNewRedirect(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="301">301 - Permanent Redirect</option>
                  <option value="302">302 - Temporary Redirect</option>
                  <option value="303">303 - See Other</option>
                  <option value="307">307 - Temporary Redirect</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Откуда (From)
                </label>
                <input
                  type="text"
                  value={newRedirect.from}
                  onChange={(e) => setNewRedirect(prev => ({ ...prev, from: e.target.value }))}
                  placeholder="https://testend.site/about"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center justify-center">
                <span className="text-xl text-gray-400 mx-4">→</span>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Куда (To)
                </label>
                <input
                  type="text"
                  value={newRedirect.to}
                  onChange={(e) => setNewRedirect(prev => ({ ...prev, to: e.target.value }))}
                  placeholder="https://testend2.site/about"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <button 
                onClick={handleAddRedirect}
                disabled={isAdding}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                {isAdding ? 'Добавление...' : 'Добавить редирект'}
              </button>
              <button 
                onClick={() => setShowAddForm(false)}
                className="flex-1 px-4 py-2 bg-gray-600 text-gray-300 rounded-lg hover:bg-gray-500 transition-colors"
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Redirects List */}
      <div className="bg-gray-800 rounded-lg border border-gray-700">
        {redirects.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            Нет добавленных редиректов
          </div>
        ) : (
          <div className="divide-y divide-gray-700">
            {redirects.map((redirect, index) => (
              <div key={index} className="p-4 hover:bg-gray-750 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <span className={`px-2 py-1 text-xs rounded ${
                        redirect.type === '301' ? 'bg-green-600 text-white' :
                        redirect.type === '302' ? 'bg-yellow-600 text-white' :
                        'bg-blue-600 text-white'
                      }`}>
                        {getRedirectTypeLabel(redirect.type)}
                      </span>
                      {redirect.comment && (
                        <span className="text-sm text-gray-400">{redirect.comment}</span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="text-sm text-gray-400 mb-1">Откуда:</div>
                        <div className="text-white font-mono text-sm break-all">{redirect.from}</div>
                      </div>
                      
                      <div className="text-xl text-gray-400">→</div>
                      
                      <div className="flex-1">
                        <div className="text-sm text-gray-400 mb-1">Куда:</div>
                        <div className="text-white font-mono text-sm break-all">{redirect.to}</div>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleDeleteRedirect(redirect.index)}
                    disabled={isDeleting}
                    className="ml-4 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors disabled:opacity-50 text-sm"
                  >
                    Удалить
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Info Panel */}
      <div className="mt-6 bg-blue-900/20 border border-blue-700 rounded-lg p-4">
        <h4 className="text-blue-400 font-semibold mb-2">Информация о редиректах:</h4>
        <ul className="text-sm text-blue-300 space-y-1">
          <li>• <strong>301</strong> - Постоянный редирект (рекомендуется для SEO)</li>
          <li>• <strong>302</strong> - Временный редирект</li>
          <li>• <strong>303</strong> - See Other (для POST запросов)</li>
          <li>• <strong>307</strong> - Temporary Redirect (сохранение метода запроса)</li>
        </ul>
      </div>
    </div>
  );
};

export default RedirectManager;