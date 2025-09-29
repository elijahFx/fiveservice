import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopElement from "../TopElement";
import { useAddArticleMutation } from "../../apis/articlesApi";
import { useSelector } from "react-redux"
import MDEditor from "@uiw/react-md-editor";

export default function ArticleCreate() {
  const navigate = useNavigate();
  const [addArticle, { isLoading: isAdding }] = useAddArticleMutation();
  const user = useSelector((state) => state.auth)
  
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    tags: "",
    previewImage: null,
    previewUrl: ""
  });
  
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleContentChange = (value) => {
    setFormData(prev => ({
      ...prev,
      content: value
    }));
    
    if (errors.content) {
      setErrors(prev => ({
        ...prev,
        content: ""
      }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Проверка формата файла
    if (!file.name.toLowerCase().endsWith('.webp')) {
      setErrors(prev => ({
        ...prev,
        previewImage: "Поддерживаются только файлы формата WEBP"
      }));
      return;
    }

    // Проверка размера файла (максимум 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({
        ...prev,
        previewImage: "Размер файла не должен превышать 5MB"
      }));
      return;
    }

    // Создание preview изображения
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);

    setFormData(prev => ({
      ...prev,
      previewImage: file,
      previewUrl: "" // Очищаем URL если загружаем файл
    }));

    if (errors.previewImage) {
      setErrors(prev => ({
        ...prev,
        previewImage: ""
      }));
    }
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setFormData(prev => ({
      ...prev,
      previewUrl: url,
      previewImage: null // Очищаем файл если вводим URL
    }));

    // Очищаем preview если вводим URL
    setImagePreview(null);

    if (errors.previewImage) {
      setErrors(prev => ({
        ...prev,
        previewImage: ""
      }));
    }
  };

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      previewImage: null,
      previewUrl: ""
    }));
    setImagePreview(null);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Заголовок обязателен";
    }
    
    if (!formData.content.trim()) {
      newErrors.content = "Содержание обязательно";
    }
    
    if (!formData.category.trim()) {
      newErrors.category = "Категория обязательна";
    }

    // Проверка что либо файл, либо URL заполнены (если нужно)
    // if (!formData.previewImage && !formData.previewUrl) {
    //   newErrors.previewImage = "Загрузите preview изображение или укажите URL";
    // }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      // Создаем FormData для отправки файла
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('content', formData.content);
      formDataToSend.append('user_id', user?.id);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('tags', formData.tags.split(",").map(tag => tag.trim()).filter(tag => tag).join(","));
      
      // Добавляем либо файл, либо URL
      if (formData.previewImage) {
        formDataToSend.append('previewImage', formData.previewImage);
      } else if (formData.previewUrl) {
        formDataToSend.append('previewUrl', formData.previewUrl);
      }

      await addArticle(formDataToSend).unwrap();
      navigate("/article");
      
    } catch (error) {
      console.error("Ошибка при создании статьи:", error);
    }
  };

  const handleCancel = () => {
    navigate("/article");
  };

  const categories = [
    "Технологии",
    "Наука",
    "Искусство",
    "Спорт",
    "Политика",
    "Экономика",
    "Здоровье",
    "Образование",
    "Путешествия",
    "Другое"
  ];

  return (
    <div className="mt-[11vh] flex-1">
      <TopElement type="article" />
      
      <div className="p-6 mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Создание новой статьи</h1>
          <p className="text-gray-600 mt-2">Заполните информацию о вашей статье</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          {/* Заголовок */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Заголовок статьи *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Введите заголовок статьи..."
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.title ? "border-red-300" : "border-gray-300"
              }`}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          {/* Категория */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Категория *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.category ? "border-red-300" : "border-gray-300"
              }`}
            >
              <option value="">Выберите категорию</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category}</p>
            )}
          </div>

          {/* Preview изображение */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preview изображение
            </label>
            
            <div className="space-y-4">
              {/* Загрузка файла */}
              <div>
                <label className="block text-sm text-gray-600 mb-2">Загрузить WEBP файл</label>
                <input
                  type="file"
                  accept=".webp"
                  onChange={handleImageUpload}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                <p className="mt-1 text-xs text-gray-500">Поддерживается только формат WEBP. Максимальный размер: 5MB</p>
              </div>

              {/* Или URL */}
              <div>
                <label className="block text-sm text-gray-600 mb-2">Или укажите URL</label>
                <input
                  type="url"
                  placeholder="https://example.com/image.webp"
                  value={formData.previewUrl}
                  onChange={handleUrlChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            {errors.previewImage && (
              <p className="mt-1 text-sm text-red-600">{errors.previewImage}</p>
            )}

            {/* Preview изображения */}
            {(imagePreview || formData.previewUrl) && (
              <div className="mt-4 p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-700">Preview:</span>
                  <button
                    type="button"
                    onClick={removeImage}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Удалить
                  </button>
                </div>
                <div className="flex justify-center">
                  <img 
                    src={imagePreview || formData.previewUrl} 
                    alt="Preview" 
                    className="max-h-48 max-w-full object-contain rounded"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Теги */}
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
              Теги
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              placeholder="Введите теги через запятую (например: технологии, программирование, web)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
            <p className="mt-1 text-sm text-gray-500">Теги помогают лучше categorize вашу статью</p>
          </div>

          {/* Содержание */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Содержание статьи *
            </label>
            <div className={`border rounded-lg ${errors.content ? "border-red-300" : "border-gray-300"}`}>
              <MDEditor
                value={formData.content}
                onChange={handleContentChange}
                height={400}
                preview="edit"
                className="rounded-lg"
              />
            </div>
            {errors.content && (
              <p className="mt-1 text-sm text-red-600">{errors.content}</p>
            )}
            <p className="mt-2 text-sm text-gray-500">
              Поддерживается Markdown форматирование
            </p>
          </div>

          {/* Кнопки действий */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              disabled={isAdding}
            >
              Отмена
            </button>
            <button
              type="submit"
              disabled={isAdding}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isAdding ? "Создание..." : "Создать статью"}
            </button>
          </div>
        </form>

        {/* Предпросмотр содержания */}
        {formData.content && (
          <div className="mt-8 bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Предпросмотр содержания</h2>
            <div className="prose max-w-none border-t pt-4">
              <MDEditor.Markdown source={formData.content} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}