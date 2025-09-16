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


app.use("/api/auth", userRoutes)
app.use("/upload", uploads)
app.use("/articles", articlesRoutes)
app.use("/files", express.static(path.join(__dirname, "../files")));


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
