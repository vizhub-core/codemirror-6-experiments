import { Router } from 'express';
import { html } from './html';
import { createDom } from '../../server/dom';

const dom = createDom(html);

export const server = connection => {
  const router = Router();
  router.get('/', (req, res) => {
    const serverRenderedData = { route: 'multifile' };
    const serverRenderedJSON = JSON.stringify(serverRenderedData);
    dom.window.document.querySelector('#server-rendered-data')
      .textContent = `window.serverRenderedData = ${serverRenderedJSON};`;
    res.send(dom.serialize());
  });
  return router;
};
