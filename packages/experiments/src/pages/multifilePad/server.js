import { Router } from 'express';
import { html } from './html';
import { createDom } from '../../server/dom';
import { setServerRenderedData } from '../html';
import { getOrCreateMultifileDoc } from './getOrCreateMultifileDoc';
//import { Page } from './page';
//`

const route = 'multifilePad';
const dom = createDom(html);

export const server = connection => {
  const router = Router();
  router.get('/:id', (req, res) => {
    const {
      params: {
        id
      }
    } = req;

    setServerRenderedData(dom, {
      id,
      route,
      //snapshot
    });

    res.send(dom.serialize());

    //getOrCreateDoc(connection, id).then(shareDBDoc => {
    //}
  });
  return router;
};
