import * as jsdom from 'jsdom';

const { JSDOM } = jsdom;

const dom = new JSDOM(html);
const document = dom.window.document;
document.getSelection = () => ({}) as Selection;
const globalAny:any = global;
globalAny.document = document;
globalAny.navigator = {};
globalAny.window = {
  addEventListener: () => {}
};
globalAny.MutationObserver = () => ({
  observe: () => {},
  takeRecords: () => {},
  disconnect: () => {}
});
globalAny.requestAnimationFrame = () => {};

console.log('JSDOM shim has been established');
