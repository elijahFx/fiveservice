const fs = require('fs').promises;
const path = require('path');
const { exec } = require('child_process');

// Укажите абсолютный путь к папке проекта
const PROJECT_ROOT = path.join(__dirname, '..', '..', 'project');

console.log(PROJECT_ROOT);


// Просмотр файлов в папках
const readDirectory = async (dir) => {
  const items = await fs.readdir(dir);
  const result = [];

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = await fs.stat(fullPath);
    
    // Получаем относительный путь от PROJECT_ROOT
    const relativePath = path.relative(PROJECT_ROOT, fullPath);

    if (stat.isDirectory()) {
      result.push({
        name: item,
        path: relativePath,
        fullPath: fullPath,
        type: 'directory',
        size: stat.size,
        modified: stat.mtime
      });
    } else {
      result.push({
        name: item,
        path: relativePath,
        fullPath: fullPath,
        type: 'file',
        size: stat.size,
        modified: stat.mtime
      });
    }
  }

  return result;
};

// Просмотр содержимого папки
const getFiles = async (req, res) => {
  try {
    const { folder = '/app' } = req.query; // по умолчанию /app
    
    // Разрешаем доступ к любой папке внутри PROJECT_ROOT
    let targetPath;
    
    if (folder.startsWith('/app') || folder.startsWith('/components')) {
      targetPath = path.join(PROJECT_ROOT, folder);
    } else {
      // Если передана произвольная папка, проверяем что она внутри разрешенных путей
      const normalizedPath = path.normalize(folder);
      if (normalizedPath.startsWith('..') || normalizedPath.includes('/..')) {
        return res.status(403).json({
          error: 'Доступ запрещен'
        });
      }
      targetPath = path.join(PROJECT_ROOT, normalizedPath);
    }

    console.log('Target path:', targetPath);
    
    // Проверяем что путь находится внутри PROJECT_ROOT
    if (!targetPath.startsWith(PROJECT_ROOT)) {
      return res.status(403).json({
        error: 'Доступ запрещен'
      });
    }
    
    // Проверяем существование папки
    try {
      await fs.access(targetPath);
    } catch (error) {
      return res.status(404).json({
        error: `Папка не найдена по пути: ${targetPath}`
      });
    }

    // Проверяем что это действительно папка
    const stat = await fs.stat(targetPath);
    if (!stat.isDirectory()) {
      return res.status(400).json({
        error: 'Указанный путь не является папкой'
      });
    }

    const items = await readDirectory(targetPath);
    console.log(`Найдено элементов в ${folder}: ${items.length}`);
    
    res.json({
      currentFolder: folder,
      items
    });
  } catch (error) {
    console.error('Ошибка при получении файлов:', error);
    res.status(500).json({
      error: 'Ошибка сервера при получении файлов'
    });
  }
};

// Получение содержимого файла
const getFileContent = async (req, res) => {
  try {
    const { filepath } = req.query;

    if (!filepath) {
      return res.status(400).json({
        error: 'Укажите путь к файлу'
      });
    }

    // Используем PROJECT_ROOT
    const fullPath = path.join(PROJECT_ROOT, filepath);

    console.log('Reading file:', fullPath);

    // Проверяем существование файла
    try {
      await fs.access(fullPath);
    } catch (error) {
      return res.status(404).json({
        error: 'Файл не найден'
      });
    }

    // Проверяем что это файл, а не папка
    const stat = await fs.stat(fullPath);
    if (stat.isDirectory()) {
      return res.status(400).json({
        error: 'Указанный путь является папкой, а не файлом'
      });
    }

    const content = await fs.readFile(fullPath, 'utf8');
    
    res.json({
      filepath,
      content
    });
  } catch (error) {
    console.error('Ошибка при чтении файла:', error);
    res.status(500).json({
      error: 'Ошибка сервера при чтении файла'
    });
  }
};

