import { otPlugin, opsToTransaction } from 'codemirror-ot';

// TODO unify with implementation in codemirror-ot tests.
const atPath = (obj, path) => path.reduce((d, key) => d[key], obj);

// TODO research if this is already implemented elsewhere in the ShareDB universe.
const pathMatches = (op, path) => {
  if (op.length !== 1) {
    return false;
  }
  const opPath = op[0].p;
  if (opPath.length < path.length) {
    return false;
  }
  return path.every((pathEntry, i) => pathEntry === opPath[i]);
};

export const CodeMirrorShareDBBinding = options => {
  const {
    shareDBDoc,
    createView,
    path = [], // The path of the field in the json0 document
    opBatchInterval = 500 // Milliseconds between op batches.
  } = options;

  let otPluginBrowser;
  let applyingOpTransaction = false;

  if (process.browser) {
    let opsQueue = [];
    setInterval(() => {
      if (opsQueue.length) {
        shareDBDoc.submitOp(opsQueue, err => {
          if (err) {
            throw err;
          }
        });
        opsQueue = [];
      }
    }, opBatchInterval);

    const emitOps = ops => {
      if (!applyingOpTransaction) {
        opsQueue = opsQueue.concat(ops);
      }
    };

    otPluginBrowser = otPlugin(path, emitOps);
  }

  const doc = atPath(shareDBDoc.data, path);

  const view = createView({
    otPlugin: otPluginBrowser,
    doc
  });

  if (process.browser) {
    shareDBDoc.on('op', (op, originatedLocally) => {
      if (!originatedLocally && pathMatches(op, path)) {
        applyingOpTransaction = true;
        view.dispatch(opsToTransaction(path, view.state, op));
        applyingOpTransaction = false;
      }
    });
  }

  return view;
};
