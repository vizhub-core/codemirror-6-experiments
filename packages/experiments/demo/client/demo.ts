import * as ShareDB from 'sharedb/lib/client';
import WebSocket from 'reconnecting-websocket';
import { opsToTransaction } from 'codemirror-ot';

import './process';
import { createView } from '../isomorphic/demoView';
import { hydrateEditor } from '../isomorphic/hydrateEditor';

import '../css/noncritical.css';
import 'codemirror-theme-ubuntu/codemirror-ubuntu-theme.css';

const webSocketProtocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
const webSocketUrl = webSocketProtocol + '//' + window.location.host;
const socket = new WebSocket(webSocketUrl, [], {

  // This makes it connect immediately.
  // Should not be required in future versions of reconnecting-websocket.
  // https://github.com/pladaria/reconnecting-websocket/issues/91
  minReconnectionDelay: 1
});

const connection = new ShareDB.Connection(socket);

const doc = connection.get('examples', 'textarea');
doc.ingestSnapshot(window.serverRenderedData.snapshot, err => {
  if (err) {
    console.log(err);
  }

  const opBatchInterval = 1000;

  let opsQueue = [];

  setInterval(() => {
    if(opsQueue.length) {
      doc.submitOp(opsQueue, err => {
        if (err) {
          throw err;
        }
      });
      opsQueue = [];
    }
  }, opBatchInterval);

  let applyingOpTransaction = false;
  const path = [];
  const emitOps = ops => {
    if (!applyingOpTransaction) {
      opsQueue = opsQueue.concat(ops);
    }
  }
  const text = doc.data;
  const view = createView({ path, emitOps, text });
  hydrateEditor(view);

  doc.on('op', (op, originatedLocally) => {
    if (!originatedLocally) {
      applyingOpTransaction = true;
      view.dispatch(opsToTransaction(path, view.state, op));
      applyingOpTransaction = false;
    }
  });

  doc.subscribe(err => {
    if (err) {
      throw err;
    }
  });
});
