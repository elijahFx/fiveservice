import React, { useState } from 'react';
import { 
  useGetFilesListQuery, 
  useDeleteFileMutation, 
  useDeleteFilesMutation,
  useDownloadFileMutation 
} from '../../apis/filesApi';
import { FileItem } from './FileItem';
import { FileListSkeleton } from './FileListSkeleton';

const FileManager = () => {
  const { data: files = [], isLoading, error, refetch } = useGetFilesListQuery();
  const [deleteFile, { isLoading: isDeletingSingle }] = useDeleteFileMutation();
  const [deleteFiles, { isLoading: isDeletingMultiple }] = useDeleteFilesMutation();
  const [downloadFile] = useDownloadFileMutation();
  const [selectedFiles, setSelectedFiles] = useState(new Set());
  const [showDeleteAllConfirm, setShowDeleteAllConfirm] = useState(false);

   const sortedFiles = [...files].sort((a, b) => {
    const dateA = new Date(a.uploadedAt || a.createdAt);
    const dateB = new Date(b.uploadedAt || b.createdAt);
    return dateB - dateA; // Для старых сверху поменяйте на dateA - dateB
  });

  const handleDownload = async (filename) => {
    try {
      await downloadFile(filename).unwrap();
    } catch (error) {
      console.error('Download failed:', error);
      // Здесь можно добавить уведомление об ошибке
    }
  };

  const handleDelete = async (filename) => {
    try {
      await deleteFile(filename).unwrap();
      // Убираем файл из выбранных если он там был
      setSelectedFiles(prev => {
        const newSelected = new Set(prev);
        newSelected.delete(filename);
        return newSelected;
      });
    } catch (error) {
      console.error('Delete failed:', error);
      // Здесь можно добавить уведомление об ошибке
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedFiles.size === 0) return;
    
    try {
      await deleteFiles(Array.from(selectedFiles)).unwrap();
      setSelectedFiles(new Set());
      setShowDeleteAllConfirm(false);
    } catch (error) {
      console.error('Delete multiple failed:', error);
      // Здесь можно добавить уведомление об ошибке
    }
  };

  const handleSelectFile = (filename, checked) => {
    setSelectedFiles(prev => {
      const newSelected = new Set(prev);
      if (checked) {
        newSelected.add(filename);
      } else {
        newSelected.delete(filename);
      }
      return newSelected;
    });
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedFiles(new Set(files.map(file => file.filename)));
    } else {
      setSelectedFiles(new Set());
    }
  };

  const isDeleting = isDeletingSingle || isDeletingMultiple;

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-sm font-medium text-red-800">
              Ошибка при загрузке файлов
            </h3>
          </div>
          <p className="mt-2 text-sm text-red-600">
            {error.data?.error || 'Не удалось загрузить список файлов'}
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
      {/* Заголовок и кнопки управления */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Файлы</h1>
          <p className="text-sm text-gray-500 mt-1">
            {files.length} файлов
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          {selectedFiles.size > 0 && (
            <>
              <span className="text-sm text-gray-600">
                Выбрано: {selectedFiles.size}
              </span>
              <button
                onClick={() => setShowDeleteAllConfirm(true)}
                disabled={isDeleting}
                className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Удалить выбранные
              </button>
            </>
          )}
          
          <button
            onClick={refetch}
            className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Обновить
          </button>
        </div>
      </div>

      {/* Список файлов */}
      <div className="space-y-3">
        {isLoading ? (
          <FileListSkeleton />
        ) : files.length === 0 ? (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">Файлы не найдены</h3>
            <p className="mt-1 text-sm text-gray-500">Загрузите первый файл чтобы начать работу.</p>
          </div>
        ) : (
          <>
            {/* Чекбокс выбора всех */}
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <input
                type="checkbox"
                checked={files.length > 0 && selectedFiles.size === files.length}
                onChange={(e) => handleSelectAll(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="text-sm font-medium text-gray-700">
                Выбрать все файлы
              </label>
            </div>

            {/* Список файлов */}
            {sortedFiles?.map((file) => (
              <div key={file.filename} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={selectedFiles.has(file.filename)}
                  onChange={(e) => handleSelectFile(file.filename, e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <div className="flex-1">
                  <FileItem
                    file={file}
                    onDownload={handleDownload}
                    onDelete={handleDelete}
                    isDeleting={isDeleting}
                  />
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Модальное окно подтверждения удаления */}
      {showDeleteAllConfirm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-lg leading-6 font-medium text-gray-900 mt-2">
                Удалить выбранные файлы?
              </h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Вы уверены, что хотите удалить {selectedFiles.size} файл(ов)? Это действие нельзя отменить.
                </p>
              </div>
              <div className="flex items-center justify-center space-x-3 mt-4">
                <button
                  onClick={() => setShowDeleteAllConfirm(false)}
                  className="cursor-pointer px-4 py-2 bg-white text-gray-700 text-sm font-medium rounded-md border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                >
                  Отмена
                </button>
                <button
                  onClick={handleDeleteSelected}
                  disabled={isDeleting}
                  className="cursor-pointer px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
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

export default FileManager;