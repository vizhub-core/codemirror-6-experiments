import { Router } from 'express';
import { hydrateEditor } from './hydrateEditor';
import { createView } from '../../demoView';
import { html } from './html';
import { setServerRenderedData } from '../html';
import { createDom } from '../../server/dom';
import { getOrCreateDoc } from '../../server/getOrCreateDoc';

const route = 'pad';
const dom = createDom(html);
const document = dom.window.document;

export const server = connection => {
  const router = Router();
  router.get('/:id', (req, res) => {
    const { params } = req;
    const { id } = params;

    getOrCreateDoc(connection, id).then(shareDBDoc => {
      global.document = document;
      const doc = shareDBDoc.data;
      hydrateEditor(createView({ doc }));

      // Make the content non-interactive until the JS loads.
      // Otherwise edits made before JS loads will be lost.
      document
        .querySelector('.CodeMirror-content')
        .removeAttribute('contenteditable');

      // This snapshot of the ShareDB document is used to
      // initialize the document in the client.
      const snapshot = { v: shareDBDoc.version, data: shareDBDoc.data };

      setServerRenderedData(dom, { route, params, snapshot });

      res.send(dom.serialize());
      shareDBDoc.destroy();
    });
  });
  return router;
};
