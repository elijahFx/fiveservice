import React, { useState, useEffect } from 'react';
import { 
  useGetSeoInfoQuery, 
  useSaveSeoInfoMutation,
  useDeleteSeoInfoMutation 
} from '../../apis/adminsApi';

const SeoEditorModal = ({ folder, isOpen, onClose, onSave }) => {
  const { data: seoData, isLoading, refetch } = useGetSeoInfoQuery(folder, {
    skip: !isOpen || !folder
  });
  
  const [saveSeo, { isLoading: isSaving }] = useSaveSeoInfoMutation();
  const [deleteSeo, { isLoading: isDeleting }] = useDeleteSeoInfoMutation();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    keywords: '',
    openGraph: {
      title: '',
      description: '',
      images: [],
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: '',
      description: '',
      images: []
    }
  });

  useEffect(() => {
    if (seoData?.seo) {
      setFormData(seoData.seo);
    }
  }, [seoData]);

  const handleInputChange = (section, field, value) => {
    if (section === 'main') {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    } else if (section === 'openGraph' || section === 'twitter') {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    }
  };

  const handleSave = async () => {
    try {
      await saveSeo({ folder, seo: formData }).unwrap();
      onSave?.();
      onClose();
    } catch (error) {
      alert('Ошибка сохранения SEO: ' + (error.data?.error || error.message));
    }
  };

  const handleDelete = async () => {
    if (confirm('Вы уверены, что хотите удалить SEO информацию для этой папки?')) {
      try {
        await deleteSeo(folder).unwrap();
        onClose();
      } catch (error) {
        alert('Ошибка удаления SEO: ' + (error.data?.error || error.message));
      }
    }
  };

  const handleRefresh = () => {
    refetch();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">
            Редактирование SEO - {folder || 'Корневая папка'}
          </h2>
          <div className="flex gap-2">
            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className="px-3 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50"
            >
              🔄
            </button>
            <button
              onClick={onClose}
              className="px-3 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="text-gray-400">Загрузка SEO информации...</div>
            </div>
          ) : (
            <>
              {/* Основные SEO поля */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">
                  Основные мета-теги
                </h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('main', 'title', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                    placeholder="Заголовок страницы"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('main', 'description', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                    placeholder="Описание страницы для поисковых систем"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Keywords
                  </label>
                  <input
                    type="text"
                    value={formData.keywords}
                    onChange={(e) => handleInputChange('main', 'keywords', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                    placeholder="ключевые, слова, через, запятую"
                  />
                </div>
              </div>

              {/* Open Graph */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">
                  Open Graph (для социальных сетей)
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    OG Title
                  </label>
                  <input
                    type="text"
                    value={formData.openGraph.title}
                    onChange={(e) => handleInputChange('openGraph', 'title', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                    placeholder="Заголовок для соц. сетей (если пусто, используется основной title)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    OG Description
                  </label>
                  <textarea
                    value={formData.openGraph.description}
                    onChange={(e) => handleInputChange('openGraph', 'description', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                    placeholder="Описание для соц. сетей (если пусто, используется основной description)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    OG Image URL
                  </label>
                  <input
                    type="text"
                    value={formData.openGraph.images?.[0] || ''}
                    onChange={(e) => handleInputChange('openGraph', 'images', [e.target.value])}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    OG Type
                  </label>
                  <select
                    value={formData.openGraph.type}
                    onChange={(e) => handleInputChange('openGraph', 'type', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="website">Website</option>
                    <option value="article">Article</option>
                    <option value="product">Product</option>
                    <option value="profile">Profile</option>
                  </select>
                </div>
              </div>

              {/* Twitter Card */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">
                  Twitter Card
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Twitter Card Type
                  </label>
                  <select
                    value={formData.twitter.card}
                    onChange={(e) => handleInputChange('twitter', 'card', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="summary">Summary</option>
                    <option value="summary_large_image">Summary Large Image</option>
                    <option value="app">App</option>
                    <option value="player">Player</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Twitter Title
                  </label>
                  <input
                    type="text"
                    value={formData.twitter.title}
                    onChange={(e) => handleInputChange('twitter', 'title', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                    placeholder="Заголовок для Twitter (если пусто, используется основной title)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Twitter Description
                  </label>
                  <textarea
                    value={formData.twitter.description}
                    onChange={(e) => handleInputChange('twitter', 'description', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                    placeholder="Описание для Twitter (если пусто, используется основной description)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Twitter Image URL
                  </label>
                  <input
                    type="text"
                    value={formData.twitter.images?.[0] || ''}
                    onChange={(e) => handleInputChange('twitter', 'images', [e.target.value])}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                    placeholder="https://example.com/twitter-image.jpg"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-6 border-t border-gray-700">
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            {isDeleting ? 'Удаление...' : 'Удалить SEO'}
          </button>
          
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-gray-300 rounded-lg hover:bg-gray-500 transition-colors"
            >
              Отмена
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving || !formData.title || !formData.description}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isSaving ? 'Сохранение...' : 'Сохранить'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeoEditorModal;