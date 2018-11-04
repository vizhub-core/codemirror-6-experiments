// Required for ShareDB client.
window.process = {
  nextTick: callback => {
    setTimeout(callback, 0);
  }
};
