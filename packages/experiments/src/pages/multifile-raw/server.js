import { Router } from 'express';
import { html } from './html';
import { setServerRenderedData } from '../html';
import { createDom } from '../../server/dom';

const route = 'multifileRaw';
const dom = createDom(html);

export const server = connection => {
  const router = Router();
  router.get('/', (req, res) => {
    setServerRenderedData(dom, { route });
    res.send(dom.serialize());
  });
  return router;
};
