import React, { useState } from 'react';
import { useCreateFileMutation } from '../../apis/adminsApi';

const FileExplorer = ({ currentFolder, items, onItemSelect, onRefresh, onBack, showBackButton }) => {
  const [showCreateFile, setShowCreateFile] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const [createFile, { isLoading: isCreating }] = useCreateFileMutation();

  const handleCreateFile = async () => {
    if (!newFileName.trim()) return;

    const filepath = `${currentFolder}/${newFileName}`;
    try {
      await createFile({ filepath, content: '' }).unwrap();
      setNewFileName('');
      setShowCreateFile(false);
      onRefresh();
    } catch (error) {
      alert('Ошибка создания файла: ' + error.data?.error);
    }
  };

  const getFileIcon = (item) => {
    if (item.type === 'directory') {
      return '📁';
    }

    const ext = item.name.split('.').pop()?.toLowerCase();
    const icons = {
      js: '📄',
      jsx: '⚛️',
      ts: '📘',
      tsx: '⚛️',
      css: '🎨',
      scss: '🎨',
      json: '📋',
      md: '📝',
      html: '🌐',
      py: '🐍',
      java: '☕',
      cpp: '⚙️',
      h: '📗',
    };
    return icons[ext] || '📄';
  };

  // Сортируем: сначала папки, потом файлы
  const sortedItems = [...(items || [])].sort((a, b) => {
    if (a.type !== b.type) {
      return a.type === 'directory' ? -1 : 1;
    }
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          {showBackButton && (
            <button 
              onClick={onBack}
              className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer"
            >
              ← Назад
            </button>
          )}
          <h2 className="text-2xl font-bold text-white">
            {currentFolder === '/app' ? '/app' : 
             currentFolder === '/components' ? '/components' : 
             currentFolder}
          </h2>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={onRefresh}
            className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer"
          >
            🔄 Обновить
          </button>
          <button 
            onClick={() => setShowCreateFile(true)}
            disabled={isCreating}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 cursor-pointer"
          >
            ➕ Новый файл
          </button>
        </div>
      </div>

      {/* Create File Modal */}
      {showCreateFile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold text-white mb-4">Создать новый файл</h3>
            <input
              type="text"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              placeholder="Введите имя файла (например: MyComponent.tsx)"
              onKeyPress={(e) => e.key === 'Enter' && handleCreateFile()}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              autoFocus
            />
            <div className="flex gap-2 mt-4">
              <button 
                onClick={handleCreateFile}
                disabled={isCreating}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {isCreating ? 'Создание...' : 'Создать'}
              </button>
              <button 
                onClick={() => setShowCreateFile(false)}
                className="flex-1 px-4 py-2 bg-gray-600 text-gray-300 rounded-lg hover:bg-gray-500 transition-colors cursor-pointer"
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Items List */}
      <div className="bg-gray-800 rounded-lg border border-gray-700">
        {!items || items.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            Папка пуста
          </div>
        ) : (
          <div className="divide-y divide-gray-700">
            {sortedItems.map((item) => (
              <div
                key={item.path}
                onClick={() => onItemSelect(item)}
                className="p-4 hover:bg-gray-750 cursor-pointer transition-colors group flex items-center gap-3"
              >
                <span className="text-xl">
                  {getFileIcon(item)}
                </span>
                <div className="flex-1 min-w-0">
                  <div className={`font-medium group-hover:text-blue-400 transition-colors truncate ${
                    item.type === 'directory' ? 'text-yellow-400' : 'text-white'
                  }`}>
                    {item.name}
                    {item.type === 'directory' && ' 📁'}
                  </div>
                  <div className="text-sm text-gray-400 truncate">
                    {item.path}
                  </div>
                  <div className="flex gap-4 text-xs text-gray-500 mt-1">
                    <span>{item.type === 'directory' ? 'Папка' : `${(item.size / 1024).toFixed(1)} KB`}</span>
                    <span>
                      {new Date(item.modified).toLocaleDateString('ru-RU')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FileExplorer;