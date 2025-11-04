// routes/telegramRoutes.js
const express = require('express');
const router = express.Router();
const {
  getChatIds,
  addChatId,
  deleteChatId,
  updateChatIds,
  sendTestNotification
} = require('../controllers/telegramControllers');

// Получение всех chat IDs
router.get('/chat-ids', getChatIds);

// Добавление нового chat ID
router.post('/chat-ids', addChatId);

// Удаление chat ID
router.delete('/chat-ids', deleteChatId);

// Обновление всех chat IDs
router.put('/chat-ids', updateChatIds);

// Отправка тестового уведомления
router.post('/test-notification', sendTestNotification);

module.exports = router;