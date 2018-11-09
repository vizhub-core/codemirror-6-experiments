window.process = {

  // Required for ShareDB client.
  // This simple shim seems to work fine.
  nextTick: callback => {
    setTimeout(callback, 0);
  },

  // Enables isomorphic code to check process.browser to detect environment.
  browser: true
};
