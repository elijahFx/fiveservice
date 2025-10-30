import React, { useState } from 'react';
import { useCreateFileMutation, useCreateFolderMutation, useDeleteItemMutation } from '../../apis/adminsApi';
import SeoEditorModal from './SeoEditorModal';

const FileExplorer = ({ 
  currentFolder, 
  items, 
  onItemSelect, 
  onRefresh, 
  onBack, 
  onDeleteItem,
  onCreateFolder,
  showBackButton 
}) => {
  const [showCreateFile, setShowCreateFile] = useState(false);
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [showSeoEditor, setShowSeoEditor] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const [newFolderName, setNewFolderName] = useState('');
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, item: null });
  
  const [createFile, { isLoading: isCreatingFile }] = useCreateFileMutation();
  const [createFolder, { isLoading: isCreatingFolder }] = useCreateFolderMutation();
  const [deleteItem, { isLoading: isDeleting }] = useDeleteItemMutation();

  const handleCreateFile = async () => {
    if (!newFileName.trim()) return;

    const filepath = currentFolder ? `${currentFolder}/${newFileName}` : newFileName;
    try {
      await createFile({ filepath, content: '' }).unwrap();
      setNewFileName('');
      setShowCreateFile(false);
      onRefresh();
    } catch (error) {
      alert('Ошибка создания файла: ' + error.data?.error);
    }
  };

  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) return;

    const folderpath = currentFolder ? `${currentFolder}/${newFolderName}` : newFolderName;
    try {
      await createFolder({ folderpath }).unwrap();
      setNewFolderName('');
      setShowCreateFolder(false);
      onRefresh();
    } catch (error) {
      alert('Ошибка создания папки: ' + error.data?.error);
    }
  };

  const handleDeleteItem = async (item) => {
    if (confirm(`Вы уверены, что хотите удалить "${item.name}"?`)) {
      try {
        await deleteItem({ 
          itempath: item.path, 
          type: item.type 
        }).unwrap();
        onRefresh();
      } catch (error) {
        alert('Ошибка удаления: ' + error.data?.error);
      }
    }
  };

  const handleContextMenu = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      item: item
    });
  };

  const closeContextMenu = () => {
    setContextMenu({ visible: false, x: 0, y: 0, item: null });
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
      less: '🎨',
      json: '📋',
      md: '📝',
      html: '🌐',
      htm: '🌐',
      xml: '📄',
      py: '🐍',
      java: '☕',
      cpp: '⚙️',
      c: '⚙️',
      h: '📗',
      php: '🐘',
      rb: '💎',
      go: '🔵',
      rs: '🦀',
      sql: '🗃️',
      svg: '🖼️',
      png: '🖼️',
      jpg: '🖼️',
      jpeg: '🖼️',
      gif: '🖼️',
      ico: '🖼️',
      webp: '🖼️',
      mp4: '🎥',
      mp3: '🎵',
      wav: '🎵',
      pdf: '📕',
      doc: '📘',
      docx: '📘',
      xls: '📗',
      xlsx: '📗',
      ppt: '📙',
      pptx: '📙',
      zip: '📦',
      rar: '📦',
      tar: '📦',
      gz: '📦',
      txt: '📄',
      env: '⚙️',
      gitignore: '⚙️',
      yml: '⚙️',
      yaml: '⚙️',
      lock: '🔒',
    };
    return icons[ext] || '📄';
  };

  const getFileType = (item) => {
    if (item.type === 'directory') return 'Папка';
    
    const ext = item.name.split('.').pop()?.toLowerCase();
    const types = {
      js: 'JavaScript',
      jsx: 'React Component',
      ts: 'TypeScript',
      tsx: 'React TypeScript',
      css: 'CSS',
      scss: 'SCSS',
      less: 'LESS',
      json: 'JSON',
      md: 'Markdown',
      html: 'HTML',
      htm: 'HTML',
      py: 'Python',
      java: 'Java',
      cpp: 'C++',
      c: 'C',
      php: 'PHP',
      rb: 'Ruby',
      go: 'Go',
      rs: 'Rust',
      sql: 'SQL',
    };
    return types[ext] || 'Файл';
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Сортируем: сначала папки, потом файлы
  const sortedItems = [...(items || [])].sort((a, b) => {
    if (a.type !== b.type) {
      return a.type === 'directory' ? -1 : 1;
    }
    return a.name.localeCompare(b.name);
  });

  const getDisplayPath = (path) => {
    return path === '' ? '/' : `/${path}`;
  };

  return (
    <div className="p-6" onClick={closeContextMenu}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          {showBackButton && (
            <button 
              onClick={onBack}
              className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer flex items-center gap-2"
            >
              <span>←</span>
              <span>Назад</span>
            </button>
          )}
          <div>
            <h2 className="text-2xl font-bold text-white">
              {currentFolder === '' ? 'Корень проекта' : getDisplayPath(currentFolder)}
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              {sortedItems.length} элементов
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setShowSeoEditor(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer flex items-center gap-2"
          >
            <span>📊</span>
            <span>SEO</span>
          </button>
          <button 
            onClick={() => setShowCreateFolder(true)}
            disabled={isCreatingFolder}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 cursor-pointer flex items-center gap-2"
          >
            <span>📁</span>
            <span>Новая папка</span>
          </button>
          <button 
            onClick={() => setShowCreateFile(true)}
            disabled={isCreatingFile}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 cursor-pointer flex items-center gap-2"
          >
            <span>📄</span>
            <span>Новый файл</span>
          </button>
          <button 
            onClick={onRefresh}
            className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer flex items-center gap-2"
          >
            <span>🔄</span>
            <span>Обновить</span>
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
                disabled={isCreatingFile || !newFileName.trim()}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {isCreatingFile ? 'Создание...' : 'Создать'}
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

      {/* Create Folder Modal */}
      {showCreateFolder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold text-white mb-4">Создать новую папку</h3>
            <input
              type="text"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              placeholder="Введите имя папки"
              onKeyPress={(e) => e.key === 'Enter' && handleCreateFolder()}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              autoFocus
            />
            <div className="flex gap-2 mt-4">
              <button 
                onClick={handleCreateFolder}
                disabled={isCreatingFolder || !newFolderName.trim()}
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
              >
                {isCreatingFolder ? 'Создание...' : 'Создать'}
              </button>
              <button 
                onClick={() => setShowCreateFolder(false)}
                className="flex-1 px-4 py-2 bg-gray-600 text-gray-300 rounded-lg hover:bg-gray-500 transition-colors cursor-pointer"
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SEO Editor Modal */}
      <SeoEditorModal
        folder={currentFolder}
        isOpen={showSeoEditor}
        onClose={() => setShowSeoEditor(false)}
        onSave={onRefresh}
      />

      {/* Context Menu */}
      {contextMenu.visible && contextMenu.item && (
        <div 
          className="fixed bg-gray-800 border border-gray-600 rounded-lg shadow-lg z-50 py-2 min-w-48"
          style={{ left: contextMenu.x, top: contextMenu.y }}
        >
          <button
            onClick={() => {
              onItemSelect(contextMenu.item);
              closeContextMenu();
            }}
            className="w-full text-left px-4 py-2 text-white hover:bg-gray-700 transition-colors cursor-pointer"
          >
            📂 Открыть
          </button>
          <button
            onClick={() => {
              handleDeleteItem(contextMenu.item);
              closeContextMenu();
            }}
            className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700 transition-colors cursor-pointer"
          >
            🗑️ Удалить
          </button>
          <div className="border-t border-gray-600 my-1"></div>
          <div className="px-4 py-2 text-xs text-gray-400">
            {contextMenu.item.name}
          </div>
        </div>
      )}

      {/* Items List */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        {!items || items.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            <div className="text-4xl mb-4">📁</div>
            <div>Папка пуста</div>
            <div className="text-sm mt-2">Создайте новый файл или папку</div>
          </div>
        ) : (
          <div className="divide-y divide-gray-700">
            {sortedItems.map((item) => (
              <div
                key={item.path}
                onClick={() => onItemSelect(item)}
                onContextMenu={(e) => handleContextMenu(e, item)}
                className="p-4 hover:bg-gray-750 cursor-pointer transition-colors group flex items-center gap-4"
              >
                <span className="text-2xl flex-shrink-0">
                  {getFileIcon(item)}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <div className={`font-medium group-hover:text-blue-400 transition-colors truncate ${
                      item.type === 'directory' ? 'text-yellow-400' : 'text-white'
                    }`}>
                      {item.name}
                    </div>
                    {item.type === 'directory' && (
                      <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">Папка</span>
                    )}
                  </div>
                  <div className="text-sm text-gray-400 truncate mt-1">
                    {getDisplayPath(item.path)}
                  </div>
                  <div className="flex gap-4 text-xs text-gray-500 mt-2">
                    <span>{getFileType(item)}</span>
                    <span>{formatFileSize(item.size)}</span>
                    <span>Изменен: {formatDate(item.modified)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteItem(item);
                    }}
                    disabled={isDeleting}
                    className="p-2 text-red-400 hover:bg-red-600 hover:text-white rounded transition-colors disabled:opacity-50"
                    title="Удалить"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Stats */}
      <div className="mt-4 flex justify-between items-center text-sm text-gray-400">
        <div>
          Папок: {sortedItems.filter(item => item.type === 'directory').length} | 
          Файлов: {sortedItems.filter(item => item.type === 'file').length}
        </div>
        <div>
          Общий размер: {formatFileSize(sortedItems.reduce((total, item) => total + item.size, 0))}
        </div>
      </div>
    </div>
  );
};

export default FileExplorer;