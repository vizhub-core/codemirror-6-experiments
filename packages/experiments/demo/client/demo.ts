import * as ShareDB from 'sharedb/lib/client';
import * as WebSocket from 'reconnecting-websocket';
import { createView } from '../demoView';
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

  const emitOps = ops => console.log(ops);
  const view = createView({ emitOps });
  const editorDiv = document.querySelector('#editor');
  editorDiv.innerHTML = '';
  editorDiv.appendChild(view.dom)
});
