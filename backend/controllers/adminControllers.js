const fs = require('fs').promises;
const path = require('path');
const { exec } = require('child_process');

// Укажите абсолютный путь к папке проекта
// ДЛЯ ПРОДА ИСПОЛЬЗОВАТЬ ЭТУ СТРОЧКУ, НО ВМЕСТО testend.site правильный адрес сайта -
//  const PROJECT_ROOT = "/var/www/vhosts/vh172.by3020.ihb.by/testend.site/project/project"; 
const PROJECT_ROOT = path.join(__dirname, '..', '..', 'project');

console.log('PROJECT ROOT:', PROJECT_ROOT);

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

// Просмотр содержимого папки - УПРОЩЕННАЯ ВЕРСИЯ
const getFiles = async (req, res) => {
  try {
    const { folder = '' } = req.query; // по умолчанию корневая папка
    
    // Разрешаем доступ к любой папке внутри PROJECT_ROOT
    let targetPath;
    
    if (folder === '' || folder === '/') {
      // Корневая папка проекта
      targetPath = PROJECT_ROOT;
    } else {
      // Любая подпапка внутри PROJECT_ROOT
      const normalizedPath = path.normalize(folder);
      
      // Защита от path traversal атак
      if (normalizedPath.startsWith('..') || normalizedPath.includes('/..') || normalizedPath.includes('../')) {
        return res.status(403).json({
          error: 'Доступ запрещен: попытка выхода за пределы корневой папки'
        });
      }
      
      targetPath = path.join(PROJECT_ROOT, normalizedPath);
    }

    console.log('Target path:', targetPath);
    
    // Проверяем что путь находится внутри PROJECT_ROOT
    const relativeToRoot = path.relative(PROJECT_ROOT, targetPath);
    if (relativeToRoot.startsWith('..') || path.isAbsolute(relativeToRoot)) {
      return res.status(403).json({
        error: 'Доступ запрещен: путь находится вне корневой папки проекта'
      });
    }
    
    // Проверяем существование папки
    try {
      await fs.access(targetPath);
    } catch (error) {
      return res.status(404).json({
        error: `Папка не найдена по пути: ${targetPath}`,
        requestedPath: folder,
        resolvedPath: targetPath
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
    
    // Получаем относительный путь для отображения
    const displayPath = folder === '' ? '/' : `/${folder}`;
    
    res.json({
      currentFolder: displayPath,
      items,
      projectRoot: PROJECT_ROOT
    });
  } catch (error) {
    console.error('Ошибка при получении файлов:', error);
    res.status(500).json({
      error: 'Ошибка сервера при получении файлов',
      details: error.message
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

    // Защита от path traversal
    const normalizedPath = path.normalize(filepath);
    if (normalizedPath.startsWith('..') || normalizedPath.includes('/..') || normalizedPath.includes('../')) {
      return res.status(403).json({
        error: 'Доступ запрещен: недопустимый путь к файлу'
      });
    }

    // Используем PROJECT_ROOT
    const fullPath = path.join(PROJECT_ROOT, filepath);

    // Проверяем что файл находится внутри PROJECT_ROOT
    const relativeToRoot = path.relative(PROJECT_ROOT, fullPath);
    if (relativeToRoot.startsWith('..') || path.isAbsolute(relativeToRoot)) {
      return res.status(403).json({
        error: 'Доступ запрещен: файл находится вне корневой папки проекта'
      });
    }

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
      content,
      size: stat.size,
      modified: stat.mtime
    });
  } catch (error) {
    console.error('Ошибка при чтении файла:', error);
    res.status(500).json({
      error: 'Ошибка сервера при чтении файла',
      details: error.message
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

    // Защита от path traversal
    const normalizedPath = path.normalize(filepath);
    if (normalizedPath.startsWith('..') || normalizedPath.includes('/..') || normalizedPath.includes('../')) {
      return res.status(403).json({
        error: 'Доступ запрещен: недопустимый путь к файлу'
      });
    }

    // Используем PROJECT_ROOT
    const fullPath = path.join(PROJECT_ROOT, filepath);

    // Проверяем что файл будет находиться внутри PROJECT_ROOT
    const relativeToRoot = path.relative(PROJECT_ROOT, fullPath);
    if (relativeToRoot.startsWith('..') || path.isAbsolute(relativeToRoot)) {
      return res.status(403).json({
        error: 'Доступ запрещен: файл находится вне корневой папки проекта'
      });
    }

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
      error: 'Ошибка сервера при сохранении файла',
      details: error.message
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

    // Защита от path traversal
    const normalizedPath = path.normalize(filepath);
    if (normalizedPath.startsWith('..') || normalizedPath.includes('/..') || normalizedPath.includes('../')) {
      return res.status(403).json({
        error: 'Доступ запрещен: недопустимый путь к файлу'
      });
    }

    // Используем PROJECT_ROOT
    const fullPath = path.join(PROJECT_ROOT, filepath);

    // Проверяем что файл будет находиться внутри PROJECT_ROOT
    const relativeToRoot = path.relative(PROJECT_ROOT, fullPath);
    if (relativeToRoot.startsWith('..') || path.isAbsolute(relativeToRoot)) {
      return res.status(403).json({
        error: 'Доступ запрещен: файл находится вне корневой папки проекта'
      });
    }

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
      error: 'Ошибка сервера при создании файла',
      details: error.message
    });
  }
};

// Создание новой папки
const createFolder = async (req, res) => {
  try {
    const { folderpath } = req.body;

    if (!folderpath) {
      return res.status(400).json({
        error: 'Укажите путь к папке'
      });
    }

    // Защита от path traversal
    const normalizedPath = path.normalize(folderpath);
    if (normalizedPath.startsWith('..') || normalizedPath.includes('/..') || normalizedPath.includes('../')) {
      return res.status(403).json({
        error: 'Доступ запрещен: недопустимый путь к папке'
      });
    }

    // Используем PROJECT_ROOT
    const fullPath = path.join(PROJECT_ROOT, folderpath);

    // Проверяем что папка будет находиться внутри PROJECT_ROOT
    const relativeToRoot = path.relative(PROJECT_ROOT, fullPath);
    if (relativeToRoot.startsWith('..') || path.isAbsolute(relativeToRoot)) {
      return res.status(403).json({
        error: 'Доступ запрещен: папка находится вне корневой папки проекта'
      });
    }

    console.log('Creating folder:', fullPath);

    // Проверяем, не существует ли уже папка
    try {
      await fs.access(fullPath);
      return res.status(409).json({
        error: 'Папка уже существует'
      });
    } catch (error) {
      // Папка не существует, можно создавать
    }

    // Создаем папку рекурсивно
    await fs.mkdir(fullPath, { recursive: true });
    
    res.json({
      success: true,
      message: 'Папка успешно создана',
      folderpath
    });
  } catch (error) {
    console.error('Ошибка при создании папки:', error);
    res.status(500).json({
      error: 'Ошибка сервера при создании папки',
      details: error.message
    });
  }
};

// Удаление файла или папки
const deleteItem = async (req, res) => {
  try {
    const { itempath, type } = req.body;

    if (!itempath || !type) {
      return res.status(400).json({
        error: 'Укажите путь к элементу и его тип (file/directory)'
      });
    }

    // Защита от path traversal
    const normalizedPath = path.normalize(itempath);
    if (normalizedPath.startsWith('..') || normalizedPath.includes('/..') || normalizedPath.includes('../')) {
      return res.status(403).json({
        error: 'Доступ запрещен: недопустимый путь'
      });
    }

    // Используем PROJECT_ROOT
    const fullPath = path.join(PROJECT_ROOT, itempath);

    // Проверяем что элемент находится внутри PROJECT_ROOT
    const relativeToRoot = path.relative(PROJECT_ROOT, fullPath);
    if (relativeToRoot.startsWith('..') || path.isAbsolute(relativeToRoot) || relativeToRoot === '') {
      return res.status(403).json({
        error: 'Доступ запрещен: нельзя удалить корневую папку проекта'
      });
    }

    console.log('Deleting item:', fullPath, 'Type:', type);

    // Проверяем существование элемента
    try {
      await fs.access(fullPath);
    } catch (error) {
      return res.status(404).json({
        error: 'Элемент не найден'
      });
    }

    if (type === 'file') {
      await fs.unlink(fullPath);
    } else if (type === 'directory') {
      await fs.rm(fullPath, { recursive: true, force: true });
    } else {
      return res.status(400).json({
        error: 'Неверный тип элемента. Допустимые значения: file, directory'
      });
    }
    
    res.json({
      success: true,
      message: 'Элемент успешно удален',
      itempath
    });
  } catch (error) {
    console.error('Ошибка при удалении элемента:', error);
    res.status(500).json({
      error: 'Ошибка сервера при удалении элемента',
      details: error.message
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

// Получение содержимого .htaccess
const getHtaccess = async (req, res) => {
  try {
    const htaccessPath = path.join(PROJECT_ROOT, '.htaccess');
    
    console.log('Reading .htaccess from:', htaccessPath);
    
    try {
      await fs.access(htaccessPath);
    } catch (error) {
      // Если файл не существует, создаем с базовой структурой
      const defaultContent = `RewriteEngine on

# Правило для /admin (без слеша в конце)
RewriteRule ^admin$ admin/index.html [L]

# Правило для /admin/ (со слешем в конце)
RewriteRule ^admin/$ admin/index.html [L]

# Правило для статических файлов в папке admin (css, js, images и т.д.)
RewriteCond %{REQUEST_URI} ^/admin/assets/ [OR]
RewriteCond %{REQUEST_URI} ^/admin/static/ [OR]
RewriteCond %{REQUEST_URI} ^/admin/.+\\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$
RewriteRule ^admin/(.*)$ admin/$1 [L]

# Правило для клиентской маршрутизации React - все остальные запросы в /admin/ на index.html
RewriteCond %{REQUEST_URI} ^/admin/
RewriteRule ^admin/ admin/index.html [L]

# Существующие правила для .html файлов (для основного сайта)
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME}.html -f
RewriteRule ^(.*)$ $1.html [L]

# === УПРАВЛЯЕМЫЕ РЕДИРЕКТЫ ===
# Добавляйте редиректы ниже этой линии
`;
      await fs.writeFile(htaccessPath, defaultContent, 'utf8');
    }

    const content = await fs.readFile(htaccessPath, 'utf8');
    
    res.json({
      success: true,
      content
    });
  } catch (error) {
    console.error('Ошибка при чтении .htaccess:', error);
    res.status(500).json({
      error: 'Ошибка сервера при чтении .htaccess'
    });
  }
};

const addRedirect = async (req, res) => {
  try {
    const { from, to, type = '301' } = req.body;

    if (!from || !to) {
      return res.status(400).json({
        error: 'Укажите адреса from и to'
      });
    }

    const htaccessPath = path.join(PROJECT_ROOT, '.htaccess');
    
    let currentContent = '';
    try {
      currentContent = await fs.readFile(htaccessPath, 'utf8');
    } catch (error) {
      return res.status(404).json({
        error: 'Файл .htaccess не найден'
      });
    }

    // Извлекаем только пути из URL (если переданы полные URL)
    const fromPath = extractPathFromUrl(from).replace(/^\//, ''); // Убираем ведущий слеш
    const toPath = extractPathFromUrl(to);
    
    // Проверяем, является ли редирект внешним (на другой домен)
    const isExternalRedirect = isExternalUrl(to);
    
    let redirectRule;
    if (isExternalRedirect) {
      // Для внешних редиректов используем RewriteRule с R флагом
      redirectRule = `RewriteRule ^${fromPath}$ ${to} [R=${type},L]`;
    } else {
      // Для внутренних редиректов используем RewriteRule без R флага
      redirectRule = `RewriteRule ^${fromPath}$ ${toPath} [L]`;
    }

    const comment = `# Redirect: ${from} -> ${to} (${type})`;
    
    // Находим правильное место для вставки редиректов
    const newContent = insertRedirectIntoHtaccess(currentContent, comment, redirectRule);
    
    await fs.writeFile(htaccessPath, newContent, 'utf8');
    
    res.json({
      success: true,
      message: 'Редирект успешно добавлен',
      rule: redirectRule,
      isExternal: isExternalRedirect
    });
  } catch (error) {
    console.error('Ошибка при добавлении редиректа:', error);
    res.status(500).json({
      error: 'Ошибка сервера при добавлении редиректа'
    });
  }
};

// Получение всех редиректов из .htaccess (ИСПРАВЛЕННАЯ версия)
const getRedirects = async (req, res) => {
  try {
    const htaccessPath = path.join(PROJECT_ROOT, '.htaccess');
    
    let currentContent = '';
    try {
      currentContent = await fs.readFile(htaccessPath, 'utf8');
      console.log('Current .htaccess content:', currentContent);
      
    } catch (error) {
      // Если файл не существует, возвращаем пустой массив
      return res.json({
        success: true,
        redirects: []
      });
    }

    // Парсим редиректы из содержимого
    const redirects = parseRedirectsFromHtaccess(currentContent);
    console.log('Parsed redirects:', redirects);
    
    res.json({
      success: true,
      redirects
    });
  } catch (error) {
    console.error('Ошибка при получении редиректов:', error);
    res.status(500).json({
      error: 'Ошибка сервера при получении редиректов'
    });
  }
};

// Удаление редиректа (обновленная версия)
const deleteRedirect = async (req, res) => {
  try {
    const { index } = req.body;

    if (index === undefined) {
      return res.status(400).json({
        error: 'Укажите индекс редиректа для удаления'
      });
    }

    const htaccessPath = path.join(PROJECT_ROOT, '.htaccess');
    
    let currentContent = '';
    try {
      currentContent = await fs.readFile(htaccessPath, 'utf8');
    } catch (error) {
      return res.status(404).json({
        error: 'Файл .htaccess не найден'
      });
    }

    // Парсим и удаляем редирект по индексу
    const { content: newContent, removedRedirect } = removeRedirectFromHtaccess(currentContent, index);
    
    if (!removedRedirect) {
      return res.status(404).json({
        error: 'Редирект не найден'
      });
    }

    await fs.writeFile(htaccessPath, newContent, 'utf8');
    
    res.json({
      success: true,
      message: 'Редирект успешно удален',
      removedRedirect
    });
  } catch (error) {
    console.error('Ошибка при удалении редиректа:', error);
    res.status(500).json({
      error: 'Ошибка сервера при удалении редиректа'
    });
  }
};

// ИСПРАВЛЕННАЯ функция парсинга редиректов
const parseRedirectsFromHtaccess = (content) => {
  const lines = content.split('\n');
  const redirects = [];
  let currentComment = '';
  let redirectIndex = 0;

  console.log('Parsing .htaccess for redirects...');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (line.startsWith('#') && line.includes('Redirect:')) {
      // Это комментарий к редиректу
      currentComment = line.replace(/^#\s*Redirect:\s*/, '');
      console.log('Found redirect comment:', currentComment);
    } else if (line.startsWith('RewriteRule') && (line.includes('[R=') || line.includes('[L]'))) {
      // Это RewriteRule редирект
      console.log('Found RewriteRule:', line);
      
      // Парсим RewriteRule
      const match = line.match(/RewriteRule\s+\^?(.*?)\$?\s+(.*?)\s+\[(.*?)\]/);
      if (match) {
        const [, from, to, flags] = match;
        
        // Определяем тип редиректа из флагов
        let type = '301';
        if (flags.includes('R=302')) type = '302';
        else if (flags.includes('R=303')) type = '303';
        else if (flags.includes('R=307')) type = '307';
        else if (flags.includes('R=')) {
          const rMatch = flags.match(/R=(\d+)/);
          if (rMatch) type = rMatch[1];
        }
        
        const isExternal = flags.includes('R=');
        
        redirects.push({
          index: redirectIndex++,
          type: type,
          from: '/' + from.replace(/\\/g, ''), // Добавляем слеш для отображения
          to: to,
          comment: currentComment,
          lineNumber: i + 1,
          rawLine: line,
          isExternal: isExternal
        });
        
        console.log('Added redirect:', {
          from: '/' + from,
          to: to,
          type: type,
          isExternal: isExternal
        });
      }
      currentComment = '';
    } else if (line.startsWith('Redirect') && !line.startsWith('RewriteRule')) {
      // Старый формат Redirect (для обратной совместимости)
      console.log('Found old Redirect format:', line);
      const parts = line.split(/\s+/);
      if (parts.length >= 3) {
        redirects.push({
          index: redirectIndex++,
          type: parts[1] || '301',
          from: parts[2],
          to: parts.slice(3).join(' '),
          comment: currentComment,
          lineNumber: i + 1,
          rawLine: line,
          isExternal: true
        });
      }
      currentComment = '';
    } else if (!line.startsWith('#') || line.includes('===')) {
      currentComment = '';
    }
  }

  console.log(`Total redirects found: ${redirects.length}`);
  return redirects;
};

const removeRedirectFromHtaccess = (content, index) => {
  const lines = content.split('\n');
  const redirects = parseRedirectsFromHtaccess(content);
  
  if (index < 0 || index >= redirects.length) {
    return { content, removedRedirect: null };
  }

  const redirectToRemove = redirects[index];
  const newLines = [];

  for (let i = 0; i < lines.length; i++) {
    const shouldSkip = 
      // Пропускаем строку с редиректом
      (i + 1 === redirectToRemove.lineNumber) ||
      // Пропускаем комментарий к редиректу (предыдущая строка)
      (i > 0 && lines[i-1] && lines[i-1].includes(`Redirect: ${redirectToRemove.from}`));
    
    if (!shouldSkip) {
      newLines.push(lines[i]);
    }
  }

  return {
    content: newLines.join('\n'),
    removedRedirect: redirectToRemove
  };
};

// Функция для прямого редактирования .htaccess
const saveHtaccess = async (req, res) => {
  try {
    const { content } = req.body;

    if (content === undefined) {
      return res.status(400).json({
        error: 'Укажите содержимое файла'
      });
    }

    const htaccessPath = path.join(PROJECT_ROOT, '.htaccess');

    console.log('Saving .htaccess to:', htaccessPath);

    await fs.writeFile(htaccessPath, content, 'utf8');
    
    res.json({
      success: true,
      message: '.htaccess успешно сохранен'
    });
  } catch (error) {
    console.error('Ошибка при сохранении .htaccess:', error);
    res.status(500).json({
      error: 'Ошибка сервера при сохранении .htaccess'
    });
  }
};

const extractPathFromUrl = (url) => {
  // Если это уже путь (начинается с /), возвращаем как есть
  if (url.startsWith('/')) {
    return url;
  }
  
  // Если это полный URL, извлекаем путь
  try {
    const urlObj = new URL(url);
    return urlObj.pathname;
  } catch (error) {
    // Если не валидный URL, возвращаем как есть
    return url;
  }
};

const isExternalUrl = (url) => {
  // Проверяем, содержит ли URL протокол (http://, https://)
  return url.includes('://');
};

const insertRedirectIntoHtaccess = (content, comment, redirectRule) => {
  const lines = content.split('\n');
  
  // Ищем место после маркера управляемых редиректов
  let managedRedirectsIndex = -1;
  
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('=== УПРАВЛЯЕМЫЕ РЕДИРЕКТЫ ===')) {
      managedRedirectsIndex = i;
      break;
    }
  }
  
  let insertPosition;
  if (managedRedirectsIndex !== -1) {
    // Находим первую пустую строку после маркера для вставки
    insertPosition = managedRedirectsIndex + 1;
    while (insertPosition < lines.length && lines[insertPosition].trim() !== '') {
      insertPosition++;
    }
  } else {
    // Если маркер не найден, добавляем в конец
    insertPosition = lines.length;
  }
  
  // Вставляем новый редирект
  lines.splice(insertPosition, 0, '');
  lines.splice(insertPosition, 0, redirectRule);
  lines.splice(insertPosition, 0, comment);
  
  return lines.join('\n');
};

// Функция для поиска файлов page.tsx или layout.tsx в папке
const findPageFiles = async (folderPath) => {
  const pageFiles = [];
  
  try {
    const items = await fs.readdir(folderPath);
    
    for (const item of items) {
      const itemPath = path.join(folderPath, item);
      const stat = await fs.stat(itemPath);
      
      if (stat.isDirectory()) {
        // Рекурсивно ищем в подпапках
        const subPageFiles = await findPageFiles(itemPath);
        pageFiles.push(...subPageFiles);
      } else if (item === 'page.tsx' || item === 'page.jsx' || item === 'layout.tsx' || item === 'layout.jsx') {
        pageFiles.push(itemPath);
      }
    }
  } catch (error) {
    console.error('Ошибка при поиске page файлов:', error);
  }
  
  return pageFiles;
};

// Функция для парсинга metadata из файла
const parseMetadataFromFile = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    
    // Базовые SEO данные
    let seoData = {
      title: '',
      description: '',
      keywords: '',
      openGraph: {
        title: '',
        description: '',
        images: [],
        type: 'website'
      },
      twitter: {
        card: 'summary_large_image',
        title: '',
        description: '',
        images: []
      }
    };

    // Парсим export const metadata или generateMetadata
    const metadataRegex = /export\s+(const\s+metadata|async\s+function\s+generateMetadata)\s*[=:]\s*{([^}]*)}/gs;
    const matches = [...content.matchAll(metadataRegex)];
    
    for (const match of matches) {
      const metadataContent = match[2];
      
      // Парсим title
      const titleMatch = metadataContent.match(/title\s*:\s*['"`]([^'"`]*)['"`]/);
      if (titleMatch) {
        seoData.title = titleMatch[1];
      }
      
      // Парсим description
      const descMatch = metadataContent.match(/description\s*:\s*['"`]([^'"`]*)['"`]/);
      if (descMatch) {
        seoData.description = descMatch[1];
      }
      
      // Парсим keywords
      const keywordsMatch = metadataContent.match(/keywords\s*:\s*['"`]([^'"`]*)['"`]/);
      if (keywordsMatch) {
        seoData.keywords = keywordsMatch[1];
      }
      
      // Парсим openGraph
      const openGraphMatch = metadataContent.match(/openGraph\s*:\s*{([^}]*)}/);
      if (openGraphMatch) {
        const ogContent = openGraphMatch[1];
        
        const ogTitleMatch = ogContent.match(/title\s*:\s*['"`]([^'"`]*)['"`]/);
        if (ogTitleMatch) {
          seoData.openGraph.title = ogTitleMatch[1];
        }
        
        const ogDescMatch = ogContent.match(/description\s*:\s*['"`]([^'"`]*)['"`]/);
        if (ogDescMatch) {
          seoData.openGraph.description = ogDescMatch[1];
        }
        
        const ogTypeMatch = ogContent.match(/type\s*:\s*['"`]([^'"`]*)['"`]/);
        if (ogTypeMatch) {
          seoData.openGraph.type = ogTypeMatch[1];
        }
        
        // Парсим images (может быть массивом или строкой)
        const imagesMatch = ogContent.match(/images\s*:\s*(\[[^\]]*\]|['"`][^'"`]*['"`])/);
        if (imagesMatch) {
          try {
            if (imagesMatch[1].startsWith('[')) {
              // Это массив
              const imagesArray = JSON.parse(imagesMatch[1].replace(/'/g, '"'));
              seoData.openGraph.images = Array.isArray(imagesArray) ? imagesArray : [imagesArray];
            } else {
              // Это строка
              const imageUrl = imagesMatch[1].replace(/['"`]/g, '');
              seoData.openGraph.images = [imageUrl];
            }
          } catch (e) {
            console.error('Ошибка парсинга images:', e);
          }
        }
      }
      
      // Парсим twitter
      const twitterMatch = metadataContent.match(/twitter\s*:\s*{([^}]*)}/);
      if (twitterMatch) {
        const twitterContent = twitterMatch[1];
        
        const twitterCardMatch = twitterContent.match(/card\s*:\s*['"`]([^'"`]*)['"`]/);
        if (twitterCardMatch) {
          seoData.twitter.card = twitterCardMatch[1];
        }
        
        const twitterTitleMatch = twitterContent.match(/title\s*:\s*['"`]([^'"`]*)['"`]/);
        if (twitterTitleMatch) {
          seoData.twitter.title = twitterTitleMatch[1];
        }
        
        const twitterDescMatch = twitterContent.match(/description\s*:\s*['"`]([^'"`]*)['"`]/);
        if (twitterDescMatch) {
          seoData.twitter.description = twitterDescMatch[1];
        }
        
        // Парсим images для twitter
        const twitterImagesMatch = twitterContent.match(/images\s*:\s*(\[[^\]]*\]|['"`][^'"`]*['"`])/);
        if (twitterImagesMatch) {
          try {
            if (twitterImagesMatch[1].startsWith('[')) {
              const imagesArray = JSON.parse(twitterImagesMatch[1].replace(/'/g, '"'));
              seoData.twitter.images = Array.isArray(imagesArray) ? imagesArray : [imagesArray];
            } else {
              const imageUrl = twitterImagesMatch[1].replace(/['"`]/g, '');
              seoData.twitter.images = [imageUrl];
            }
          } catch (e) {
            console.error('Ошибка парсинга twitter images:', e);
          }
        }
      }
    }
    
    return seoData;
  } catch (error) {
    console.error('Ошибка при парсинге файла:', filePath, error);
    return null;
  }
};

const getSeoInfo = async (req, res) => {
  try {
    const { folder } = req.query;

    if (!folder) {
      return res.status(400).json({
        error: 'Укажите путь к папке'
      });
    }

    // Защита от path traversal
    const normalizedPath = path.normalize(folder);
    if (normalizedPath.startsWith('..') || normalizedPath.includes('/..') || normalizedPath.includes('../')) {
      return res.status(403).json({
        error: 'Доступ запрещен: недопустимый путь'
      });
    }

    const folderPath = path.join(PROJECT_ROOT, normalizedPath);
    
    // Проверяем что путь находится внутри PROJECT_ROOT
    const relativeToRoot = path.relative(PROJECT_ROOT, folderPath);
    if (relativeToRoot.startsWith('..') || path.isAbsolute(relativeToRoot)) {
      return res.status(403).json({
        error: 'Доступ запрещен: путь находится вне корневой папки проекта'
      });
    }

    // Проверяем существование папки
    try {
      await fs.access(folderPath);
    } catch (error) {
      return res.status(404).json({
        error: 'Папка не найдена'
      });
    }

    // Проверяем что это папка
    const stat = await fs.stat(folderPath);
    if (!stat.isDirectory()) {
      return res.status(400).json({
        error: 'Указанный путь не является папкой'
      });
    }

    // Ищем все page.tsx и layout.tsx файлы в папке
    const pageFiles = await findPageFiles(folderPath);
    
    if (pageFiles.length === 0) {
      return res.json({
        success: true,
        folder: normalizedPath,
        seo: {
          title: '',
          description: '',
          keywords: '',
          openGraph: {
            title: '',
            description: '',
            images: [],
            type: 'website'
          },
          twitter: {
            card: 'summary_large_image',
            title: '',
            description: '',
            images: []
          }
        },
        pageFiles: [],
        message: 'Файлы page.tsx или layout.tsx не найдены'
      });
    }

    // Парсим metadata из всех найденных файлов
    const allSeoData = [];
    for (const filePath of pageFiles) {
      const seoData = await parseMetadataFromFile(filePath);
      if (seoData) {
        allSeoData.push({
          file: path.relative(PROJECT_ROOT, filePath),
          seo: seoData
        });
      }
    }

    // Объединяем данные (приоритет у page.tsx над layout.tsx)
    let mergedSeo = {
      title: '',
      description: '',
      keywords: '',
      openGraph: {
        title: '',
        description: '',
        images: [],
        type: 'website'
      },
      twitter: {
        card: 'summary_large_image',
        title: '',
        description: '',
        images: []
      }
    };

    // Сортируем: page.tsx имеет приоритет над layout.tsx
    const sortedFiles = allSeoData.sort((a, b) => {
      const aIsPage = a.file.includes('page.tsx') || a.file.includes('page.jsx');
      const bIsPage = b.file.includes('page.tsx') || b.file.includes('page.jsx');
      return bIsPage - aIsPage;
    });

    // Мерджим данные
    for (const { seo } of sortedFiles) {
      if (seo.title) mergedSeo.title = seo.title;
      if (seo.description) mergedSeo.description = seo.description;
      if (seo.keywords) mergedSeo.keywords = seo.keywords;
      
      if (seo.openGraph.title) mergedSeo.openGraph.title = seo.openGraph.title;
      if (seo.openGraph.description) mergedSeo.openGraph.description = seo.openGraph.description;
      if (seo.openGraph.type) mergedSeo.openGraph.type = seo.openGraph.type;
      if (seo.openGraph.images.length > 0) mergedSeo.openGraph.images = seo.openGraph.images;
      
      if (seo.twitter.title) mergedSeo.twitter.title = seo.twitter.title;
      if (seo.twitter.description) mergedSeo.twitter.description = seo.twitter.description;
      if (seo.twitter.card) mergedSeo.twitter.card = seo.twitter.card;
      if (seo.twitter.images.length > 0) mergedSeo.twitter.images = seo.twitter.images;
    }

    res.json({
      success: true,
      folder: normalizedPath,
      seo: mergedSeo,
      pageFiles: allSeoData.map(f => f.file),
      foundFiles: pageFiles.map(p => path.relative(PROJECT_ROOT, p))
    });

  } catch (error) {
    console.error('Ошибка при получении SEO информации:', error);
    res.status(500).json({
      error: 'Ошибка сервера при получении SEO информации',
      details: error.message
    });
  }
};

// Сохранение SEO информации в page.tsx
const saveSeoInfo = async (req, res) => {
  try {
    const { folder, seo } = req.body;

    if (!folder || !seo) {
      return res.status(400).json({
        error: 'Укажите путь к папке и SEO данные'
      });
    }

    // Защита от path traversal
    const normalizedPath = path.normalize(folder);
    if (normalizedPath.startsWith('..') || normalizedPath.includes('/..') || normalizedPath.includes('../')) {
      return res.status(403).json({
        error: 'Доступ запрещен: недопустимый путь'
      });
    }

    const folderPath = path.join(PROJECT_ROOT, normalizedPath);
    
    // Проверяем что путь находится внутри PROJECT_ROOT
    const relativeToRoot = path.relative(PROJECT_ROOT, folderPath);
    if (relativeToRoot.startsWith('..') || path.isAbsolute(relativeToRoot)) {
      return res.status(403).json({
        error: 'Доступ запрещен: путь находится вне корневой папки проекта'
      });
    }

    // Проверяем существование папки
    try {
      await fs.access(folderPath);
    } catch (error) {
      return res.status(404).json({
        error: 'Папка не найдена'
      });
    }

    // Проверяем что это папка
    const stat = await fs.stat(folderPath);
    if (!stat.isDirectory()) {
      return res.status(400).json({
        error: 'Указанный путь не является папкой'
      });
    }

    // Ищем page.tsx файл (приоритет) или создаем новый
    let pageFilePath = path.join(folderPath, 'page.tsx');
    let fileExists = true;

    try {
      await fs.access(pageFilePath);
    } catch (error) {
      // Пробуем page.jsx
      pageFilePath = path.join(folderPath, 'page.jsx');
      try {
        await fs.access(pageFilePath);
      } catch (error2) {
        // Создаем новый page.tsx
        pageFilePath = path.join(folderPath, 'page.tsx');
        fileExists = false;
      }
    }

    let fileContent = '';
    
    if (fileExists) {
      fileContent = await fs.readFile(pageFilePath, 'utf8');
    } else {
      // Базовый шаблон для нового page.tsx
      fileContent = `import React from 'react';

export const metadata = {
  title: '${seo.title || ''}',
  description: '${seo.description || ''}',
  ${seo.keywords ? `keywords: '${seo.keywords}',` : ''}
  openGraph: {
    title: '${seo.openGraph?.title || seo.title || ''}',
    description: '${seo.openGraph?.description || seo.description || ''}',
    ${seo.openGraph?.images?.[0] ? `images: ['${seo.openGraph.images[0]}'],` : ''}
    type: '${seo.openGraph?.type || 'website'}'
  },
  twitter: {
    card: '${seo.twitter?.card || 'summary_large_image'}',
    title: '${seo.twitter?.title || seo.title || ''}',
    description: '${seo.twitter?.description || seo.description || ''}',
    ${seo.twitter?.images?.[0] ? `images: ['${seo.twitter.images[0]}']` : ''}
  }
};

export default function Page() {
  return (
    <div>
      <h1>${seo.title || 'Новая страница'}</h1>
      <p>${seo.description || 'Описание страницы'}</p>
    </div>
  );
}`;
    }

    // Если файл существует, обновляем metadata
    if (fileExists) {
      // Упрощенная замена metadata (для сложных случаев лучше использовать AST парсер)
      const metadataRegex = /export\s+(const\s+metadata|async\s+function\s+generateMetadata)\s*[=:]\s*{([^}]*)}/gs;
      
      if (metadataRegex.test(fileContent)) {
        // Заменяем существующий metadata
        const newMetadata = `export const metadata = {
  title: '${(seo.title || '').replace(/'/g, "\\'")}',
  description: '${(seo.description || '').replace(/'/g, "\\'")}',
  ${seo.keywords ? `keywords: '${seo.keywords.replace(/'/g, "\\'")}',` : ''}
  openGraph: {
    title: '${(seo.openGraph?.title || seo.title || '').replace(/'/g, "\\'")}',
    description: '${(seo.openGraph?.description || seo.description || '').replace(/'/g, "\\'")}',
    ${seo.openGraph?.images?.[0] ? `images: ['${seo.openGraph.images[0].replace(/'/g, "\\'")}'],` : ''}
    type: '${seo.openGraph?.type || 'website'}'
  },
  twitter: {
    card: '${seo.twitter?.card || 'summary_large_image'}',
    title: '${(seo.twitter?.title || seo.title || '').replace(/'/g, "\\'")}',
    description: '${(seo.twitter?.description || seo.description || '').replace(/'/g, "\\'")}',
    ${seo.twitter?.images?.[0] ? `images: ['${seo.twitter.images[0].replace(/'/g, "\\'")}']` : ''}
  }
}`;

        fileContent = fileContent.replace(metadataRegex, newMetadata);
      } else {
        // Добавляем metadata в начало файла
        const newMetadata = `export const metadata = {
  title: '${(seo.title || '').replace(/'/g, "\\'")}',
  description: '${(seo.description || '').replace(/'/g, "\\'")}',
  ${seo.keywords ? `keywords: '${seo.keywords.replace(/'/g, "\\'")}',` : ''}
  openGraph: {
    title: '${(seo.openGraph?.title || seo.title || '').replace(/'/g, "\\'")}',
    description: '${(seo.openGraph?.description || seo.description || '').replace(/'/g, "\\'")}',
    ${seo.openGraph?.images?.[0] ? `images: ['${seo.openGraph.images[0].replace(/'/g, "\\'")}'],` : ''}
    type: '${seo.openGraph?.type || 'website'}'
  },
  twitter: {
    card: '${seo.twitter?.card || 'summary_large_image'}',
    title: '${(seo.twitter?.title || seo.title || '').replace(/'/g, "\\'")}',
    description: '${(seo.twitter?.description || seo.description || '').replace(/'/g, "\\'")}',
    ${seo.twitter?.images?.[0] ? `images: ['${seo.twitter.images[0].replace(/'/g, "\\'")}']` : ''}
  }
};

