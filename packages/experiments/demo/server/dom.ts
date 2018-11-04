import * as jsdom from 'jsdom';
import { html } from './html';

export const createDom = () => {
  const dom = new jsdom.JSDOM(html);

  // Shim needed for CodeMirror to run in Node.
  dom.window.document.getSelection = () => ({}) as Selection;

  return dom;
};
