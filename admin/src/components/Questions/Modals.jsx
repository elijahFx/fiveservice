import React from "react";
import { useState } from "react";
import { useSelector }from "react-redux"

export const AnswerModal = ({ question, onClose, onAnswer }) => {
  const [answer, setAnswer] = useState(question.answer || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const user_name = useSelector((state) => state.auth.fullName)

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!answer.trim()) return;

    setIsSubmitting(true);
    try {
      await onAnswer(question.id, answer);
      onClose();
    } catch (error) {
      console.error('Error answering question:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Ответ на вопрос</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Вопрос:</h4>
            <p className="text-gray-900 whitespace-pre-wrap">{question.content}</p>
            {question.author && (
              <p className="text-sm text-gray-600 mt-2">
                <strong>Автор:</strong> {question.author}
              </p>
            )}
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mb-2">
                Ответ:
              </label>
              <textarea
                id="answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Введите ответ на вопрос..."
                required
              />
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="cursor-pointer px-4 py-2 bg-white text-gray-700 text-sm font-medium rounded-md border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                Отмена
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !answer.trim()}
                className="cursor-pointer px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isSubmitting ? 'Отправка...' : 'Отправить ответ'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export const EditModal = ({ question, onClose, onEdit, isAnswered }) => {
  const [formData, setFormData] = useState({
    content: question.content,
    author: question.author || ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.content.trim()) return;

    setIsSubmitting(true);
    try {
      await onEdit(question.id, formData);
      onClose();
    } catch (error) {
      console.error('Error editing question:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Редактировать вопрос
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
            <div className="mb-4">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                Вопрос:
              </label>
              <textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Введите текст вопроса..."
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
                Автор (необязательно):
              </label>
              <input
                type="text"
                id="author"
                value={formData.author}
                onChange={(e) => setFormData({...formData, author: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Имя автора"
              />
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="cursor-pointer px-4 py-2 bg-white text-gray-700 text-sm font-medium rounded-md border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                Отмена
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !formData.content.trim()}
                className="cursor-pointer px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isSubmitting ? 'Сохранение...' : 'Сохранить'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
