import * as express  from 'express';
import * as http from 'http';

import * as ShareDB from 'sharedb';
import * as WebSocket from 'ws';
import * as WebSocketJSONStream from '@teamwork/websocket-json-stream';

import { router } from './router';

const backend = new ShareDB();
createDoc(startServer);

function createDoc(callback) {
  const connection = backend.connect();
  const doc = connection.get('examples', 'textarea');
  doc.fetch(err => {
    if (err) {
      throw err;
    }
    if (doc.type === null) {
      doc.create('Test content', callback);
      return;
    }
    callback();
  });
}

function startServer() {
  const app = express();
  app.use('/build', express.static('demo/build'));
  app.use('/', router);

  const server = http.createServer(app);

  const wss = new WebSocket.Server({ server });
  wss.on('connection', (ws, req) => {
    const stream = new WebSocketJSONStream(ws);
    backend.listen(stream);
  });

  const port: number = 3000;
  server.listen(port);
  console.log(`Listening at http://localhost:${port}/`);
}
