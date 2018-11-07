import { Router } from 'express';
import { html } from './html';
import { createDom } from '../../server/dom';

const dom = createDom(html);

export const multifileServer = connection => {
  const router = Router();
  router.get('/', (req, res) => {
    res.send(dom.serialize());
  });
  return router;
};
