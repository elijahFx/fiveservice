const express = require('express');
const router = express.Router();
const {
  addQuestion,
  getQuestions,
  getFeaturedQuestions,
  getUnansweredQuestions,
  getAnsweredQuestions,
  getQuestionsByAuthor,
  getSingleQuestion,
  answerQuestion,
  toggleFeatured,
  editQuestion,
  deleteQuestion,
  searchQuestions
} = require('../controllers/questionsControllers');
const requireAuth = require("../requireAuth")

// Маршруты для вопросов

// GET /api/questions - Получить все вопросы
router.get('/', getQuestions);

// GET /api/questions/featured - Получить избранные вопросы
router.get('/featured', requireAuth, getFeaturedQuestions);

// GET /api/questions/unanswered - Получить неотвеченные вопросы
router.get('/unanswered', requireAuth, getUnansweredQuestions);

// GET /api/questions/answered - Получить отвеченные вопросы
router.get('/answered', getAnsweredQuestions);

// GET /api/questions/search - Поиск вопросов
router.get('/search', requireAuth, searchQuestions);

// GET /api/questions/author/:author - Получить вопросы по автору
router.get('/author/:author', requireAuth, getQuestionsByAuthor);

// GET /api/questions/:id - Получить конкретный вопрос
router.get('/:id', requireAuth, getSingleQuestion);

// POST /api/questions - Создать новый вопрос
router.post('/', addQuestion);

// PUT /api/questions/:id/answer - Ответить на вопрос
router.put('/:id/answer', requireAuth, answerQuestion);

// PUT /api/questions/:id/featured - Изменить избранный статус
router.put('/:id/featured', requireAuth, toggleFeatured);

// PUT /api/questions/:id - Редактировать вопрос
router.put('/:id', requireAuth, editQuestion);

// DELETE /api/questions/:id - Удалить вопрос
router.delete('/:id', requireAuth, deleteQuestion);

module.exports = router;