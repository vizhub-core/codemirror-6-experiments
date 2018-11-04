import * as express  from 'express';
import { Application, Router, Request, Response } from 'express';
import * as jsdom from 'jsdom';
import * as http from 'http';
import { createView } from '../demoView';

import * as ShareDB from 'sharedb';
import * as WebSocket from 'ws';
import * as WebSocketJSONStream from '@teamwork/websocket-json-stream';

import { html } from './html';

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
      doc.create('', callback);
      return;
    }
    callback();
  });
}

const { JSDOM } = jsdom;

const dom = new JSDOM(html);
const document = dom.window.document;
document.getSelection = () => ({}) as Selection;
const globalAny:any = global;
globalAny.document = document;
globalAny.navigator = {};
globalAny.window = {
  addEventListener: () => {}
};
globalAny.MutationObserver = () => ({
  observe: () => {},
  takeRecords: () => {},
  disconnect: () => {}
});
globalAny.requestAnimationFrame = () => {};
const view = createView({});
document.querySelector("#editor").appendChild(view.dom);

function startServer() {

  const router: Router = Router();

  router.get('/', (req: Request, res: Response) => {
    const html = dom.serialize();
    res.send(html);
  });

  const app: Application = express();
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