`;
        fileContent = newMetadata + fileContent;
      }
    }

    await fs.writeFile(pageFilePath, fileContent, 'utf8');
    
    res.json({
      success: true,
      message: 'SEO информация успешно сохранена',
      folder: normalizedPath,
      file: pageFilePath,
      seo: seo
    });

  } catch (error) {
    console.error('Ошибка при сохранении SEO информации:', error);
    res.status(500).json({
      error: 'Ошибка сервера при сохранении SEO информации',
      details: error.message
    });
  }
};

// Удаление SEO информации
const deleteSeoInfo = async (req, res) => {
  try {
    const { folder } = req.body;

    if (!folder) {
      return res.status(400).json({
        error: 'Укажите путь к папке'
      });
    }

    // Для Next.js удаление SEO означает очистку metadata
    return res.json({
      success: true,
      message: 'Для Next.js рекомендуется редактировать metadata напрямую в page.tsx'
    });

  } catch (error) {
    console.error('Ошибка при удалении SEO информации:', error);
    res.status(500).json({
      error: 'Ошибка сервера при удалении SEO информации',
      details: error.message
    });
  }
};

// ЕДИНСТВЕННЫЙ корректный экспорт в конце файла:
module.exports = {
  getFiles,
  getFileContent,
  saveFile,
  createFile,
  createFolder,
  deleteItem,
  buildProject,
  startServer,
  buildAndStart,
  getBuildStatus,
  installDependencies,
  installPackage,
  uninstallPackage,
  healthCheck,
  getHtaccess,
  saveHtaccess,
  addRedirect,
  getRedirects,
  deleteRedirect,
  getSeoInfo,
  saveSeoInfo,
  deleteSeoInfo
};