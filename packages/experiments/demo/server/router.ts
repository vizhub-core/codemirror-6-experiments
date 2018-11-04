import { Router } from 'express';
import { createView } from '../demoView';
import { dom } from './dom';
import { hydrateEditor } from '../hydrateEditor';
import { getOrCreateDoc } from './getOrCreateDoc';

export const createRouter = connection => {
  const router = Router();
  router.get('/', (req, res) => {
    getOrCreateDoc(connection).then((doc: any) => {
      hydrateEditor(createView({ text: doc.data }));
      res.send(dom.serialize());
      doc.destroy();
    });
  });
  return router;
};
