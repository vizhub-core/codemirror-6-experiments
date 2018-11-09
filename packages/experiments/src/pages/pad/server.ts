import { Router } from 'express';
import { hydrateEditor } from './hydrateEditor';
import { createView } from './demoView'; // needs to come before globalAny
import { html } from './html';
import { createDom } from '../../server/dom';
import { globalAny } from '../../server/globalAny';
import { getOrCreateDoc } from '../../server/getOrCreateDoc';

const dom = createDom(html);

export const server = connection => {
  const router = Router();
  router.get('/:id', (req, res) => {
    getOrCreateDoc(connection).then((doc: any) => {
      globalAny.document = dom.window.document;
      const text = doc.data;
      hydrateEditor(createView({ text }));

      // Make the content non-interactive until the JS loads.
      // Otherwise edits made before JS loads will be lost.
      document.querySelector('.CodeMirror-content').removeAttribute('contenteditable');

      const snapshot = {
        v: doc.version,
        data: doc.data
      };

      const serverRenderedData = {
        route: 'pad',
        params: req.params,
        snapshot
      };
      const serverRenderedJSON = JSON.stringify(serverRenderedData);

      document.querySelector('#server-rendered-data')
        .textContent = `window.serverRenderedData = ${serverRenderedJSON};`;

      res.send(dom.serialize());
      doc.destroy();
    });
  });
  return router;
};
