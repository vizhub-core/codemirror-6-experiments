import { htmlRoot } from '../html';

export const html = htmlRoot({
  title: 'Realtime Pad Demo',
  // TODO use React instead of this
  body: '<div id="editor" style="height: 100%; overflow: auto"></div>'
});
