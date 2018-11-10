import ShareDB from 'sharedb/lib/client';
import WebSocket from 'reconnecting-websocket';
import { opsToTransaction } from 'codemirror-ot';

import { createView } from './demoView';
import { hydrateEditor } from './hydrateEditor';
import { CodeMirrorShareDBBinding } from '../../client/codeMirrorShareDBBinding';
import { errorLog } from '../../client/errorLog';

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


  const shareDBDoc = connection.get('examples', id);
  shareDBDoc.ingestSnapshot(window.serverRenderedData.snapshot, errorLog(() => {
    shareDBDoc.subscribe(errorLog);
    const view = CodeMirrorShareDBBinding({ shareDBDoc, createView });
    hydrateEditor(view);
  }));
};
