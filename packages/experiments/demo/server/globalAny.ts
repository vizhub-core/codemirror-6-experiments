export const globalAny:any = global;

// Shim odds and ends needed for CodeMirror to run in Node.
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
