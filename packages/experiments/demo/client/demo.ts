import * as ShareDB from 'sharedb/lib/client';
import WebSocket from 'reconnecting-websocket';
import { createView } from '../demoView';
import { hydrateEditor } from './hydrateEditor';
import { opsToTransaction } from 'codemirror-ot';

import '../css/noncritical.css';
import 'codemirror-theme-ubuntu/codemirror-ubuntu-theme.css';

const socket = new WebSocket('ws://' + window.location.host, [], {

  // This makes it connect immediately.
  // Should not be required in future versions of reconnecting-websocket.
  // https://github.com/pladaria/reconnecting-websocket/issues/91
  minReconnectionDelay: 1
});

const connection = new ShareDB.Connection(socket);

const doc = connection.get('examples', 'textarea');

// const before = Date.now();

doc.subscribe(err => {
  if (err) {
    throw err;
  }

  // const after = Date.now();
  // console.log('subscribe took ' + (after - before) / 1000 + 'seconds');

  let applyingOpTransaction = false;
  const path = [];
  const emitOps = ops => {
    if (!applyingOpTransaction) {
      doc.submitOp(ops);
    }
  }

  const view = createView({ path, emitOps });

  hydrateEditor(view);

  doc.on('op', (op, originatedLocally) => {
    if (!originatedLocally) {
      const transaction = opsToTransaction(path, view.state, op);
      applyingOpTransaction = true;
      view.dispatch(transaction);
      applyingOpTransaction = false;
    }
  });
});
