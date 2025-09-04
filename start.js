const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
// Для Plesk лучше использовать порт из переменной окружения
const basePort = parseInt(process.env.PORT) || 3000;
const maxAttempts = 10;

// Prepare the Next.js app
const app = next({ dev, hostname });
const handle = app.getRequestHandler();

/**
 * Пытается запустить сервер на указанном порту
 */
function tryStartServer(port, attempt = 1) {
  const server = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      
      // Добавляем заголовки для корректной работы за прокси
      res.setHeader('X-Powered-By', 'Next.js');
      
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  });

  server.once('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      if (attempt >= maxAttempts) {
        console.error(`❌ All ${maxAttempts} ports are busy. Could not start server.`);
        process.exit(1);
      }
      
      const nextPort = basePort + attempt;
      console.log(`⚠️  Port ${port} is busy, trying port ${nextPort}...`);
      
      server.close();
      tryStartServer(nextPort, attempt + 1);
    } else {
      console.error('Server error:', err);
      process.exit(1);
    }
  });

  server.listen(port, 'localhost', () => {
    console.log(`✅ Next.js server started on http://localhost:${port}`);
    console.log('📋 Nginx will proxy requests to this port');
  });

  return server;
}

app.prepare().then(() => {
  console.log(`🔍 Preparing Next.js application...`);
  tryStartServer(basePort);
}).catch((err) => {
  console.error('❌ Next.js preparation failed:', err);
  process.exit(1);
});