const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const requireAuth = require("../requireAuth");

const router = express.Router();

// Функция для нормализации кириллических имен файлов
const normalizeFileName = (fileName) => {
  // Сохраняем оригинальное кириллическое имя, убираем только небезопасные символы
  const safeName = fileName.replace(/[<>:"|?*]/g, '_');
  return safeName;
};

// Проверка типа файла - ТОЛЬКО DOC и DOCX
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
  const allowedExtensions = ['.doc', '.docx'];

  const fileExtension = path.extname(file.originalname).toLowerCase();
  
  if (allowedTypes.includes(file.mimetype) && allowedExtensions.includes(fileExtension)) {
    cb(null, true);
  } else {
    cb(new Error('Разрешены только файлы DOC и DOCX'), false);
  }
};

// Настройка multer с сохранением кириллических имен
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, "../../files");
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    // Сохраняем кириллическое имя файла
    const originalName = normalizeFileName(file.originalname);
    const uniqueName = `${Date.now()}-${originalName}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 МБ
  }
});

// Обработка ошибок multer
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: "Размер файла не должен превышать 10 МБ" });
    }
    return res.status(400).json({ message: err.message });
  } else if (err) {
    return res.status(400).json({ message: err.message });
  }
  next();
};

router.post("/", requireAuth, upload.single("requisites"), handleMulterError, (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Файл не получен или не прошел валидацию" });
  }

  res.status(200).json({
    message: "Файл успешно загружен",
    filePath: `/files/${req.file.filename}`,
    fileName: req.file.originalname, // Возвращаем оригинальное кириллическое имя
    fileSize: req.file.size
  });
});

// Получение списка ТОЛЬКО DOC и DOCX файлов
router.get("/", requireAuth, (req, res) => {
  const dirPath = path.join(__dirname, "../../files");

  if (!fs.existsSync(dirPath)) {
    return res.status(200).json({ files: [] });
  }

  fs.readdir(dirPath, (err, files) => {
    if (err) {
      console.error("Ошибка при чтении папки:", err);
      return res.status(500).json({ message: "Ошибка при чтении файлов" });
    }

    // Фильтруем только DOC и DOCX файлы
    const docFiles = files.filter(filename => {
      const ext = path.extname(filename).toLowerCase();
      return ext === '.doc' || ext === '.docx';
    });

    const fileInfos = docFiles.map((filename) => {
      const fullPath = path.join(dirPath, filename);
      const stats = fs.statSync(fullPath);

      // Восстанавливаем оригинальное имя (без timestamp)
      const originalName = filename.includes('-') 
        ? filename.split('-').slice(1).join('-') 
        : filename;

      return {
        name: filename,
        originalName: originalName,
        size: stats.size,
        createdAt: stats.birthtime,
        url: `/files/${filename}`,
      };
    });

    res.status(200).json({ files: fileInfos });
  });
});

// Скачивание файла - проверяем тип и возвращаем кириллическое имя
router.get("/download/:fileName", requireAuth, (req, res) => {
  const { fileName } = req.params;
  const filePath = path.join(__dirname, "../../files", fileName);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: "Файл не найден" });
  }

  // Проверяем, что файл имеет разрешенное расширение
  const ext = path.extname(fileName).toLowerCase();
  if (ext !== '.doc' && ext !== '.docx') {
    return res.status(403).json({ message: "Доступ разрешен только к файлам DOC и DOCX" });
  }

  // Восстанавливаем оригинальное кириллическое имя для скачивания
  let originalName = fileName;
  if (fileName.includes('-')) {
    originalName = fileName.split('-').slice(1).join('-');
  }

  res.download(filePath, originalName, (err) => {
    if (err) {
      console.error("Ошибка при скачивании файла:", err);
      res.status(500).send("Ошибка при скачивании файла");
    }
  });
});

// Удаление файла
router.delete("/:fileName", requireAuth, (req, res) => {
  const { fileName } = req.params;
  const filePath = path.join(__dirname, "../../files", fileName);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: "Файл не найден" });
  }

  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Ошибка при удалении файла:", err);
      return res.status(500).json({ message: "Ошибка при удалении файла" });
    }

    res.status(200).json({ message: "Файл успешно удален" });
  });
});

module.exports = router;