// Сохранение файла
const saveFile = async (req, res) => {
  try {
    const { filepath, content } = req.body;

    if (!filepath || content === undefined) {
      return res.status(400).json({
        error: 'Укажите путь к файлу и содержимое'
      });
    }

    // Используем PROJECT_ROOT
    const fullPath = path.join(PROJECT_ROOT, filepath);

    console.log('Saving file:', fullPath);

    // Создаем директории если их нет
    const dir = path.dirname(fullPath);
    await fs.mkdir(dir, { recursive: true });

    await fs.writeFile(fullPath, content, 'utf8');
    
    res.json({
      success: true,
      message: 'Файл успешно сохранен',
      filepath
    });
  } catch (error) {
    console.error('Ошибка при сохранении файла:', error);
    res.status(500).json({
      error: 'Ошибка сервера при сохранении файла'
    });
  }
};

// Создание нового файла
const createFile = async (req, res) => {
  try {
    const { filepath, content = '' } = req.body;

    if (!filepath) {
      return res.status(400).json({
        error: 'Укажите путь к файлу'
      });
    }

    // Используем PROJECT_ROOT
    const fullPath = path.join(PROJECT_ROOT, filepath);

    console.log('Creating file:', fullPath);

    // Проверяем, не существует ли уже файл
    try {
      await fs.access(fullPath);
      return res.status(409).json({
        error: 'Файл уже существует'
      });
    } catch (error) {
      // Файл не существует, можно создавать
    }

    // Создаем директории если их нет
    const dir = path.dirname(fullPath);
    await fs.mkdir(dir, { recursive: true });

    await fs.writeFile(fullPath, content, 'utf8');
    
    res.json({
      success: true,
      message: 'Файл успешно создан',
      filepath
    });
  } catch (error) {
    console.error('Ошибка при создании файла:', error);
    res.status(500).json({
      error: 'Ошибка сервера при создании файла'
    });
  }
};

// Остальные функции остаются без изменений, но нужно обновить пути для exec команд
// Сборка проекта
const buildProject = async (req, res) => {
  try {
    res.json({
      message: 'Запуск сборки проекта...',
      status: 'started'
    });

    // Запускаем сборку в фоне, указывая правильную рабочую директорию
    exec('npm run build', { cwd: PROJECT_ROOT }, (error, stdout, stderr) => {
      if (error) {
        console.error('Ошибка сборки:', error);
        return;
      }
      
      if (stderr) {
        console.error('STDERR сборки:', stderr);
      }
      
      console.log('Сборка завершена:', stdout);
    });
  } catch (error) {
    console.error('Ошибка при запуске сборки:', error);
    res.status(500).json({
      error: 'Ошибка сервера при запуске сборки'
    });
  }
};

// Запуск сервера
const startServer = async (req, res) => {
  try {
    res.json({
      message: 'Запуск сервера...',
      status: 'started'
    });

    // Запускаем сервер в фоне, указывая правильную рабочую директорию
    exec('npm run start:server', { cwd: PROJECT_ROOT }, (error, stdout, stderr) => {
      if (error) {
        console.error('Ошибка запуска сервера:', error);
        return;
      }
      
      if (stderr) {
        console.error('STDERR сервера:', stderr);
      }
      
      console.log('Сервер запущен:', stdout);
    });
  } catch (error) {
    console.error('Ошибка при запуске сервера:', error);
    res.status(500).json({
      error: 'Ошибка сервера при запуске сервера'
    });
  }
};

// Полная сборка и запуск
const buildAndStart = async (req, res) => {
  try {
    res.json({
      message: 'Запуск полной сборки и запуска сервера...',
      status: 'started'
    });

    console.log('Начало сборки проекта...');
    
    exec('npm run build', { cwd: PROJECT_ROOT }, (buildError, buildStdout, buildStderr) => {
      if (buildError) {
        console.error('Ошибка сборки:', buildError);
        return;
      }
      
      console.log('Сборка завершена:', buildStdout);
      
      if (buildStderr) {
        console.error('STDERR сборки:', buildStderr);
      }

      console.log('Запуск сервера...');
      
      exec('npm run start:server', { cwd: PROJECT_ROOT }, (serverError, serverStdout, serverStderr) => {
        if (serverError) {
          console.error('Ошибка запуска сервера:', serverError);
          return;
        }
        
        console.log('Сервер запущен:', serverStdout);
        
        if (serverStderr) {
          console.error('STDERR сервера:', serverStderr);
        }
      });
    });
  } catch (error) {
    console.error('Ошибка при сборке и запуске:', error);
    res.status(500).json({
      error: 'Ошибка сервера при сборке и запуске'
    });
  }
};

