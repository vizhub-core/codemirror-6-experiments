export const CodeMirrorShareDBBinding = options => {

  const {
    shareDBDoc,
    createView,
    path = [],
    opBatchInterval = 500
  } = options;

  let opsQueue = [];

  setInterval(() => {
    if(opsQueue.length) {
      shareDBDoc.submitOp(opsQueue, err => {
        if (err) {
          throw err;
        }
      });
      opsQueue = [];
    }
  }, opBatchInterval);

  let applyingOpTransaction = false;
  const emitOps = ops => {
    if (!applyingOpTransaction) {
      opsQueue = opsQueue.concat(ops);
    }
  }

  // TODO use path here.
  const doc = shareDBDoc.data;

  const view = createView({
    path,
    emitOps,
    doc
  });

  shareDBDoc.on('op', (op, originatedLocally) => {
    if (!originatedLocally) {
      applyingOpTransaction = true;
      view.dispatch(opsToTransaction(path, view.state, op));
      applyingOpTransaction = false;
    }
  });

  shareDBDoc.subscribe(err => {
    if (err) {
      throw err;
    }
  });
  
  return view;
};
