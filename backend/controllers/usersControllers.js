const createDbConnection = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

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
      "INSERT INTO users (id, password, nickname, createdAt, status, rank, fullName) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        userId,
        hashedPassword,
        nickname,
        createdAt,
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
      "SELECT id, password, email, status, rank, fullName, createdAt FROM users WHERE nickname = ? LIMIT 1",
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
    const token = jwt.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: "5h",
    });

    const userResponse = {
      id: user.id,
      email: user.email,
      status: user.status,
      rank: user.rank,
      fullName: user.fullName,
      createdAt: user.createdAt || "нет",
      token,
      nickname,
    };

    return res.status(200).json(userResponse);
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Внутренняя ошибка сервера" });
  } finally {
    if (connection) await connection.end();
  }
}

async function getAllUsers(req, res) {
  let connection;

  try {
    connection = await createDbConnection();

    // Получаем всех пользователей, исключая пароль из результатов
    const [users] = await connection.query(
      `SELECT id, nickname, email, status, rank, fullName, createdAt, isVerified
       FROM users 
       ORDER BY createdAt DESC`
    );

    return res.status(200).json({
      users,
      count: users.length
    });
  } catch (error) {
    console.error("Get all users error:", error);
    return res.status(500).json({ error: "Внутренняя ошибка сервера" });
  } finally {
    if (connection) await connection.end();
  }
}

async function editUserLikeAdmin(req, res) {
  let connection;

  try {
    connection = await createDbConnection();

    const { id, nickname, fullName, status, rank, isVerified } = req.body;

    // Проверяем, что ID передан
    if (!id) {
      return res.status(400).json({ error: "ID пользователя обязателен" });
    }

    // Проверяем существование пользователя
    const [existingUsers] = await connection.query(
      "SELECT id FROM users WHERE id = ? LIMIT 1",
      [id]
    );

    if (existingUsers.length === 0) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }

    // Подготавливаем поля для обновления
    const updateFields = [];
    const updateValues = [];

    if (nickname !== undefined) {
      // Проверяем, не занят ли nickname другим пользователем
      const [nicknameUsers] = await connection.query(
        "SELECT id FROM users WHERE nickname = ? AND id != ? LIMIT 1",
        [nickname, id]
      );

      if (nicknameUsers.length > 0) {
        return res.status(409).json({ error: "Этот nickname уже занят" });
      }
      updateFields.push("nickname = ?");
      updateValues.push(nickname);
    }

    if (fullName !== undefined) {
      updateFields.push("fullName = ?");
      updateValues.push(fullName);
    }

    if (status !== undefined) {
      updateFields.push("status = ?");
      updateValues.push(status);
    }

    if (rank !== undefined) {
      updateFields.push("rank = ?");
      updateValues.push(rank);
    }

    if (isVerified !== undefined) {
      updateFields.push("isVerified = ?");
      updateValues.push(isVerified);
    }

    // Если нет полей для обновления
    if (updateFields.length === 0) {
      return res.status(400).json({ error: "Нет данных для обновления" });
    }

    // Добавляем ID в конец массива значений
    updateValues.push(id);

    // Выполняем обновление
    const [result] = await connection.query(
      `UPDATE users SET ${updateFields.join(", ")} WHERE id = ?`,
      updateValues
    );

    // Получаем обновленные данные пользователя
    const [updatedUsers] = await connection.query(
      `SELECT id, nickname, email, status, rank, fullName, isVerified, createdAt 
       FROM users WHERE id = ? LIMIT 1`,
      [id]
    );

    if (updatedUsers.length === 0) {
      return res.status(404).json({ error: "Пользователь не найден после обновления" });
    }

    return res.status(200).json({
      message: "Данные пользователя успешно обновлены",
      user: updatedUsers[0]
    });

  } catch (error) {
    console.error("Edit user like admin error:", error);
    return res.status(500).json({ error: "Внутренняя ошибка сервера" });
  } finally {
    if (connection) await connection.end();
  }
}

async function updateUser(req, res) {
  let connection;

  try {
    connection = await createDbConnection();

    // Получаем ID пользователя из токена (текущий авторизованный пользователь)
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: "Токен не предоставлен" });
    }

    const decoded = jwt.verify(token, process.env.SECRET);
    const userId = decoded.id;

    const { nickname, fullName, rank, status } = req.body;

    // Проверяем существование пользователя
    const [existingUsers] = await connection.query(
      "SELECT id FROM users WHERE id = ? LIMIT 1",
      [userId]
    );

    if (existingUsers.length === 0) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }

    // Подготавливаем поля для обновления
    const updateFields = [];
    const updateValues = [];

    if (nickname !== undefined) {
      // Проверяем, не занят ли nickname другим пользователем
      const [nicknameUsers] = await connection.query(
        "SELECT id FROM users WHERE nickname = ? AND id != ? LIMIT 1",
        [nickname, userId]
      );

      if (nicknameUsers.length > 0) {
        return res.status(409).json({ error: "Этот nickname уже занят" });
      }
      updateFields.push("nickname = ?");
      updateValues.push(nickname);
    }

    if (fullName !== undefined) {
      updateFields.push("fullName = ?");
      updateValues.push(fullName);
    }

    if (rank !== undefined) {
      updateFields.push("rank = ?");
      updateValues.push(rank);
    }

    if (status !== undefined) {
      updateFields.push("status = ?");
      updateValues.push(status);
    }

    // Если нет полей для обновления
    if (updateFields.length === 0) {
      return res.status(400).json({ error: "Нет данных для обновления" });
    }

    // Добавляем ID в конец массива значений
    updateValues.push(userId);

    // Выполняем обновление
    const [result] = await connection.query(
      `UPDATE users SET ${updateFields.join(", ")} WHERE id = ?`,
      updateValues
    );

    // Получаем обновленные данные пользователя
    const [updatedUsers] = await connection.query(
      `SELECT id, nickname, email, status, rank, fullName, isVerified, createdAt 
       FROM users WHERE id = ? LIMIT 1`,
      [userId]
    );

    if (updatedUsers.length === 0) {
      return res.status(404).json({ error: "Пользователь не найден после обновления" });
    }

    const updatedUser = updatedUsers[0];

    // Генерируем новый токен если изменился nickname
    let newToken = token;
    if (nickname !== undefined) {
      newToken = jwt.sign({ id: userId }, process.env.SECRET, {
        expiresIn: "5h",
      });
    }

    return res.status(200).json({
      message: "Данные пользователя успешно обновлены",
      user: {
        id: updatedUser.id,
        nickname: updatedUser.nickname,
        email: updatedUser.email,
        status: updatedUser.status,
        rank: updatedUser.rank,
        fullName: updatedUser.fullName,
        isVerified: updatedUser.isVerified,
        createdAt: updatedUser.createdAt,
        token: newToken
      }
    });

  } catch (error) {
    console.error("Update user error:", error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: "Неверный токен" });
    }
    
    return res.status(500).json({ error: "Внутренняя ошибка сервера" });
  } finally {
    if (connection) await connection.end();
  }
}

module.exports = {
  signup,
  login,
  getAllUsers,
  editUserLikeAdmin,
  updateUser
};