// Установка зависимостей
const installDependencies = async (req, res) => {
  try {
    res.json({
      message: 'Запуск установки зависимостей...',
      status: 'started'
    });

    console.log('Начало установки зависимостей...');
    
    exec('npm install', { cwd: PROJECT_ROOT }, (error, stdout, stderr) => {
      if (error) {
        console.error('Ошибка установки зависимостей:', error);
        return;
      }
      
      console.log('Зависимости установлены:', stdout);
      
      if (stderr) {
        console.error('STDERR установки:', stderr);
      }
    });
  } catch (error) {
    console.error('Ошибка при установке зависимостей:', error);
    res.status(500).json({
      error: 'Ошибка сервера при установке зависимостей'
    });
  }
};

// Установка конкретного пакета
const installPackage = async (req, res) => {
  try {
    const { packageName } = req.body;

    if (!packageName) {
      return res.status(400).json({
        error: 'Укажите имя пакета'
      });
    }

    res.json({
      message: `Установка пакета ${packageName}...`,
      status: 'started'
    });

    exec(`npm install ${packageName}`, { cwd: PROJECT_ROOT }, (error, stdout, stderr) => {
      if (error) {
        console.error(`Ошибка установки пакета ${packageName}:`, error);
        return;
      }
      
      console.log(`Пакет ${packageName} установлен:`, stdout);
      
      if (stderr) {
        console.error(`STDERR установки ${packageName}:`, stderr);
      }
    });
  } catch (error) {
    console.error('Ошибка при установке пакета:', error);
    res.status(500).json({
      error: 'Ошибка сервера при установке пакета'
    });
  }
};

// Удаление пакета
const uninstallPackage = async (req, res) => {
  try {
    const { packageName } = req.body;

    if (!packageName) {
      return res.status(400).json({
        error: 'Укажите имя пакета'
      });
    }

    res.json({
      message: `Удаление пакета ${packageName}...`,
      status: 'started'
    });

    exec(`npm uninstall ${packageName}`, { cwd: PROJECT_ROOT }, (error, stdout, stderr) => {
      if (error) {
        console.error(`Ошибка удаления пакета ${packageName}:`, error);
        return;
      }
      
      console.log(`Пакет ${packageName} удален:`, stdout);
      
      if (stderr) {
        console.error(`STDERR удаления ${packageName}:`, stderr);
      }
    });
  } catch (error) {
    console.error('Ошибка при удалении пакета:', error);
    res.status(500).json({
      error: 'Ошибка сервера при удалении пакета'
    });
  }
};

// Остальные функции остаются без изменений
const getBuildStatus = async (req, res) => {
  try {
    res.json({
      status: 'unknown',
      message: 'Функционал проверки статуса требует дополнительной реализации'
    });
  } catch (error) {
    console.error('Ошибка при получении статуса сборки:', error);
    res.status(500).json({
      error: 'Ошибка сервера при получении статуса сборки'
    });
  }
};

const healthCheck = async (req, res) => {
  try {
    res.json({
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      projectRoot: PROJECT_ROOT
    });
  } catch (error) {
    console.error('Ошибка при health check:', error);
    res.status(500).json({
      error: 'Ошибка сервера при health check'
    });
  }
};

module.exports = {
  getFiles,
  getFileContent,
  saveFile,
  createFile,
  buildProject,
  startServer,
  buildAndStart,
  getBuildStatus,
  installDependencies,
  installPackage,
  uninstallPackage,
  healthCheck
};