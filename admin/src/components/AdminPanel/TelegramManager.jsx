// components/TelegramChatManager.jsx
import React, { useState } from 'react';
import {
  useGetChatIdsQuery,
  useAddChatIdMutation,
  useDeleteChatIdMutation,
  useUpdateChatIdsMutation,
  useSendTestNotificationMutation,
} from '../../apis/telegramApi';

const TelegramChatManager = () => {
  const [newChatId, setNewChatId] = useState('');
  const [testMessage, setTestMessage] = useState('Тестовое уведомление от администратора');

  const { data: chatIdsData, isLoading, error } = useGetChatIdsQuery();
  const [addChatId, { isLoading: isAdding }] = useAddChatIdMutation();
  const [deleteChatId, { isLoading: isDeleting }] = useDeleteChatIdMutation();
  const [updateChatIds, { isLoading: isUpdating }] = useUpdateChatIdsMutation();
  const [sendTestNotification, { isLoading: isSendingTest }] = useSendTestNotificationMutation();

  const handleAddChatId = async (e) => {
    e.preventDefault();
    if (!newChatId.trim()) return;

    try {
      await addChatId(newChatId.trim()).unwrap();
      setNewChatId('');
    } catch (error) {
      console.error('Error adding chat ID:', error);
      alert(`Ошибка при добавлении: ${error.data?.error || 'Неизвестная ошибка'}`);
    }
  };

  const handleDeleteChatId = async (chatId) => {
    if (!window.confirm(`Удалить chat ID ${chatId}?`)) return;

    try {
      await deleteChatId(chatId).unwrap();
    } catch (error) {
      console.error('Error deleting chat ID:', error);
      alert(`Ошибка при удалении: ${error.data?.error || 'Неизвестная ошибка'}`);
    }
  };

  const handleSendTestNotification = async () => {
    try {
      const result = await sendTestNotification(testMessage).unwrap();
      alert(`Тестовое уведомление отправлено для ${result.totalRecipients} получателей`);
    } catch (error) {
      console.error('Error sending test notification:', error);
      alert(`Ошибка при отправке: ${error.data?.error || 'Неизвестная ошибка'}`);
    }
  };

  if (isLoading) return (
    <div className="flex items-center justify-center p-8">
      <div className="text-white text-lg">Загрузка...</div>
    </div>
  );
  
  if (error) return (
    <div className="flex items-center justify-center p-8">
      <div className="text-red-400 text-lg">Ошибка загрузки: {error.data?.error || 'Неизвестная ошибка'}</div>
    </div>
  );

  const chatIds = chatIdsData?.chatIds || [];

  return (
    <div className="p-6 space-y-6">
      {/* Заголовок */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-2">Управление Telegram Chat IDs</h2>
        <p className="text-gray-400">Добавляйте и удаляйте ID чатов для отправки уведомлений</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Левая колонка - добавление и список */}
        <div className="space-y-6">
          {/* Форма добавления нового chat ID */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Добавить новый Chat ID</h3>
            <form onSubmit={handleAddChatId} className="space-y-4">
              <div>
                <input
                  type="text"
                  value={newChatId}
                  onChange={(e) => setNewChatId(e.target.value)}
                  placeholder="Введите Chat ID (число)"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <p className="text-gray-400 text-sm mt-2">
                  Chat ID можно получить у бота @userinfobot в Telegram
                </p>
              </div>
              <button
                type="submit"
                disabled={isAdding}
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-colors cursor-pointer"
              >
                {isAdding ? 'Добавление...' : 'Добавить Chat ID'}
              </button>
            </form>
          </div>

          {/* Список текущих chat IDs */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">
                Текущие Chat IDs
              </h3>
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                {chatIds.length}
              </span>
            </div>
            
            {chatIds.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-400 text-lg mb-2">😴</div>
                <p className="text-gray-400">Нет добавленных chat IDs</p>
                <p className="text-gray-500 text-sm mt-1">Добавьте первый chat ID для получения уведомлений</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {chatIds.map((chatId, index) => (
                  <div
                    key={chatId}
                    className="flex items-center justify-between p-4 bg-gray-700 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">{index + 1}</span>
                      </div>
                      <div>
                        <div className="text-white font-mono text-lg">{chatId}</div>
                        <div className="text-gray-400 text-sm">Telegram Chat ID</div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteChatId(chatId)}
                      disabled={isDeleting}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 transition-colors cursor-pointer"
                    >
                      {isDeleting ? '...' : 'Удалить'}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Правая колонка - тестовое уведомление */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Тестовое уведомление</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-400 text-sm mb-2">
                Сообщение для теста:
              </label>
              <textarea
                value={testMessage}
                onChange={(e) => setTestMessage(e.target.value)}
                rows={6}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                placeholder="Введите тестовое сообщение..."
              />
            </div>
            
            <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
              <h4 className="text-white font-semibold mb-2">Получатели:</h4>
              {chatIds.length === 0 ? (
                <p className="text-yellow-400 text-sm">
                  ⚠️ Добавьте хотя бы один chat ID для отправки уведомлений
                </p>
              ) : (
                <div className="space-y-2">
                  <p className="text-green-400 text-sm">
                    ✅ Сообщение будет отправлено {chatIds.length} получателям
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {chatIds.slice(0, 3).map(chatId => (
                      <span key={chatId} className="bg-gray-600 text-gray-300 px-2 py-1 rounded text-xs">
                        {chatId}
                      </span>
                    ))}
                    {chatIds.length > 3 && (
                      <span className="bg-gray-600 text-gray-300 px-2 py-1 rounded text-xs">
                        +{chatIds.length - 3} ещё
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={handleSendTestNotification}
              disabled={isSendingTest || chatIds.length === 0}
              className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 transition-colors cursor-pointer"
            >
              {isSendingTest ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Отправка...
                </span>
              ) : (
                `📤 Отправить тест (${chatIds.length} получателей)`
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Информационная панель */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">💡 Как это работает</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-gray-700 p-4 rounded-lg">
            <div className="text-blue-400 font-semibold mb-2">1. Получите Chat ID</div>
            <p className="text-gray-300">
              Напишите боту @userinfobot в Telegram, чтобы получить свой Chat ID
            </p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <div className="text-green-400 font-semibold mb-2">2. Добавьте Chat ID</div>
            <p className="text-gray-300">
              Введите полученный Chat ID в форму выше и нажмите "Добавить"
            </p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <div className="text-yellow-400 font-semibold mb-2">3. Тестируйте</div>
            <p className="text-gray-300">
              Отправьте тестовое уведомление, чтобы проверить настройки
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TelegramChatManager;