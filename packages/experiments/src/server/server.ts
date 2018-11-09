import * as express  from 'express';
import * as http from 'http';

import * as ShareDB from 'sharedb';
import * as WebSocket from 'ws';
import * as WebSocketJSONStream from '@teamwork/websocket-json-stream';

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

const port: number = 3000;
server.listen(port);
console.log(`Listening at http://localhost:${port}/`);
