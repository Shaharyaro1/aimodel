import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { AppServerConfig } from './app/app.config.server';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');
const indexHtml = join(serverDistFolder, 'index.server.html');

const app = express();
const commonEngine = new CommonEngine();

app.set('view engine', 'html');
app.set('views', browserDistFolder);

// Serve static files
app.get(
  '*.*',
  express.static(browserDistFolder, {
    maxAge: '1y',
    redirect: false,
  })
);

// Handle all other routes
app.get('*', (req, res, next) => {
  const { protocol, originalUrl, baseUrl, headers } = req;

  commonEngine
    .render({
      bootstrap: AppServerConfig,
      documentFilePath: indexHtml,
      url: `${protocol}://${headers.host}${originalUrl}`,
      publicPath: browserDistFolder,
      providers: [{ provide: 'SERVER_URL', useValue: `${protocol}://${headers.host}` }],
    })
    .then((html) => res.send(html))
    .catch((err) => next(err));
});

export { app };
