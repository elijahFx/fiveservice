// controllers/telegramController.js
const fs = require('fs').promises;
const path = require('path');

// Укажите абсолютный путь к папке проекта
// Укажите абсолютный путь к папке проекта
// ДЛЯ ПРОДА ИСПОЛЬЗОВАТЬ ЭТУ СТРОЧКУ, НО ВМЕСТО testend.site правильный адрес сайта -
//  const PROJECT_ROOT = "/var/www/vhosts/vh172.by3020.ihb.by/testend.site/project/project"; 
const PROJECT_ROOT = path.join(__dirname, '..');
const ENV_FILE_PATH = path.join(PROJECT_ROOT, '.env');

console.log('ENV file path:', ENV_FILE_PATH);

// Получение текущих chat IDs
const getChatIds = async (req, res) => {
  try {
    console.log('Reading .env file from:', ENV_FILE_PATH);

    // Проверяем существование .env файла
    try {
      await fs.access(ENV_FILE_PATH);;
      
    } catch (error) {
      // Если файла нет, создаем с базовой структурой
      const defaultEnvContent = `ADMIN_CHAT_IDS=\n`;
      await fs.writeFile(ENV_FILE_PATH, defaultEnvContent, 'utf8');
    }

    const envContent = await fs.readFile(ENV_FILE_PATH, 'utf8');
    console.log(envContent);
    
    
    // Парсим ADMIN_CHAT_IDS
    const chatIdsMatch = envContent.match(/ADMIN_CHAT_IDS=(.*)/);
    let chatIds = [];

    if (chatIdsMatch && chatIdsMatch[1]) {
      const idsString = chatIdsMatch[1].trim();
      if (idsString) {
        chatIds = idsString.split(',').map(id => id.trim()).filter(id => id);
      }
    }

    res.json({
      success: true,
      chatIds,
      total: chatIds.length
    });
  } catch (error) {
    console.error('Ошибка при получении chat IDs:', error);
    res.status(500).json({
      error: 'Ошибка сервера при получении chat IDs',
      details: error.message
    });
  }
};

// Добавление нового chat ID
const addChatId = async (req, res) => {
  try {
    const { chatId } = req.body;

    if (!chatId) {
      return res.status(400).json({
        error: 'Укажите chat ID'
      });
    }

    // Проверяем что chatId - число
    if (isNaN(chatId)) {
      return res.status(400).json({
        error: 'Chat ID должен быть числом'
      });
    }

    console.log('Adding chat ID:', chatId);

    // Читаем текущий .env файл
    let envContent = '';
    try {
      envContent = await fs.readFile(ENV_FILE_PATH, 'utf8');
    } catch (error) {
      // Если файла нет, создаем с базовой структурой
      envContent = `ADMIN_CHAT_IDS=\n`;
    }

    // Парсим текущие chat IDs
    const chatIdsMatch = envContent.match(/ADMIN_CHAT_IDS=(.*)/);
    let currentChatIds = [];

    if (chatIdsMatch && chatIdsMatch[1]) {
      const idsString = chatIdsMatch[1].trim();
      if (idsString) {
        currentChatIds = idsString.split(',').map(id => id.trim()).filter(id => id);
      }
    }

    // Проверяем, не существует ли уже такой chat ID
    if (currentChatIds.includes(chatId.toString())) {
      return res.status(409).json({
        error: 'Chat ID уже существует'
      });
    }

    // Добавляем новый chat ID
    currentChatIds.push(chatId.toString());

    // Обновляем .env файл
    const newEnvContent = envContent.replace(
      /ADMIN_CHAT_IDS=.*/,
      `ADMIN_CHAT_IDS=${currentChatIds.join(',')}`
    );

    // Если строка ADMIN_CHAT_IDS не найдена, добавляем её
    const finalEnvContent = newEnvContent.includes('ADMIN_CHAT_IDS=') 
      ? newEnvContent 
      : envContent + `\nADMIN_CHAT_IDS=${currentChatIds.join(',')}\n`;

    await fs.writeFile(ENV_FILE_PATH, finalEnvContent, 'utf8');

    res.json({
      success: true,
      message: 'Chat ID успешно добавлен',
      chatId,
      totalChatIds: currentChatIds.length,
      allChatIds: currentChatIds
    });
  } catch (error) {
    console.error('Ошибка при добавлении chat ID:', error);
    res.status(500).json({
      error: 'Ошибка сервера при добавлении chat ID',
      details: error.message
    });
  }
};

