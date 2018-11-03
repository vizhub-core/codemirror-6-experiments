import * as ShareDB from 'sharedb/lib/client';
import WebSocket from 'reconnecting-websocket';
import { createView } from '../demoView';
import { opsToTransaction } from 'codemirror-ot';
import 'codemirror-6/codemirror.next/view/style/editorview.css';
import 'codemirror-theme-ubuntu/codemirror-ubuntu-theme.css';
import './styles.css';

const socket = new WebSocket('ws://' + window.location.host);
const connection = new ShareDB.Connection(socket);

const doc = connection.get('examples', 'textarea');

doc.subscribe(err => {
  if (err) {
    throw err;
  }

  let applyingOpTransaction = false;
  const path = [];
  const emitOps = ops => {
    console.log(ops);
    console.log({applyingOpTransaction});
    if (!applyingOpTransaction) {
      doc.submitOp(ops);
    }
  }

  const view = createView({ path, emitOps });

  const editorDiv = document.querySelector('#editor');
  editorDiv.innerHTML = '';
  editorDiv.appendChild(view.dom)

  doc.on('op', (op, originatedLocally) => {
    if (!originatedLocally) {
      const transaction = opsToTransaction(path, view.state, op);
      applyingOpTransaction = true;
      view.dispatch(transaction);
      applyingOpTransaction = false;
    }
  });
});
