const express = require("express");

const {
  addArticle,
  getArticles,
  getArticlesByUser,
  getArticlesByCategory,
  getSingleArticle,
  editArticle,
  deleteArticle,
  likeArticle,
  unlikeArticle,
  searchArticles
} = require("../controllers/articlesControllers");
const requireAuth = require("../requireAuth");

const router = express.Router();

// Получение всех статей (должен быть выше динамических маршрутов)
router.get("/", requireAuth, getArticles);

// Поиск статей
router.get("/search", requireAuth, searchArticles);

// Создание статьи
router.post("/", requireAuth, addArticle);

// Получение статей по пользователю
router.get("/user/:user_id", requireAuth, getArticlesByUser);

// Получение статей по категории
router.get("/category/:category", requireAuth, getArticlesByCategory);

// Получение одной статьи
router.get("/:id", requireAuth, getSingleArticle);

// Редактирование статьи
router.put("/:id", requireAuth, editArticle);

// Лайк статьи
router.patch("/:id/like", requireAuth, likeArticle);

// Снятие лайка
router.patch("/:id/unlike", requireAuth, unlikeArticle);

// Удаление статьи
router.delete("/:id", requireAuth, deleteArticle);

module.exports = router;