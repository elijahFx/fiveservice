import React, { useState } from 'react';
import {
  useGetArticlesQuery,
  useDeleteArticleMutation,
  useAddArticleMutation,
  useEditArticleMutation
} from '../../apis/articlesApi';
import { ArticleForm } from './ArticleForm';
import { ArticlesSkeleton } from './ArticleSkeleton';
import { ArticleItem } from './ArticleItem';
import { ArticleViewer } from './ArticleViewer';
import { useSelector } from "react-redux"

// Основной компонент
const ArticlesManager = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [modalType, setModalType] = useState(null); // 'view', 'create', 'edit'
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const user = useSelector((state) => state.auth)
  

  const { 
    data: articles = [], 
    isLoading,
    error,
    refetch 
  } = useGetArticlesQuery();

  const [deleteArticle, { isLoading: isDeleting }] = useDeleteArticleMutation();
  const [addArticle, { isLoading: isAdding }] = useAddArticleMutation();
  const [editArticle, { isLoading: isEditing }] = useEditArticleMutation();

  // Получаем ID текущего пользователя (заглушка - нужно заменить на реальный способ)
  const currentUserId = localStorage.getItem('currentUserId') || 'user123';

  const handleDelete = async (articleId) => {
    try {
      await deleteArticle(articleId).unwrap();
      setShowDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  const handleCreate = async (articleData) => {
    try {
      await addArticle(articleData).unwrap();
      closeModal();
    } catch (error) {
      console.error('Error creating article:', error);
      throw error;
    }
  };

  const handleEdit = async (articleData) => {
    try {
      await editArticle({ id: selectedArticle.id, ...articleData }).unwrap();
      closeModal();
    } catch (error) {
      console.error('Error editing article:', error);
      throw error;
    }
  };

  const openViewModal = (article) => {
    setSelectedArticle(article);
    setModalType('view');
  };

  const openCreateModal = () => {
    setSelectedArticle(null);
    setModalType('create');
  };

  const openEditModal = (article) => {
    setSelectedArticle(article);
    setModalType('edit');
  };

  const closeModal = () => {
    setSelectedArticle(null);
    setModalType(null);
  };

  if (error) {
    return (
      <div className="mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-sm font-medium text-red-800">
              Ошибка при загрузке статей
            </h3>
          </div>
          <p className="mt-2 text-sm text-red-600">
            {error.data?.error || 'Не удалось загрузить список статей'}
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
          <h1 className="text-2xl font-bold text-gray-900">Статьи</h1>
          <p className="text-sm text-gray-500 mt-1">
            {articles.length} статей
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={openCreateModal}
            className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Новая статья
          </button>
          
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

      {/* Список статей */}
      <div className="space-y-4">
        {isLoading ? (
          <ArticlesSkeleton />
        ) : articles.length === 0 ? (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">Статьи не найдены</h3>
            <p className="mt-1 text-sm text-gray-500">Создайте первую статью чтобы начать работу.</p>
            <button
              onClick={openCreateModal}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Создать статью
            </button>
          </div>
        ) : (
          articles.map((article) => (
            <ArticleItem
              key={article.id}
              article={article}
              onEdit={openEditModal}
              onDelete={setShowDeleteConfirm}
              onView={openViewModal}
              isDeleting={isDeleting}
              currentUserId={currentUserId}
            />
          ))
        )}
      </div>

      {/* Модальные окна */}
      {modalType === 'view' && selectedArticle && (
        <ArticleViewer
          article={selectedArticle}
          onClose={closeModal}
          onEdit={() => {
            closeModal();
            openEditModal(selectedArticle);
          }}
        />
      )}

      {modalType === 'create' && (
        <ArticleForm
          onClose={closeModal}
          onSubmit={handleCreate}
          isSubmitting={isAdding}
          user_id={user.id}
          author={user.fullName}
        />
      )}

      {modalType === 'edit' && selectedArticle && (
        <ArticleForm
          article={selectedArticle}
          onClose={closeModal}
          onSubmit={handleEdit}
          isSubmitting={isEditing}
        />
      )}

      {/* Модальное окно подтверждения удаления */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-lg leading-6 font-medium text-gray-900 mt-2">
                Удалить статью?
              </h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Вы уверены, что хотите удалить эту статью? Это действие нельзя отменить.
                </p>
              </div>
              <div className="flex items-center justify-center space-x-3 mt-4">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="cursor-pointer px-4 py-2 bg-white text-gray-700 text-sm font-medium rounded-md border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                >
                  Отмена
                </button>
                <button
                  onClick={() => handleDelete(showDeleteConfirm)}
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

export default ArticlesManager;