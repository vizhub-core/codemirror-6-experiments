window.process = {

  // Required for ShareDB client.
  // This simple shim seems to work fine.
  nextTick: callback => {
    setTimeout(callback, 0);
  },

  // Used for checking environment.
  browser: true
};
