import { Router } from 'express';
import { html } from './html';
import { setServerRenderedData } from '../html';
import { createDom } from '../../server/dom';

const route = 'multifile';
const dom = createDom(html);

export const server = () => {
  const router = Router();
  router.get('/', (req, res) => {
    setServerRenderedData(dom, { route });
    res.send(dom.serialize());
  });
  return router;
};
