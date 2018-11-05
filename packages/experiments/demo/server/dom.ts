import * as jsdom from 'jsdom';

export const createDom = html => {
  const dom = new jsdom.JSDOM(html);

  // Shim needed for CodeMirror to run in Node.
  dom.window.document.getSelection = () => ({}) as Selection;

  return dom;
};
