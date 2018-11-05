import * as ShareDB from 'sharedb/lib/client';
import WebSocket from 'reconnecting-websocket';
import './process';
import { createView } from '../demoView';
import { hydrateEditor } from '../hydrateEditor';
import { opsToTransaction } from 'codemirror-ot';

import '../css/noncritical.css';
import 'codemirror-theme-ubuntu/codemirror-ubuntu-theme.css';

const webSocketProtocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
const webSocketUrl = wsProtocol + '//' + window.location.host;
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

  let applyingOpTransaction = false;
  const path = [];
  const emitOps = ops => {
    if (!applyingOpTransaction) {
      doc.submitOp(ops, err => {
        if (err) {
          throw err;
        }
      });
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
