import React from "react";

export // Компонент чтения статьи
const ArticleViewer = ({ article, onClose, onEdit }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-4 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto">
        <div className="mt-3">
          {/* Заголовок и кнопки */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{article.title}</h2>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {article.author || 'Аноним'}
                </span>
                <span>•</span>
                <span>{formatDate(article.createdAt)}</span>
                {article.category && (
                  <>
                    <span>•</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {article.category}
                    </span>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2 ml-4">
              {onEdit && (
                <button
                  onClick={() => onEdit(article)}
                  className="cursor-pointer inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                >
                  Редактировать
                </button>
              )}
              <button
                onClick={onClose}
                className="cursor-pointer inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
              >
                Закрыть
              </button>
            </div>
          </div>

          <div className="prose max-w-none">
           <img src={article.preview} alt={article.title} />
          </div>

          {/* Содержание статьи */}
          <div className="prose max-w-none">
            <div className="text-gray-700 font-semibold leading-relaxed whitespace-pre-wrap py-4">
              {article.annotation}
            </div>
          </div>

          {/* Содержание статьи */}
          <div className="prose max-w-none">
            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {article.content}
            </div>
          </div>

          {/* Теги */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-6 pt-4 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Теги:</h4>
              <div className="flex flex-wrap gap-2">
                {article.tags.trim().split(",").map((tag, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};