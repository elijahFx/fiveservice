import React, { useState, useEffect } from "react";

// Форма создания/редактирования статьи
export const ArticleForm = ({ article, onClose, onSubmit, isSubmitting, user_id, author }) => {
  const [formData, setFormData] = useState({
    title: article?.title || '',
    content: article?.content || '',
    annotation: article?.annotation || '',
    preview: article?.preview || '',
    category: article?.category || '',
    tags: article?.tags ? article.tags.split(",").join(', ') : '',
    readTime: article?.readTime || 0,
  });

  // Автоматический расчет времени прочтения при изменении контента
  useEffect(() => {
    if (formData.content) {
      const wordCount = formData.content.trim().split(/\s+/).length;
      // Средняя скорость чтения - 200 слов в минуту
      const calculatedReadTime = Math.max(1, Math.ceil(wordCount / 200));
      setFormData(prev => ({ ...prev, readTime: calculatedReadTime }));
    }
  }, [formData.content]);

  console.log(user_id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const submitData = {
      ...formData,
      user_id: user_id,
      author: author
    };

    await onSubmit(submitData);
  };

  const handleReadTimeChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setFormData({...formData, readTime: Math.max(0, value)});
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-4 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto">
        <div className="mt-3">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">
              {article ? 'Редактировать статью' : 'Новая статья'}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Заголовок */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Заголовок *
                </label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Введите заголовок статьи"
                  required
                />
              </div>

              {/* Категория */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Категория
                </label>
                <input
                  type="text"
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Например: Технологии, Образование, Новости"
                />
              </div>

              {/* Превью изображение */}
              <div>
                <label htmlFor="preview" className="block text-sm font-medium text-gray-700 mb-1">
                  Ссылка на превью изображение
                </label>
                <input
                  type="url"
                  id="preview"
                  value={formData.preview}
                  onChange={(e) => setFormData({...formData, preview: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://example.com/image.webp"
                />
                {formData.preview && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-500 mb-2">Предпросмотр:</p>
                    <img 
                      src={formData.preview} 
                      alt="Preview" 
                      className="max-w-full h-32 object-cover rounded-md border border-gray-200"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Аннотация */}
              <div>
                <label htmlFor="annotation" className="block text-sm font-medium text-gray-700 mb-1">
                  Аннотация (краткое описание)
                </label>
                <textarea
                  id="annotation"
                  value={formData.annotation}
                  onChange={(e) => setFormData({...formData, annotation: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Краткое описание статьи, которое будет отображаться в списке..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.annotation.length}/500 символов
                </p>
              </div>

              {/* Время прочтения */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="readTime" className="block text-sm font-medium text-gray-700 mb-1">
                    Время прочтения (минуты)
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      id="readTime"
                      value={formData.readTime}
                      onChange={handleReadTimeChange}
                      min="1"
                      max="60"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="5"
                    />
                    <span className="text-sm text-gray-500 whitespace-nowrap">
                      минут
                    </span>
                  </div>
                </div>
                
                {/* Статистика текста */}
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-xs text-gray-600">
                    <span className="font-medium">Статистика:</span><br />
                    Символов: {formData.content.length}<br />
                    Слов: {formData.content ? formData.content.trim().split(/\s+/).length : 0}<br />
                    Расчетное время: {Math.max(1, Math.ceil((formData.content ? formData.content.trim().split(/\s+/).length : 0) / 200))} мин
                  </p>
                </div>
              </div>

              {/* Теги */}
              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                  Теги (через запятую)
                </label>
                <input
                  type="text"
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData({...formData, tags: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="javascript, react, programming"
                />
              </div>

              {/* Содержание */}
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                  Содержание *
                </label>
                <textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  rows={12}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Напишите содержание вашей статьи..."
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="cursor-pointer px-4 py-2 bg-white text-gray-700 text-sm font-medium rounded-md border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                Отмена
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !formData.title.trim() || !formData.content.trim()}
                className="cursor-pointer px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isSubmitting ? 'Сохранение...' : (article ? 'Сохранить' : 'Создать статью')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};