import express from 'express';
import http from 'http';

import ShareDB from 'sharedb';
import WebSocket from 'ws';
import WebSocketJSONStream from '@teamwork/websocket-json-stream';

import './codemirrorGlobalShim';

import { pagesServer } from '../pages/server';

const backend = new ShareDB({
  // The following options serve only to squelch errors.
  // It should be possible to remove these when ShareDB 1.0 is released.
  disableDocAction: true,
  disableSpaceDelimitedActions: true
});
const connection = backend.connect();

const app = express();
app.use('/', pagesServer(connection));
app.use('/build', express.static('build'));

const server = http.createServer(app);

const webSocketServer = new WebSocket.Server({ server });
webSocketServer.on('connection', webSocket => {
  backend.listen(new WebSocketJSONStream(webSocket));
});

const port = 3000;
server.listen(port);
console.log(`Listening at http://localhost:${port}/`);