// Удаление chat ID
const deleteChatId = async (req, res) => {
  try {
    const { chatId } = req.body;

    if (!chatId) {
      return res.status(400).json({
        error: 'Укажите chat ID для удаления'
      });
    }

    console.log('Deleting chat ID:', chatId);

    // Читаем текущий .env файл
    let envContent = '';
    try {
      envContent = await fs.readFile(ENV_FILE_PATH, 'utf8');
    } catch (error) {
      return res.status(404).json({
        error: 'Файл .env не найден'
      });
    }

    // Парсим текущие chat IDs
    const chatIdsMatch = envContent.match(/ADMIN_CHAT_IDS=(.*)/);
    let currentChatIds = [];

    if (chatIdsMatch && chatIdsMatch[1]) {
      const idsString = chatIdsMatch[1].trim();
      if (idsString) {
        currentChatIds = idsString.split(',').map(id => id.trim()).filter(id => id);
      }
    }

    // Проверяем, существует ли chat ID
    const chatIdIndex = currentChatIds.indexOf(chatId.toString());
    if (chatIdIndex === -1) {
      return res.status(404).json({
        error: 'Chat ID не найден'
      });
    }

    // Удаляем chat ID
    currentChatIds.splice(chatIdIndex, 1);

    // Обновляем .env файл
    const newEnvContent = envContent.replace(
      /ADMIN_CHAT_IDS=.*/,
      `ADMIN_CHAT_IDS=${currentChatIds.join(',')}`
    );

    await fs.writeFile(ENV_FILE_PATH, newEnvContent, 'utf8');

    res.json({
      success: true,
      message: 'Chat ID успешно удален',
      chatId,
      totalChatIds: currentChatIds.length,
      allChatIds: currentChatIds
    });
  } catch (error) {
    console.error('Ошибка при удалении chat ID:', error);
    res.status(500).json({
      error: 'Ошибка сервера при удалении chat ID',
      details: error.message
    });
  }
};

// Обновление всех chat IDs (замена всего списка)
const updateChatIds = async (req, res) => {
  try {
    const { chatIds } = req.body;

    if (!Array.isArray(chatIds)) {
      return res.status(400).json({
        error: 'Укажите массив chat IDs'
      });
    }

    // Валидация chat IDs
    const validChatIds = chatIds.filter(chatId => {
      if (isNaN(chatId)) {
        console.warn(`Invalid chat ID skipped: ${chatId}`);
        return false;
      }
      return true;
    });

    console.log('Updating chat IDs:', validChatIds);

    // Читаем текущий .env файл
    let envContent = '';
    try {
      envContent = await fs.readFile(ENV_FILE_PATH, 'utf8');
    } catch (error) {
      // Если файла нет, создаем с базовой структурой
      envContent = `ADMIN_CHAT_IDS=\n`;
    }

    // Обновляем .env файл
    let newEnvContent;
    if (envContent.includes('ADMIN_CHAT_IDS=')) {
      newEnvContent = envContent.replace(
        /ADMIN_CHAT_IDS=.*/,
        `ADMIN_CHAT_IDS=${validChatIds.join(',')}`
      );
    } else {
      newEnvContent = envContent + `\nADMIN_CHAT_IDS=${validChatIds.join(',')}\n`;
    }

    await fs.writeFile(ENV_FILE_PATH, newEnvContent, 'utf8');

    res.json({
      success: true,
      message: 'Chat IDs успешно обновлены',
      chatIds: validChatIds,
      total: validChatIds.length
    });
  } catch (error) {
    console.error('Ошибка при обновлении chat IDs:', error);
    res.status(500).json({
      error: 'Ошибка сервера при обновлении chat IDs',
      details: error.message
    });
  }
};

// Отправка тестового уведомления
const sendTestNotification = async (req, res) => {
  try {
    const { message = 'Тестовое уведомление от системы' } = req.body;

    // Здесь должна быть логика отправки в Telegram
    // Для примера просто логируем
    console.log('Test Telegram notification:', message);

    // Читаем текущие chat IDs для демонстрации
    let envContent = '';
    try {
      envContent = await fs.readFile(ENV_FILE_PATH, 'utf8');
    } catch (error) {
      return res.status(404).json({
        error: 'Файл .env не найден'
      });
    }

    const chatIdsMatch = envContent.match(/ADMIN_CHAT_IDS=(.*)/);
    let chatIds = [];

    if (chatIdsMatch && chatIdsMatch[1]) {
      const idsString = chatIdsMatch[1].trim();
      if (idsString) {
        chatIds = idsString.split(',').map(id => id.trim()).filter(id => id);
      }
    }

    res.json({
      success: true,
      message: 'Тестовое уведомление отправлено (заглушка)',
      testMessage: message,
      sentTo: chatIds,
      totalRecipients: chatIds.length
    });
  } catch (error) {
    console.error('Ошибка при отправке тестового уведомления:', error);
    res.status(500).json({
      error: 'Ошибка сервера при отправке тестового уведомления',
      details: error.message
    });
  }
};

module.exports = {
  getChatIds,
  addChatId,
  deleteChatId,
  updateChatIds,
  sendTestNotification
};