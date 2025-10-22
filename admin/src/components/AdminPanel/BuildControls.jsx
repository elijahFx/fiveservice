import React, { useState } from 'react';
import {
  useBuildProjectMutation,
  useStartServerMutation,
  useBuildAndStartMutation,
  useInstallDependenciesMutation,
  useInstallPackageMutation,
  useUninstallPackageMutation,
  useGetBuildStatusQuery
} from '../../apis/adminsApi';

const BuildControls = () => {
  const [packageName, setPackageName] = useState('');
  const [logs, setLogs] = useState([]);

  const [buildProject] = useBuildProjectMutation();
  const [startServer] = useStartServerMutation();
  const [buildAndStart] = useBuildAndStartMutation();
  const [installDependencies] = useInstallDependenciesMutation();
  const [installPackage] = useInstallPackageMutation();
  const [uninstallPackage] = useUninstallPackageMutation();
  
  const { data: status, refetch: refetchStatus } = useGetBuildStatusQuery();

  const addLog = (message, type = 'info') => {
    setLogs(prev => [...prev, {
      id: Date.now(),
      message,
      type,
      timestamp: new Date().toLocaleTimeString()
    }]);
  };

  const handleAction = async (action, actionName) => {
    addLog(`Запуск: ${actionName}`, 'info');
    try {
      await action().unwrap();
      addLog(`✅ ${actionName} успешно запущен`, 'success');
    } catch (error) {
      addLog(`❌ Ошибка при ${actionName}: ${error.data?.error || error.message}`, 'error');
    }
  };

  const handleBuild = () => handleAction(buildProject, 'сборка проекта');
  const handleStart = () => handleAction(startServer, 'запуск сервера');
  const handleBuildAndStart = () => handleAction(buildAndStart, 'сборка и запуск');
  const handleInstallDeps = () => handleAction(installDependencies, 'установка зависимостей');

  const handleInstallPackage = async () => {
    if (!packageName.trim()) return;
    
    addLog(`Установка пакета: ${packageName}`, 'info');
    try {
      await installPackage(packageName).unwrap();
      addLog(`✅ Пакет ${packageName} успешно установлен`, 'success');
      setPackageName('');
    } catch (error) {
      addLog(`❌ Ошибка установки пакета ${packageName}: ${error.data?.error || error.message}`, 'error');
    }
  };

  const handleUninstallPackage = async () => {
    if (!packageName.trim()) return;
    
    addLog(`Удаление пакета: ${packageName}`, 'info');
    try {
      await uninstallPackage(packageName).unwrap();
      addLog(`✅ Пакет ${packageName} успешно удален`, 'success');
      setPackageName('');
    } catch (error) {
      addLog(`❌ Ошибка удаления пакета ${packageName}: ${error.data?.error || error.message}`, 'error');
    }
  };

  const clearLogs = () => setLogs([]);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-white">Управление сборкой и зависимостями</h2>

      {/* Build Section */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Сборка проекта</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <button 
            onClick={handleBuild}
            className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            🛠️ Собрать проект
          </button>
          <button 
            onClick={handleStart}
            className="px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            🚀 Запустить сервер
          </button>
          <button 
            onClick={handleBuildAndStart}
            className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            ⚡ Собрать и запустить
          </button>
          <button 
            onClick={handleInstallDeps}
            className="px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            📦 Установить зависимости
          </button>
        </div>
      </div>

      {/* Dependencies Section */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Управление пакетами</h3>
        <div className="flex gap-3">
          <input
            type="text"
            value={packageName}
            onChange={(e) => setPackageName(e.target.value)}
            placeholder="Введите имя пакета (например: lodash)"
            className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            onKeyPress={(e) => e.key === 'Enter' && handleInstallPackage()}
          />
          <button 
            onClick={handleInstallPackage}
            disabled={!packageName.trim()}
            className="cursor-pointer px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ➕ Установить
          </button>
          <button 
            onClick={handleUninstallPackage}
            disabled={!packageName.trim()}
            className="cursor-pointer px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ➖ Удалить
          </button>
        </div>
      </div>

      {/* Status Section */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Статус системы</h3>
        <div className="flex items-center gap-6">
          <div className="space-y-2 flex-1">
            <div className="text-gray-300">
              <strong>Статус сборки:</strong> {status?.status || 'Неизвестно'}
            </div>
            <div className="text-gray-300">
              <strong>Сообщение:</strong> {status?.message || 'Нет информации'}
            </div>
          </div>
          <button 
            onClick={refetchStatus}
            className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer"
          >
            🔄 Обновить статус
          </button>
        </div>
      </div>

      {/* Logs Section */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white">Логи операций</h3>
          <button 
            onClick={clearLogs}
            className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer"
          >
            🗑️ Очистить логи
          </button>
        </div>
        <div className="bg-gray-900 rounded-lg p-4 h-64 overflow-y-auto">
          {logs.length === 0 ? (
            <div className="text-gray-500 text-center py-8">Логи отсутствуют</div>
          ) : (
            <div className="space-y-2">
              {logs.map(log => (
                <div 
                  key={log.id}
                  className={`p-2 rounded text-sm ${
                    log.type === 'error' ? 'bg-red-900/50 text-red-300' :
                    log.type === 'success' ? 'bg-green-900/50 text-green-300' :
                    'bg-gray-700 text-gray-300'
                  }`}
                >
                  <span className="text-gray-500 mr-2">[{log.timestamp}]</span>
                  {log.message}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuildControls;