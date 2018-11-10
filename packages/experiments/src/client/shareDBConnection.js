import ShareDB from 'sharedb/lib/client';
import WebSocket from 'reconnecting-websocket';

const webSocketProtocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
const webSocketUrl = webSocketProtocol + '//' + window.location.host;
const socket = new WebSocket(webSocketUrl, [], {

  // This makes it connect immediately.
  // Should not be required in future versions of reconnecting-websocket.
  // https://github.com/pladaria/reconnecting-websocket/issues/91
  minReshareDBConnectionDelay: 1
});

export const shareDBConnection = new ShareDB.Connection(socket);
