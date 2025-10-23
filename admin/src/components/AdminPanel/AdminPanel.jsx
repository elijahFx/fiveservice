import React, { useState, useEffect } from 'react';
import { useGetFilesQuery, useHealthCheckQuery } from '../../apis/adminsApi';
import FileExplorer from './FileExplorer';
import FileEditor from './FileEditor';
import BuildControls from './BuildControls';
import RedirectManager from './RedirectManager';

const AdminPanel = () => {
  const [currentFolder, setCurrentFolder] = useState('/app');
  const [selectedFile, setSelectedFile] = useState(null);
  const [activeTab, setActiveTab] = useState('files');
  const [breadcrumbs, setBreadcrumbs] = useState(['/app']);

  const { data: healthData } = useHealthCheckQuery();
  const { data: filesData, refetch: refetchFiles } = useGetFilesQuery(currentFolder);

  useEffect(() => {
    refetchFiles();
  }, [currentFolder, refetchFiles]);

  const handleFileSelect = (file) => {
    if (file.type === 'directory') {
      // Если это папка - переходим в нее
      setCurrentFolder(file.path);
      setBreadcrumbs(prev => [...prev, file.path]);
    } else {
      // Если это файл - открываем редактор
      setSelectedFile(file);
      setActiveTab('editor');
    }
  };

  const handleFolderSelect = (folderPath) => {
    setCurrentFolder(folderPath);
    // Обновляем breadcrumbs
    const parts = folderPath.split('/').filter(Boolean);
    const newBreadcrumbs = [''];
    for (let i = 0; i < parts.length; i++) {
      newBreadcrumbs.push('/' + parts.slice(0, i + 1).join('/'));
    }
    setBreadcrumbs(newBreadcrumbs);
  };

  const handleBreadcrumbClick = (folderPath, index) => {
    setCurrentFolder(folderPath);
    setBreadcrumbs(breadcrumbs.slice(0, index + 1));
  };

  const handleFileSaved = () => {
    refetchFiles();
  };

  const handleBack = () => {
    if (breadcrumbs.length > 1) {
      const newBreadcrumbs = breadcrumbs.slice(0, -1);
      const prevFolder = newBreadcrumbs[newBreadcrumbs.length - 1];
      setCurrentFolder(prevFolder);
      setBreadcrumbs(newBreadcrumbs);
    }
  };

  return (
    <div className="h-fit bg-gray-900 text-white flex flex-col mt-[11vh] w-screen">
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
          {/* Folder Selector */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Быстрый доступ</h3>
            <button
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                currentFolder === '/app' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              onClick={() => {
                setCurrentFolder('/app');
                setBreadcrumbs(['/app']);
              }}
            >
              📁 /app
            </button>
            <button
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                currentFolder === '/components' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              onClick={() => {
                setCurrentFolder('/components');
                setBreadcrumbs(['/components']);
              }}
            >
              📁 /components
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

{activeTab === 'redirects' && (
  <RedirectManager />
)}
          </nav>

          {/* Breadcrumbs */}
          {breadcrumbs.length > 1 && (
            <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
              <h4 className="text-sm font-semibold text-gray-400 mb-2">Текущая папка:</h4>
              <div className="flex flex-wrap gap-1">
                {breadcrumbs.map((crumb, index) => (
                  <button
                    key={crumb}
                    onClick={() => handleBreadcrumbClick(crumb, index)}
                    className={`text-xs px-2 py-1 rounded ${
                      index === breadcrumbs.length - 1 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                    }`}
                  >
                    {crumb || '/'}
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
                <div className="text-xs text-gray-500 truncate">{selectedFile.path}</div>
                <div className="text-xs text-gray-500">
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </div>
              </div>
            </div>
          )}
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
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;