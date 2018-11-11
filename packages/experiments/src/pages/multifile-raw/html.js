import { htmlRoot } from '../html';

export const html = htmlRoot({
  title: 'MultiFile Demo',
  // TODO use React instead of this
  body: `
    <div style="display: flex; flex-direction: column; height: 100%">
      <div id="files-list"></div>
      <div id="editor" style="flex-grow: 1"></div>
    </div>
  `
});
