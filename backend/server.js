require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const app = express();
const path = require("path");

app.use(cors());
app.use(express.json());


const userRoutes = require("./routes/users")
const articlesRoutes = require("./routes/articles")
const uploads = require("./routes/upload")
const questions = require("./routes/questions")
const claims = require("./routes/claims")
const adminRoutes = require("./routes/admin")
const telegramRoutes = require("./routes/telegram")

app.use("/api/auth", userRoutes)
app.use("/upload", uploads)
app.use("/api/articles", articlesRoutes)
app.use("/api/questions", questions)
app.use("/api/claims", claims)
app.use("/api/admin", adminRoutes)
app.use("/api/telegram", telegramRoutes)
app.use("/api/files", express.static(path.join(__dirname, "../files")));



const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Ошибка подключения к базе данных:", err);
    return;
  }
  console.log("Подключение к базе данных успешно");
});

app.listen(process.env.PORT, () => {
  console.log(`Сервер запущен на порте ${process.env.PORT}`);
});

module.exports = db;