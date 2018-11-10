import ShareDB from 'sharedb/lib/client';
import WebSocket from 'reconnecting-websocket';
import { opsToTransaction } from 'codemirror-ot';

import { createView } from './demoView';
import { hydrateEditor } from './hydrateEditor';

export const client = params => {
  const { id } = params;

  const webSocketProtocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
  const webSocketUrl = webSocketProtocol + '//' + window.location.host;
  const socket = new WebSocket(webSocketUrl, [], {

    // This makes it connect immediately.
    // Should not be required in future versions of reconnecting-websocket.
    // https://github.com/pladaria/reconnecting-websocket/issues/91
    minReconnectionDelay: 1
  });

  const connection = new ShareDB.Connection(socket);

  const doc = connection.get('examples', id);
  doc.ingestSnapshot(window.serverRenderedData.snapshot, err => {
    if (err) {
      console.log(err);
    }

    const path = [];

    let opsQueue = [];

    const opBatchInterval = 1000;
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
};
