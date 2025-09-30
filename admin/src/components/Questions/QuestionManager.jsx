import React, { useState } from 'react';
import {
  useGetAnsweredQuestionsQuery,
  useGetUnansweredQuestionsQuery,
  useDeleteQuestionMutation,
  useAnswerQuestionMutation,
  useUpdateQuestionMutation,
  useToggleFeaturedMutation,
} from '../../apis/questionsApi';
// Компонент отдельного вопроса
import QuestionItem from './QuestionItem';
// Скелетон загрузки
import QuestionsSkeleton from './QuestionSkeleton';
// Модальное окно ответа на вопрос // Модальное окно редактирования вопроса
import { AnswerModal, EditModal } from './Modals';

// Основной компонент
const QuestionsManager = () => {
  const [activeTab, setActiveTab] = useState('unanswered');
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [modalType, setModalType] = useState(null); // 'answer', 'edit'
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false)

  // Запросы для двух вкладок
  const { 
    data: unansweredQuestions = [], 
    isLoading: isLoadingUnanswered,
    error: errorUnanswered,
    refetch: refetchUnanswered 
  } = useGetUnansweredQuestionsQuery();

  const { 
    data: answeredQuestions = [], 
    isLoading: isLoadingAnswered,
    error: errorAnswered,
    refetch: refetchAnswered 
  } = useGetAnsweredQuestionsQuery();

  // Мутации
  const [deleteQuestion, { isLoading: isDeleting }] = useDeleteQuestionMutation();
  const [answerQuestion] = useAnswerQuestionMutation();
  const [updateQuestion] = useUpdateQuestionMutation();
  const [toggleFeatured] = useToggleFeaturedMutation();

  const isLoading = activeTab === 'unanswered' ? isLoadingUnanswered : isLoadingAnswered;
  const error = activeTab === 'unanswered' ? errorUnanswered : errorAnswered;
  const questions = activeTab === 'unanswered' ? unansweredQuestions : answeredQuestions;

  const handleAnswer = async (questionId, answer) => {
    try {
      await answerQuestion({ id: questionId, answer }).unwrap();
      refetchUnanswered();
      refetchAnswered();
    } catch (error) {
      console.error('Error answering question:', error);
      throw error;
    }
  };

  const handleEdit = async (questionId, questionData) => {
    try {
      await updateQuestion({ id: questionId, ...questionData }).unwrap();
      refetchUnanswered();
      refetchAnswered();
    } catch (error) {
      console.error('Error updating question:', error);
      throw error;
    }
  };

  const handleDelete = async (questionId) => {
    try {
      await deleteQuestion(questionId).unwrap();
      setShowDeleteConfirm(null);
      refetchUnanswered();
      refetchAnswered();
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  const handleToggleFeatured = async (questionId, currentStatus) => {
    try {
      await toggleFeatured({ id: questionId, isFeatured: !currentStatus }).unwrap();
      refetchUnanswered();
      refetchAnswered();
    } catch (error) {
      console.error('Error toggling featured status:', error);
    }
  };

  const openAnswerModal = (question) => {
    setSelectedQuestion(question);
    setModalType('answer');
  };

  const openEditModal = (question) => {
    setSelectedQuestion(question);
    setModalType('edit');
  };

  const closeModal = () => {
    setSelectedQuestion(null);
    setModalType(null);
  };

  const refetchAll = () => {
    refetchUnanswered();
    refetchAnswered();
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
              Ошибка при загрузке вопросов
            </h3>
          </div>
          <p className="mt-2 text-sm text-red-600">
            {error.data?.error || 'Не удалось загрузить список вопросов'}
          </p>
          <button
            onClick={refetchAll}
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
          <h1 className="text-2xl font-bold text-gray-900">Вопросы</h1>
          <p className="text-sm text-gray-500 mt-1">
            {activeTab === 'unanswered' 
              ? `${unansweredQuestions.length} неотвеченных вопросов`
              : `${answeredQuestions.length} отвеченных вопросов`
            }
          </p>
        </div>
        
        <button
          onClick={refetchAll}
          className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Обновить
        </button>
      </div>

      {/* Вкладки */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() =>{
                setActiveTab('unanswered')
                setIsAnswered(false)
            }}
              className={`cursor-pointer whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'unanswered'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } transition-colors duration-200`}
            >
              Неотвеченные
              {unansweredQuestions.length > 0 && (
                <span className="ml-2 py-0.5 px-2 text-xs bg-blue-100 text-blue-800 rounded-full">
                  {unansweredQuestions.length}
                </span>
              )}
            </button>
            <button
              onClick={() => {
                setActiveTab('answered')
                setIsAnswered(true)
            }}
              className={`cursor-pointer whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'answered'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } transition-colors duration-200`}
            >
              Отвеченные
              {answeredQuestions.length > 0 && (
                <span className="ml-2 py-0.5 px-2 text-xs bg-green-100 text-green-800 rounded-full">
                  {answeredQuestions.length}
                </span>
              )}
            </button>
          </nav>
        </div>
      </div>

      {/* Список вопросов */}
      <div className="space-y-4">
        {isLoading ? (
          <QuestionsSkeleton />
        ) : questions.length === 0 ? (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              {activeTab === 'unanswered' ? 'Неотвеченные вопросы не найдены' : 'Отвеченные вопросы не найдены'}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {activeTab === 'unanswered' 
                ? 'Все вопросы были обработаны.' 
                : 'Ответьте на вопросы чтобы они появились здесь.'
              }
            </p>
          </div>
        ) : (
          questions.map((question) => (
            <QuestionItem
              key={question.id}
              question={question}
              onAnswer={openAnswerModal}
              onEdit={openEditModal}
              onDelete={(id) => setShowDeleteConfirm(id)}
              onToggleFeatured={handleToggleFeatured}
              isDeleting={isDeleting}
              isAnswered={isAnswered}
            />
          ))
        )}
      </div>

      {/* Модальные окна */}
      {modalType === 'answer' && selectedQuestion && (
        <AnswerModal
          question={selectedQuestion}
          onClose={closeModal}
          onAnswer={handleAnswer}
        />
      )}

      {modalType === 'edit' && selectedQuestion && (
        <EditModal
          question={selectedQuestion}
          onClose={closeModal}
          onEdit={handleEdit}
          isAnswered={activeTab === 'answered'}
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
                Удалить вопрос?
              </h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Вы уверены, что хотите удалить этот вопрос? Это действие нельзя отменить.
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

export default QuestionsManager;