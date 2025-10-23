const fs = require('fs').promises;
const path = require('path');
const { exec } = require('child_process');

// Укажите абсолютный путь к папке проекта
// ДЛЯ ПРОДА ИСПОЛЬЗОВАТЬ ЭТУ СТРОЧКУ, НО ВМЕСТО testend.site правильный адрес сайта -
//  const PROJECT_ROOT = "/var/www/vhosts/vh172.by3020.ihb.by/testend.site/project/project"; 
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
  healthCheck,
  getHtaccess,
  saveHtaccess,
  addRedirect,
  getRedirects,
  deleteRedirect
};