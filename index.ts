import express from 'express';
import { ParseServer } from 'parse-server';
import path from 'path';
import http from 'http';
import cors from 'cors';
import { config } from './config.js';

const __dirname = path.resolve();
const app = express();

// Static
app.use('/public', express.static(path.join(__dirname, '/public')));

// ========== CORS (добавляем до монтирования Parse) ==========
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || '*'; 
// можно перечислить массив допустимых origins, если нужно
const corsOptions = {
  origin: (origin: string | undefined, callback: Function) => {
    if (!origin) return callback(null, true); // allow non-browser or curl requests
    if (FRONTEND_ORIGIN === '*' || origin === FRONTEND_ORIGIN) return callback(null, true);
    // если нужно разрешить несколько источников, проверяй по массиву здесь
    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Origin','X-Requested-With','Content-Type','Accept','X-Parse-Application-Id','X-Parse-REST-API-Key','X-Parse-Session-Token'],
  credentials: false // true, если используешь cookie/credentials (тогда нельзя использовать '*')
};

app.use(cors(corsOptions));
// Поддержка preflight для всех маршрутов
app.options('*', cors(corsOptions));
// ============================================================

// Parse mounting (как у тебя было)
const mountPath = process.env.PARSE_MOUNT || '/parse';
const server = new ParseServer(config);
await server.start();
app.use(mountPath, server.app);

// Остальные роуты...
app.get('/', function (req, res) {
  res.status(200).send('I dream of being a website...');
});
app.get('/test', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/test.html'));
});

const port = process.env.PORT || 1337;
const httpServer = http.createServer(app);
httpServer.listen(port, function () {
  console.log('parse-server-example running on port ' + port + '.');
});
await ParseServer.createLiveQueryServer(httpServer);
