import { Router } from 'express';
import { createView } from '../demoView';
import { createDom } from './dom';
import { globalAny } from './globalAny';
import { hydrateEditor } from '../hydrateEditor';
import { getOrCreateDoc } from './getOrCreateDoc';

const dom = createDom();

export const createRouter = connection => {
  const router = Router();
  router.get('/', (req, res) => {
    getOrCreateDoc(connection).then((doc: any) => {
      globalAny.document = dom.window.document;
      hydrateEditor(createView({ text: doc.data }));
      res.send(dom.serialize());
      doc.destroy();
    });
  });
  return router;
};
