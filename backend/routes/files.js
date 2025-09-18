const express = require('express');
const multer = require('multer');
const path = require('path');
const {
  uploadFile,
  downloadFile,
  deleteFile,
  getFilesList,
  getFileInfo
} = require("../controllers/filesControllers");

const router = express.Router();

// Настройка multer для загрузки файлов
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Временное имя файла, потом переименуем в контроллере
    cb(null, `temp_${Date.now()}${path.extname(file.originalname)}`);
  }
});

// Фильтр файлов - только doc и docx
const fileFilter = (req, file, cb) => {
  const allowedExtensions = ['.doc', '.docx'];
  const fileExtension = path.extname(file.originalname).toLowerCase();
  
  if (allowedExtensions.includes(fileExtension)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only .doc and .docx files are allowed'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  }
});

// Маршруты
router.post('/upload', upload.single('file'), uploadFile);
router.get('/download/:filename', downloadFile);
router.delete('/delete/:filename', deleteFile);
router.get('/list', getFilesList);
router.get('/info/:filename', getFileInfo);

module.exports = router;