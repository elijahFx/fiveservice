import React, { useState, useEffect } from 'react';
import { 
  useGetFilesQuery, 
  useHealthCheckQuery,
  useCreateFolderMutation,
  useDeleteItemMutation 
} from '../../apis/adminsApi';
import FileExplorer from './FileExplorer';
import FileEditor from './FileEditor';
import BuildControls from './BuildControls';
import RedirectManager from './RedirectManager';

const AdminPanel = () => {
  const [currentFolder, setCurrentFolder] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [activeTab, setActiveTab] = useState('files');
  const [breadcrumbs, setBreadcrumbs] = useState(['']);

  const { data: healthData } = useHealthCheckQuery();
  const { data: filesData, refetch: refetchFiles } = useGetFilesQuery(currentFolder);
  const [createFolder] = useCreateFolderMutation();
  const [deleteItem] = useDeleteItemMutation();

  useEffect(() => {
    refetchFiles();
  }, [currentFolder, refetchFiles]);

  const handleFileSelect = (file) => {
    if (file.type === 'directory') {
      // Если это папка - переходим в нее
      const newPath = file.path === '' ? '' : file.path;
      setCurrentFolder(newPath);
      updateBreadcrumbs(newPath);
    } else {
      // Если это файл - открываем редактор
      setSelectedFile(file);
      setActiveTab('editor');
    }
  };

  const updateBreadcrumbs = (folderPath) => {
    if (folderPath === '') {
      setBreadcrumbs(['']);
      return;
    }
    
    const parts = folderPath.split('/').filter(Boolean);
    const newBreadcrumbs = [''];
    let currentPath = '';
    
    for (let i = 0; i < parts.length; i++) {
      currentPath += '/' + parts[i];
      newBreadcrumbs.push(currentPath);
    }
    
    setBreadcrumbs(newBreadcrumbs);
  };

  const handleBreadcrumbClick = (folderPath, index) => {
    setCurrentFolder(folderPath === '' ? '' : folderPath);
    setBreadcrumbs(breadcrumbs.slice(0, index + 1));
  };

  const handleFileSaved = () => {
    refetchFiles();
  };

  const handleBack = () => {
    if (breadcrumbs.length > 1) {
      const newBreadcrumbs = breadcrumbs.slice(0, -1);
      const prevFolder = newBreadcrumbs[newBreadcrumbs.length - 1];
      setCurrentFolder(prevFolder === '' ? '' : prevFolder);
      setBreadcrumbs(newBreadcrumbs);
    }
  };

  const handleCreateFolder = async (folderName) => {
    try {
      const folderPath = currentFolder ? `${currentFolder}/${folderName}` : folderName;
      await createFolder({ folderpath: folderPath }).unwrap();
      refetchFiles();
    } catch (error) {
      console.error('Ошибка при создании папки:', error);
    }
  };

  const handleDeleteItem = async (item) => {
    try {
      await deleteItem({ 
        itempath: item.path, 
        type: item.type 
      }).unwrap();
      refetchFiles();
      
      // Если удалили текущий файл, переходим на вкладку файлов
      if (selectedFile && selectedFile.path === item.path) {
        setSelectedFile(null);
        setActiveTab('files');
      }
    } catch (error) {
      console.error('Ошибка при удалении:', error);
    }
  };

  const getDisplayPath = (path) => {
    return path === '' ? '/' : `/${path}`;
  };

  return (
    <div className="min-h-full bg-gray-900 text-white flex flex-col mt-[11vh] w-screen">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Админ-панель управления файлами</h1>
          <div className="flex items-center gap-4 text-sm">
            <div className={`flex items-center gap-2 ${healthData?.status === 'OK' ? 'text-green-400' : 'text-red-400'}`}>
              <div className={`w-2 h-2 rounded-full ${healthData?.status === 'OK' ? 'bg-green-400' : 'bg-red-400'}`}></div>
              {healthData?.status === 'OK' ? 'Online' : 'Offline'}
            </div>
            {healthData?.uptime && (
              <span className="text-gray-400">
                Uptime: {Math.floor(healthData.uptime / 60)} мин.
              </span>
            )}
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col p-4 space-y-6">
          {/* Quick Actions */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Быстрый доступ</h3>
            <button
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                currentFolder === '' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              onClick={() => {
                setCurrentFolder('');
                setBreadcrumbs(['']);
              }}
            >
              📁 Корень проекта
            </button>
            <button
              className="w-full text-left px-3 py-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors cursor-pointer"
              onClick={() => handleCreateFolder('new-folder')}
            >
              ➕ Создать папку
            </button>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Навигация</h3>
            <button
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'files' 
                  ? 'bg-gray-700 text-white border-l-2 border-blue-500' 
                  : 'text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
              onClick={() => setActiveTab('files')}
            >
              📄 Файлы
            </button>
            <button
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'build' 
                  ? 'bg-gray-700 text-white border-l-2 border-blue-500' 
                  : 'text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
              onClick={() => setActiveTab('build')}
            >
              ⚙️ Сборка
            </button>
            <button
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'redirects' 
                  ? 'bg-gray-700 text-white border-l-2 border-blue-500' 
                  : 'text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
              onClick={() => setActiveTab('redirects')}
            >
              🔄 Редиректы
            </button>
          </nav>

          {/* Breadcrumbs */}
          {breadcrumbs.length > 0 && (
            <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
              <h4 className="text-sm font-semibold text-gray-400 mb-2">Текущая папка:</h4>
              <div className="flex flex-wrap gap-1">
                {breadcrumbs.map((crumb, index) => (
                  <button
                    key={crumb || 'root'}
                    onClick={() => handleBreadcrumbClick(crumb, index)}
                    className={`text-xs px-2 py-1 rounded ${
                      index === breadcrumbs.length - 1 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                    }`}
                  >
                    {getDisplayPath(crumb)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Current File Info */}
          {selectedFile && (
            <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
              <h4 className="text-sm font-semibold text-gray-400 mb-2">Текущий файл:</h4>
              <div className="space-y-1">
                <div className="text-blue-400 font-medium truncate">{selectedFile.name}</div>
                <div className="text-xs text-gray-500 truncate">{getDisplayPath(selectedFile.path)}</div>
                <div className="text-xs text-gray-500">
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </div>
              </div>
            </div>
          )}

          {/* Project Info */}
          <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
            <h4 className="text-sm font-semibold text-gray-400 mb-2">Проект:</h4>
            <div className="text-xs text-gray-300 truncate" title={healthData?.projectRoot}>
              {healthData?.projectRoot || 'Путь к проекту'}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-gray-900">
          {activeTab === 'files' && (
            <FileExplorer
              currentFolder={currentFolder}
              items={filesData?.items || []}
              onItemSelect={handleFileSelect}
              onRefresh={refetchFiles}
              onBack={handleBack}
              onDeleteItem={handleDeleteItem}
              onCreateFolder={handleCreateFolder}
              showBackButton={breadcrumbs.length > 1}
            />
          )}

          {activeTab === 'editor' && selectedFile && (
            <FileEditor
              file={selectedFile}
              onBack={() => setActiveTab('files')}
              onFileSaved={handleFileSaved}
            />
          )}

          {activeTab === 'build' && (
            <BuildControls />
          )}

          {activeTab === 'redirects' && (
            <RedirectManager />
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;