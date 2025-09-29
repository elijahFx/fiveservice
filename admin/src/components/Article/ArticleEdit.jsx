import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TopElement from "../TopElement";
import { 
  useGetSingleArticleQuery, 
  useEditArticleMutation 
} from "../../apis/articlesApi";
import { useSelector } from "react-redux";
import MDEditor from "@uiw/react-md-editor";

export default function ArticleEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useSelector((state) => state.auth);
  
  const { data: article, isLoading, error } = useGetSingleArticleQuery(id);
  const [editArticle, { isLoading: isEditing }] = useEditArticleMutation();
  
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    tags: "",
  });
  
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (article) {
      setFormData({
        title: article.title || "",
        content: article.content || "",
        category: article.category || "",
        tags: article.tags?.join(", ") || "",
      });
    }
  }, [article]);

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
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      const articleData = {
        title: formData.title,
        content: formData.content,
        category: formData.category,
        tags: formData.tags.split(",").map(tag => tag.trim()).filter(tag => tag)
      };
      
      await editArticle({ id: id, ...articleData }).unwrap();
      
      navigate(`/articles/${id}`);
      
    } catch (error) {
      console.error("Ошибка при редактировании статьи:", error);
    }
  };

  const handleCancel = () => {
    navigate(`/articles/${id}`);
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

  if (isLoading) {
    return (
      <div className="mt-[11vh] flex-1">
        <TopElement type="articles" />
        <div className="p-6 max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-[11vh] flex-1">
        <TopElement type="articles" />
        <div className="p-6 max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="text-red-800 font-semibold">Ошибка загрузки</h3>
            <p className="text-red-600 mt-1">
              Не удалось загрузить статью для редактирования
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-[11vh] flex-1">
      <TopElement type="articles" />
      
      <div className="p-6 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Редактирование статьи</h1>
          <p className="text-gray-600 mt-2">Внесите изменения в вашу статью</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          {/* ... та же форма, что и в ArticleCreate ... */}
        </form>
      </div>
    </div>
  );
}