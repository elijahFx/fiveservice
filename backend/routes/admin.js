const express = require('express');
const router = express.Router();

// Импорт контроллеров
const {
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
  deleteRedirect,
  getSeoInfo,
  saveSeoInfo,
  deleteSeoInfo
} = require('../controllers/adminControllers');

// Маршруты для работы с файлами
router.get('/files', getFiles);
router.get('/file/content', getFileContent);
router.post('/file/save', saveFile);
router.post('/file/create', createFile);

// Маршруты для сборки
router.post('/build', buildProject);
router.post('/start', startServer);
router.post('/build-and-start', buildAndStart);
router.get('/build/status', getBuildStatus);

// Маршруты для зависимостей
router.post('/dependencies/install', installDependencies);
router.post('/dependencies/install-package', installPackage);
router.post('/dependencies/uninstall-package', uninstallPackage);

// Маршруты для .htaccess и редиректов
router.get('/htaccess', getHtaccess);
router.post('/htaccess/save', saveHtaccess);
router.post('/redirects/add', addRedirect);
router.get('/redirects', getRedirects);
router.post('/redirects/delete', deleteRedirect);

// Маршруты для SEO - исправленные пути
router.get('/seo/info', getSeoInfo);
router.post('/seo/save', saveSeoInfo);
router.post('/seo/delete', deleteSeoInfo);

// Health check
router.get('/health', healthCheck);

module.exports = router;