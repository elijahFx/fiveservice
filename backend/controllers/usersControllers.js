const createDbConnection = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const cloudinary = require("../utils/cloudinary");
const multer = require("multer");

require("dotenv").config();

async function signup(req, res) {
  let connection;

  try {
    connection = await createDbConnection();

    const { password, nickname, avatar, status, rank, fullName } = req.body;

    // Валидация обязательных полей
    if (!nickname || !password) {
      return res.status(400).json({ error: "Требуются nickname и пароль" });
    }

    // Проверка существующего пользователя
    const [existingUser] = await connection.query(
      "SELECT id FROM users WHERE nickname = ? LIMIT 1",
      [nickname]
    );

    if (existingUser.length > 0) {
      return res.status(409).json({ error: "Пользователь уже существует" });
    }

    // Хеширование пароля
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuidv4(); // Генерация UUID
    const createdAt = new Date().toISOString(); // Текущая дата

    // Вставка нового пользователя
    await connection.query(
      "INSERT INTO users (id, password, nickname, createdAt, avatar, status, rank, fullName) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        userId,
        hashedPassword,
        nickname,
        createdAt,
        avatar || null,
        status || "user",
        rank || "",
        fullName,
      ]
    );

    // Создание JWT токена
    const token = jwt.sign({ id: userId }, process.env.SECRET, {
      expiresIn: "5h",
    });

    // Возвращаем данные без хеша пароля
    return res.status(201).json({
      user: {
        id: userId,
        nickname,
        createdAt,
        avatar,
        status,
        rank,
        fullName,
      },
      token,
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ error: "Внутренняя ошибка сервера" });
  } finally {
    if (connection) await connection.end();
  }
}

async function login(req, res) {
  let connection;

  try {
    connection = await createDbConnection();

    const { nickname, password } = req.body;

    if (!nickname || !password) {
      return res.status(400).json({ error: "Требуются nickname и пароль" });
    }

    const [users] = await connection.query(
      "SELECT id, password, nickname, status, avatar, rank, fullName, createdAt FROM users WHERE nickname = ? LIMIT 1",
      [nickname]
    );

    if (users.length === 0) {
      return res.status(401).json({ error: "Неверные учетные данные" });
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Неверные учетные данные" });
    }

    // Кол-во всех дел
    const [caseCountResult] = await connection.query(
      "SELECT COUNT(*) AS count FROM cases WHERE responsibleEmployee = ?",
      [user.fullName]
    );
    const caseCount = caseCountResult[0]?.count || 0;

    // Кол-во дел по каждому из 4 нужных статусов
    const [statusCounts] = await connection.query(
      `SELECT status, COUNT(*) as count
       FROM cases
       WHERE responsibleEmployee = ?
         AND status IN (?, ?, ?, ?)
       GROUP BY status`,
      [
        user.fullName,
        "Новое",
        "Ведется работа по делу",
        "В архиве",
        "Вынесено решение (определение)",
      ]
    );

    // Преобразуем массив результатов в объект вида { "Новое": 5, ... }
    const statusCountMap = {
      Новое: 0,
      "Ведется работа по делу": 0,
      "В архиве": 0,
      "Вынесено решение (определение)": 0,
    };
    statusCounts.forEach(({ status, count }) => {
      statusCountMap[status] = count;
    });

    const token = jwt.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: "5h",
    });

    const userResponse = {
      id: user.id,
      nickname: user.nickname,
      status: user.status,
      avatar: user.avatar,
      rank: user.rank,
      fullName: user.fullName,
      createdAt: user.createdAt || "нет",
      token,
      caseCount,
      caseStatuses: statusCountMap,
    };

    return res.status(200).json(userResponse);
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Внутренняя ошибка сервера" });
  } finally {
    if (connection) await connection.end();
  }
}


module.exports = {
  signup,
  login,
};
