const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadsDir = path.join(__dirname, '../uploads');

// Создаем папку uploads если она не существует
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Проверяем расширение файла
    const allowedExtensions = ['.doc', '.docx'];
    const fileExtension = path.extname(req.file.originalname).toLowerCase();
    
    if (!allowedExtensions.includes(fileExtension)) {
      // Удаляем загруженный файл если расширение не подходит
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ 
        error: 'Invalid file type. Only .doc and .docx files are allowed' 
      });
    }

    // Генерируем уникальное имя файла
    const uniqueFileName = `${uuidv4()}${fileExtension}`;
    const newFilePath = path.join(uploadsDir, uniqueFileName);

    // Переименовываем файл
    fs.renameSync(req.file.path, newFilePath);

    res.status(201).json({
      message: 'File uploaded successfully',
      filename: uniqueFileName,
      originalName: req.file.originalname,
      size: req.file.size,
      downloadUrl: `/api/files/download/${uniqueFileName}`
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const downloadFile = async (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(uploadsDir, filename);

    // Проверяем существование файла
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Проверяем расширение файла для безопасности
    const fileExtension = path.extname(filename).toLowerCase();
    const allowedExtensions = ['.doc', '.docx'];
    
    if (!allowedExtensions.includes(fileExtension)) {
      return res.status(400).json({ error: 'Invalid file type' });
    }

    // Устанавливаем заголовки для скачивания
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    
    // Определяем Content-Type в зависимости от расширения
    const contentType = fileExtension === '.doc' 
      ? 'application/msword' 
      : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    
    res.setHeader('Content-Type', contentType);

    // Отправляем файл
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);

    fileStream.on('error', (error) => {
      console.error('Error streaming file:', error);
      res.status(500).json({ error: 'Error downloading file' });
    });

  } catch (error) {
    console.error('Error downloading file:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteFile = async (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(uploadsDir, filename);

    // Проверяем существование файла
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Проверяем расширение файла для безопасности
    const fileExtension = path.extname(filename).toLowerCase();
    const allowedExtensions = ['.doc', '.docx'];
    
    if (!allowedExtensions.includes(fileExtension)) {
      return res.status(400).json({ error: 'Invalid file type' });
    }

    // Удаляем файл
    fs.unlinkSync(filePath);

    res.status(200).json({ 
      message: 'File deleted successfully',
      filename: filename
    });
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getFilesList = async (req, res) => {
  try {
    const files = fs.readdirSync(uploadsDir);
    
    const fileList = files
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.doc', '.docx'].includes(ext);
      })
      .map(file => {
        const filePath = path.join(uploadsDir, file);
        const stats = fs.statSync(filePath);
        
        return {
          filename: file,
          originalName: file, // Можно хранить оригинальные имена в отдельной БД
          size: stats.size,
          uploadedAt: stats.mtime,
          downloadUrl: `/api/files/download/${file}`
        };
      });

    res.status(200).json(fileList);
  } catch (error) {
    console.error('Error getting files list:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getFileInfo = async (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(uploadsDir, filename);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }

    const fileExtension = path.extname(filename).toLowerCase();
    const allowedExtensions = ['.doc', '.docx'];
    
    if (!allowedExtensions.includes(fileExtension)) {
      return res.status(400).json({ error: 'Invalid file type' });
    }

    const stats = fs.statSync(filePath);

    res.status(200).json({
      filename: filename,
      originalName: filename, // Можно хранить в БД оригинальные имена
      size: stats.size,
      uploadedAt: stats.mtime,
      downloadUrl: `/api/files/download/${filename}`
    });
  } catch (error) {
    console.error('Error getting file info:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  uploadFile,
  downloadFile,
  deleteFile,
  getFilesList,
  getFileInfo
};