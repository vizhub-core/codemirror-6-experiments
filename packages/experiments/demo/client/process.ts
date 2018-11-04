window.process = {

  // Required for ShareDB client.
  nextTick: callback => {
    setTimeout(callback, 0);
  },

  // Used for checking environment.
  browser: true
};
